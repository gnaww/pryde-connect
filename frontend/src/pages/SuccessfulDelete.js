import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/PageNotFound.module.css';

const SuccessfulDelete = ({ location }) => {
    document.title = "PRYDE Connect | Successfully Deleted";

    if (location.state.deleteType === "project") {
        return (
            <div className={styles.container}>
                <section className={styles.pageNotFound}>
                    <div>
                        <h1>Successfully deleted project.</h1>
                        <p>Return to <Link to="/myprofile">your profile</Link>.</p>
                    </div>
                </section>
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <section className={styles.pageNotFound}>
                    <div>
                        <h1>Successfully deleted profile.</h1>
                        <p>Return to the <Link to="/">homepage</Link>.</p>
                    </div>
                </section>
            </div>
        )
    }
};

export default SuccessfulDelete;
