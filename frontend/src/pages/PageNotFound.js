import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/PageNotFound.module.css';

const PageNotFound = () => {
    document.title = "PRYDE Connect | 404";

    return (
        <div className={styles.container}>
            <section className={styles.pageNotFound}>
                <div>
                    <h1>Oops!</h1>
                    <p>We can't seem to find the page you're looking for.</p>
                    <p>Return to the <Link to="/">homepage</Link>.</p>
                </div>
            </section>
        </div>
    );
};

export default PageNotFound;
