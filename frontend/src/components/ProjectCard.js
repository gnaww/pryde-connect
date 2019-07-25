import React from 'react';
import { Link } from 'react-router-dom';
import statusIcon from '../images/status-icon.svg';
import ageIcon from '../images/age-icon.svg';
import categoryIcon from '../images/category-icon.svg';
import placeIcon from '../images/place-icon.svg';
import locationIconBlack from '../images/location-icon-black.svg'
import styles from '../styles/Card.module.css';

const listFormatter = (str, elt, idx, arr) => {
    if (idx < arr.length - 1) {
        str += `${elt}, `;
    } else {
        str += elt;
    }
    return str;
};

const UserCard = props => {
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
};

export default UserCard;
