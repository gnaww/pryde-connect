import React from 'react';
import { Link } from 'react-router-dom';
import profilePicture from '../images/profile-picture.png';
import statusIcon from '../images/status-icon.svg';
import ageIcon from '../images/age-icon.svg';
import categoryIcon from '../images/category-icon.svg';
import placeIcon from '../images/place-icon.svg';
import locationIcon from '../images/location-icon-white.svg';
import projectIcon from '../images/project-icon-white.svg';
import categoryIconWhite from '../images/category-icon-white.svg';
import mailIcon from '../images/mail-icon-white.svg';
import badge from '../images/badge.svg';
import styles from '../styles/SearchResult.module.css';

const SearchResult = props => {
    if (props.type === "project") {
        return (
            <Link className={styles.linkWrapper} to={`/project/${props.id}`}>
                <div className={`${styles.searchResult} ${styles.projectResult}`}>
                    <section className={styles.projectDetails}>
                        <h3>{props.name}</h3>
                        <h4>{props.owner}</h4>
                        <p>{props.summary}</p>
                    </section>
                    <section className={styles.stats}>
                        <section className={styles.line}>
                            <h4> <img className={styles.statusIcon} src={statusIcon} alt="status icon" />
                            {props.status.toUpperCase()}</h4>
                        </section>
                        <section className={styles.line}>
                            <p> <img className={styles.ageIcon} src={ageIcon} alt="age icon" />
                            Age Range</p>
                        </section>
                        <section className={styles.line}>
                            <p> <img className={styles.categoryIcon} src={categoryIcon} alt="category icon" />
                            Research Category </p>
                        </section>
                        <section className={styles.line}>
                            <p> <img className={styles.placeIcon} src={placeIcon} alt="place icon" />
                            Club or Afterschool/Camp </p>
                        </section>
                    </section>
                </div>
            </Link>
        );
    } else if (props.type === "partner") {
        return (
            <Link className={styles.linkWrapper} to={`/user/${props.id}`}>
                <div className={`${styles.searchResult} ${styles.partnerResult} ${styles[props.role.toLowerCase()]}`}>
                    <section className={styles.partnerDetails}>
                        <img className={styles.profilePicture} src={profilePicture} alt="Profile pic" />
                        <section>
                            <header>
                                <h3>{props.name}</h3>
                                <img src={badge} alt="CCE badge" />
                            </header>
                            <h4>{props.role}</h4>
                            <h4>{props.affiliation}</h4>
                            <section className={styles.line}>
                                <h4> <img className={styles.categoryIconWhite} src={categoryIconWhite} alt="category icon white" />
                                Research Interests </h4>
                            </section>
                        </section>
                    </section>
                    <section className={styles.stats}>
                        <section className={styles.line}>
                            <p> <img className={styles.locationIcon} src={locationIcon} alt="location icon" />
                            Town, NY</p>
                        </section>
                        <section className={styles.line}>
                            <p> <img className={styles.projectIcon} src={projectIcon} alt="project icon" />
                            ## projects </p>
                        </section>
                        <section className={styles.line}>
                            <p> <img className={styles.mailIcon} src={mailIcon} alt="mail icon" />
                            someone@something.com </p>
                        </section>
                    </section>
                </div>
            </Link>
        );
    }
};

export default SearchResult;
