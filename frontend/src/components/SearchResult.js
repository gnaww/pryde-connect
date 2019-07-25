import React from 'react';
import { Link } from 'react-router-dom';
import profilePicture from '../images/profile-picture.png';
import statusIcon from '../images/status-icon.svg';
import ageIcon from '../images/age-icon.svg';
import categoryIcon from '../images/category-icon.svg';
import placeIcon from '../images/place-icon.svg';
import locationIcon from '../images/location-icon-white.svg';
import locationIconBlack from '../images/location-icon-black.svg'
import projectIcon from '../images/project-icon-white.svg';
import categoryIconWhite from '../images/category-icon-white.svg';
import mailIcon from '../images/mail-icon-white.svg';
import CCEBadge from '../images/cce-badge.svg';
import CornellBadge from '../images/cornell-badge.svg';
import styles from '../styles/SearchResult.module.css';

const listFormatter = (str, elt, idx, arr) => {
    if (idx < arr.length - 1) {
        str += `${elt}, `;
    } else {
        str += elt;
    }
    return str;
};

const SearchResult = props => {
    if (props.type === "project") {
        let link = ""
        if (props.pk) {
            link = `/project/${props.pk}`;
        } else {
            link = `/project/${props.id}`;
        }

        const status = props.status.replace("-", " ");

        return (
            <Link className={styles.linkWrapper} to={link}>
                <div className={`${styles.searchResult} ${styles.projectResult}`}>
                    <section className={styles.projectDetails}>
                        <h3>{props.name}</h3>
                        <div>
                            <h4>{`${props.owner.first_name} ${props.owner.last_name}`}</h4>
                            <h4><img src={locationIconBlack} alt="Location icon" />{ props.owner.location }</h4>
                        </div>
                        <h4>{ props.owner.affiliation }</h4>
                        {
                            // truncate summary at a word if longer than 200 characters
                            props.summary.length > 200 ?
                                <p>{`${props.summary.replace(/^(.{200}[^\s]*).*/, "$1")}...`} <span className={styles.readMore}>read more</span></p>
                            :
                                <p>{ props.summary }</p>
                        }
                    </section>
                    <section className={styles.stats}>
                    <section className={styles.line}>
                        <h4><img src={statusIcon} alt="status icon" />
                        {status.toUpperCase()}</h4>
                    </section>
                    <section className={styles.line}>
                        <img src={ageIcon} alt="Age icon" />
                        <span>
                            {
                                props.ageRanges.reduce(listFormatter, "")
                            }
                        </span>
                    </section>
                    <section className={styles.line}>
                        <img src={categoryIcon} alt="Category icon" />
                        <span>
                            {
                                props.researchTopics.reduce(listFormatter, "")
                            }
                        </span>
                    </section>
                    <section className={styles.line}>
                        <img src={placeIcon} alt="Place icon" />
                        <span>
                            {
                                props.deliveryModes.reduce(listFormatter, "")
                            }
                        </span>
                    </section>
                    </section>
                </div>
            </Link>
        );
    } else if (props.type === "partner") {
        let link = ""
        if (props.pk) {
            link = `/user/${props.pk}`;
        } else {
            link = `/user/${props.id}`;
        }

        return (
            <Link className={styles.linkWrapper} to={link}>
                <div className={`${styles.searchResult} ${styles.partnerResult} ${styles[props.role.toLowerCase()]}`}>
                    <section className={styles.partnerDetails}>
                        <img className={styles.profilePicture} src={profilePicture} alt="Profile pic" />
                        <section>
                            <header>
                                <h3>{`${props.first_name} ${props.last_name}`}</h3>
                                { props.locatedAtCCE && <img className={styles.CCEBadge} src={CCEBadge} alt="CCE badge" /> }
                                { props.locatedAtCornell && <img className={styles.CornellBadge} src={CornellBadge} alt="Cornell badge" /> }
                            </header>
                            <h4>{props.role}</h4>
                            <h4>{props.affiliation}</h4>
                            <h4 className={styles.researchInterests}>
                                <img src={categoryIconWhite} alt="Category icon" />
                                <span>{props.researchInterests.reduce(listFormatter, "")}</span>
                            </h4>
                        </section>
                    </section>
                    <section className={styles.stats}>
                        <section className={styles.line}>
                            <p><img src={locationIcon} alt="Location icon" />
                            {props.location}</p>
                        </section>
                        <section className={styles.line}>
                            <p><img src={projectIcon} alt="Project icon" />
                            {props.numProjects} projects</p>
                        </section>
                        <section className={styles.line}>
                            <p><img src={mailIcon} alt="Email icon" />
                            {props.email}</p>
                        </section>
                    </section>
                </div>
            </Link>
        );
    }
};

export default SearchResult;
