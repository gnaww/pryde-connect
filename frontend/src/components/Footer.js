import React from 'react';
import styles from '../styles/Footer.module.css';
import facebook from '../images/facebook.png';
import twitter from '../images/twitter.png';
import youtube from '../images/youtube.png';
import logoWhite from '../images/pryde-white.png';

const Footer = () => (
    <footer className={styles.footer}>
        <img className={styles.logo} src={logoWhite} alt="PRYDE logo white version" />
        <div className={styles.socialMedia}>
            <a href="https://www.facebook.com/prydecornell/" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook logo" />
            </a>
            <a href="https://twitter.com/prydecornell" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter logo" />
            </a>
            <a href="https://www.youtube.com/channel/UCwQkoe00Nh0jctC7-eKPXBw" target="_blank" rel="noopener noreferrer">
                <img src={youtube} alt="Youtube logo" />
            </a>
        </div>
        <div className={styles.contact}>
            <h2>CONTACT US</h2>
            <a id={styles.prydeLink} href="https://pryde.bctr.cornell.edu/" target="_blank" rel="noopener noreferrer">
                pryde.bctr.cornell.edu
            </a>
            <p>Beebe Hall, Ithaca, NY, 14853, United States </p>
            <p><a href="tel:607-254-5125">607-254-5125</a> | <a href="mailto:pryde@cornell.edu">pryde@cornell.edu</a></p>
        </div>
    </footer>
);

export default Footer;
