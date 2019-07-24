import React, { Component } from 'react';
import arrow from '../images/dropdown-arrow.svg';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styles from '../styles/FilterCategory.module.css';

class FilterCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    toggleVisibility = () => {
        this.setState(prevState => ({ visible: !prevState.visible }));
    }

    render() {
        let { isVisible, handleClick, categoryName, filterOptions, defaultValues } = this.props;

        if (defaultValues === undefined) {
            defaultValues = [];
        } else if (typeof defaultValues === "string") {
            defaultValues = [defaultValues];
        }

        return (
            <section className={styles.filterCategory}>
                <h4 onClick={this.toggleVisibility}>
                    <img
                        src={arrow}
                        alt="Down arrow"
                        className={this.state.visible ? styles.open : styles.closed}
                    />
                    {categoryName.toUpperCase()}
                </h4>
                {
                    this.state.visible &&
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
                                                    name={categoryName.replace(" ", "").toLowerCase()}
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
}

export default FilterCategory;
