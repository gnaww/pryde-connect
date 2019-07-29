import React from 'react';
import styles from '../styles/CustomDropdown.module.css';

const CustomDropdown = ({ handleChange, name, label, options, defaultValue = "" }) => {
    console.log(defaultValue, typeof defaultValue);
    return (
    <span className={styles.dropdown}>
        <select name={name} value={defaultValue} onChange={handleChange}>
            <option value="" disabled>{label}</option>
            {
                options.map((option, idx) => <option key={idx} value={option.value}>{option.text}</option>)
            }
        </select>
    </span>
)};

export default CustomDropdown;
