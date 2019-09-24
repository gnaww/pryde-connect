import React from 'react';
import { Link } from 'react-router-dom';
import statusIcon from '../images/status-icon.svg';
import ageIcon from '../images/age-icon.svg';
import categoryIcon from '../images/category-icon.svg';
import placeIcon from '../images/place-icon.svg';
import locationIconBlack from '../images/location-icon-black.svg'
import calendarIcon from '../images/calendar-icon-black.svg';
import styles from '../styles/Card.module.css';

const listFormatter = (str, elt, idx, arr) => {
    if (idx < arr.length - 1) {
        str += `${elt}, `;
    } else {
        str += elt;
    }
    return str;
};

const ProjectCard = props => {
    let link = ""
    if (props.pk) {
        link = `/project/${props.pk}`;
    } else {
        link = `/project/${props.id}`;
    }

    const researchTopics = props.researchTopics.reduce(listFormatter, "");
    const ageRanges = props.ageRanges.reduce(listFormatter, "");
    const deliveryModes = props.deliveryModes.reduce(listFormatter, "");
    const date = new Date(props.datePosted);
    const datePosted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    return (
        <Link className={styles.linkWrapper} to={link}>
            <div className={props.visible ? `${styles.card} ${styles.projectCard}` : `${styles.card} ${styles.projectCard} ${styles.invisible}`}>
                <section className={styles.projectDetails}>
                    <h3>{props.name}</h3>
                    <div>
                        <h4>{`${props.owner.first_name} ${props.owner.last_name}`}</h4>
                        <h4><img src={locationIconBlack} alt="Location icon" />{ props.owner.location }</h4>
                    </div>
                    <h4>{ props.owner.affiliation }</h4>
                    {
                        // truncate summary at a word if longer than 100 characters
                        props.summary.length > 100 ?
                            <p>{`${props.summary.replace(/^(.{100}[^\s]*).*/, "$1")}...`} <span className={styles.readMore}>read more</span></p>
                        :
                            <p>{ props.summary }</p>
                    }
                    <div>
                        <img src={categoryIcon} alt="Category icon" />
                        <span className={styles.statList}>
                            {
                                researchTopics.length > 42 ?
                                    `${researchTopics.replace(/^(.{42}[^\s]*).*/, "$1")}...`
                                :
                                    researchTopics
                            }
                        </span>
                    </div>
                </section>
                <section className={styles.stats}>
                    <section className={styles.line}>
                        <h4><img src={statusIcon} alt="status icon" />
                        {props.status.toUpperCase()}</h4>
                    </section>
                    <section className={styles.line}>
                        <img src={ageIcon} alt="Age icon" />
                        <span className={styles.statList}>
                            {
                                ageRanges.length > 50 ?
                                    `${ageRanges.replace(/^(.{50}[^\s]*).*/, "$1")}...`
                                :
                                    ageRanges
                            }
                        </span>
                    </section>
                    <section className={styles.line}>
                        <img src={placeIcon} alt="Place icon" />
                        <span className={styles.statList}>
                            {
                                deliveryModes.length > 30 ?
                                `${deliveryModes.replace(/^(.{30}[^\s]*).*/, "$1")}...`
                            :
                                deliveryModes
                            }
                        </span>
                    </section>
                    <section className={styles.line}>
                        <img src={calendarIcon} alt="Calendar icon" />
                        <span className={styles.statList}>
                            {
                                datePosted
                            }
                        </span>
                    </section>
                </section>
            </div>
        </Link>
    );
};

export default ProjectCard;
