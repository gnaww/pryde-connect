import React from 'react';
import { Link } from 'react-router-dom';
import profilePicture from '../images/profile-picture.png';
import badge from '../images/badge.svg';
import styles from '../styles/SearchResult.module.css';

const SearchResult = props => {
    if (props.type === "project") {
        return (
            <Link className={styles.linkWrapper} to={`/project/${props.id}`}>
                <div className={`${styles.searchResult} ${styles.projectResult}`}>
                    <section className={styles.projectDetails}>
                        <h3>{props.name}</h3>
                        <h4>{`${props.owner.first_name} ${props.owner.last_name}`}</h4>
                        <p>{props.summary}</p>
                    </section>
                    <section className={styles.stats}>
                        <h4>{props.status.toUpperCase()}</h4>
                        <p>
                            stats/numbers about
                            project/research
                            partner (location, age range)
                            or an image
                        </p>
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
                                <h3>{`${props.first_name} ${props.last_name}`}</h3>
                                <img src={badge} alt="CCE badge" />
                            </header>
                            <h4>{props.role}</h4>
                            <h4>{props.affiliation}</h4>
                        </section>
                    </section>
                    <section className={styles.stats}>
                        <p>
                            stats (location, research interests, number of active posts}
                        </p>
                    </section>
                </div>
            </Link>
        );
    }
};

export default SearchResult;
