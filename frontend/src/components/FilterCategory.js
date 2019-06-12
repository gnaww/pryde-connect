import React from 'react';
import arrow from '../images/dropdown-arrow.svg';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../styles/FilterCategory.module.css';

const FilterCategory = ({ isVisible, toggleVisibility, categoryName, filterOptions }) => (
    <section className={styles.filterCategory}>
        <h4 onClick={() => toggleVisibility(`show${categoryName}`)}>
            <img 
                src={arrow}
                alt="Down arrow"
                className={isVisible ? styles.open : styles.closed}
            />
            {categoryName.toUpperCase()}
        </h4>
        {
            isVisible &&
            <ul>
                {
                    filterOptions.map(filter => 
                        <li><input type="checkbox" />{filter}</li>
                    )
                }
            </ul>
        }
    </section>
);

export default FilterCategory;
