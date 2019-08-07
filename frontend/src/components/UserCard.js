import React from 'react';
import { Link } from 'react-router-dom';
import profilePicture from '../images/profile-picture.png';
import locationIcon from '../images/location-icon-white.svg';
import projectIcon from '../images/project-icon-white.svg';
import categoryIconWhite from '../images/category-icon-white.svg';
import mailIcon from '../images/mail-icon-white.svg';
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
        link = `/user/${props.pk}`;
    } else {
        link = `/user/${props.id}`;
    }
    const researchInterests = props.researchInterests.reduce(listFormatter, "");
    const profilePic = props.profile_picture ? props.profile_picture : profilePicture

    return (
        <Link className={styles.linkWrapper} to={link}>
            <div className={`${styles.card} ${styles.userCard} ${styles[props.role.toLowerCase()]}`}>
                <section className={styles.userDetails}>
                    <img className={styles.profilePicture} src={profilePic} alt="Profile pic" />
                    <section>
                        <header>
                            <h3>{`${props.first_name} ${props.last_name}`}</h3>
                        </header>
                        <h4>{props.role}</h4>
                        <h4>{props.affiliation}</h4>
                        <h4 className={styles.researchInterests}>
                            <img src={categoryIconWhite} alt="Category icon" />
                            <span>
                                {
                                    researchInterests.length > 70 ?
                                        `${researchInterests.replace(/^(.{70}[^\s]*).*/, "$1")}...`
                                    :
                                        researchInterests
                                }
                            </span>
                        </h4>
                    </section>
                </section>
                <section className={styles.stats}>
                    <section className={styles.line}>
                        <p>
                            <img src={locationIcon} alt="Location icon" />
                            {
                                // TODO: figure out way to handle long locations/emails messing up card styling
                                // props.location.length > 15 ?
                                    // `${props.location.replace(/^(.{15}[^\s]*).*/, "$1")}...`
                                // :
                                    props.location
                            }
                        </p>
                    </section>
                    <section className={styles.line}>
                        <p><img src={projectIcon} alt="Project icon" />
                        {props.numProjects} projects</p>
                    </section>
                    <section className={styles.line}>
                        <p>
                            <img src={mailIcon} alt="Email icon" />
                            {
                                // props.email.length > 17 ?
                                    // `${props.email.slice(0, 17)}...`
                                // :
                                    props.email
                            }
                        </p>
                    </section>
                </section>
            </div>
        </Link>
    );
};

export default UserCard;
