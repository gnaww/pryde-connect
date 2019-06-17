import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';

const roles = [
    {
        text: "4-H Educator"
    },
    {
        text: "Other CCE role"
    },
    {
        text: "Other primarily practice-focused role"
    },
    {
        text: "Cornell faculty or academic staff"
    },
    {
        text: "Cornell graduate or undergraduate student"
    },
    {
        text: "Other primarily research-focused role"
    },

];

class RoleSelection extends Component {
    render() {
        return (
            <div className={styles.form}>
                {
                    roles.map((role, index) => {
                        return (
                            <div className={styles.selection} key={index}>
                                <input className={styles.radio} type="radio" value={role.text} />
                                <label className={styles.label}>{role.text}</label>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default RoleSelection;