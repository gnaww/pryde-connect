import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';

class BasicInfo extends Component {
    render() {
        return (
            <div className={styles.form}>
                <div>
                    <input className={styles.smallTextInput} placeholder="First Name" type="text" />
                    <input className={styles.smallTextInput} placeholder="Last Name" type="text" />
                </div>
                <input className={styles.longTextInput} placeholder="Email address" type="text" />
                <div>
                    <input className={styles.longTextInput} placeholder="Password" type="password" />
                    <input className={styles.mediumTextInput} placeholder="Phone number (optional)" type="text" />
                </div>
                <div>
                    <input className={styles.longTextInput} placeholder="Confirm your password" type="password" />
                    <input className={styles.mediumTextInput} placeholder="Website (optional)" type="text" />
                </div>
            </div>
        )
    }
}

export default BasicInfo;