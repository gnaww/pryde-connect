import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import logo from '../images/pryde-symbol.png';

const Navbar = () => (
    <nav className={styles.navbar}>
        <div className={styles.logo}>
            <Link to="/">
                <img src={logo} alt="PRYDE logo" />
                <p>
                    <span id={styles.pryde}>PRYDE</span>
                    <br/>
                    <span id={styles.name}>Research Connect</span>
                </p>
            </Link>
        </div>
        <div className={styles.linksContainer}>
            <Link className={styles.link} to="/browse">
                BROWSE
            </Link>
            <Link className={styles.link} to="/submit">
                SUBMIT A PROJECT
            </Link>
            <Link className={styles.link} to="/login">
                LOG IN
            </Link>
            <Link className={styles.link} to="/signup">
                SIGN UP
            </Link>
        </div>
    </nav>
);

export default Navbar;
