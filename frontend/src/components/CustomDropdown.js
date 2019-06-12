import React from 'react';
import styles from '../styles/CustomDropdown.module.css';

const CustomDropdown = ({ handleChange, name, label, options }) => (
    <span className={styles.dropdown}>
        <select name={name} defaultValue="" onChange={handleChange}>
            <option value="" disabled>{label}</option>
            {
                options.map(option => <option value={option.value}>{option.text}</option>)
            }
        </select>
    </span>
);

export default CustomDropdown;
