import React from 'react';
import arrow from '../images/dropdown-arrow.svg';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styles from '../styles/FilterCategory.module.css';

const FilterCategory = ({ isVisible, toggleVisibility, handleClick, categoryName, filterOptions, defaultValues }) => {
    if (defaultValues === undefined) {
        defaultValues = [];
    } else if (typeof defaultValues === "string") {
        defaultValues = [defaultValues];
    }

    return (
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
                        filterOptions.map((filter, idx) => {
                            return (
                                <li key={idx}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color="default"
                                                className={styles.checkbox}
                                                name={categoryName.toLowerCase()}
                                                value={filter}
                                                checked={defaultValues.includes(filter)}
                                                onChange={handleClick}
                                                disableRipple
                                            />
                                        }
                                        label={filter}
                                    />
                                </li>
                            );
                        })
                    }
                </ul>
            }
        </section>
    );
}

export default FilterCategory;
