import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/CreateProfile.module.css';
import ProfileButton from '../../images/profile.png';
import HomeButton from '../../images/home.png';
import ProjectsButton from '../../images/projects.png';
import SubmitProject from '../../images/submitproject.png';

const navigationOptions = [
    {
        img: ProfileButton,
        styling: styles.profileNavImg,
        link: "/myprofile",
        text: "VIEW PROFILE",
        alt: "View profile"
    },
    {
        img: HomeButton,
        styling: styles.homeNavImg,
        link: "/",
        text: "BACK TO HOME",
        alt: "Home"
    },
    {
        img: ProjectsButton,
        styling: styles.studiesNavImg,
        link: "/browse",
        text: "BROWSE PROJECTS",
        alt: "Browse projects"
    },
    {
        img: SubmitProject,
        styling: styles.submitProjImg,
        link: "/submit",
        text: "SUBMIT A PROJECT",
        alt: "Submit a project"
    }
];

const ReviewFinish = props => {
    if (!props.editing) {
        return (
            <div className={styles.finishPage}>
                <h1 className={styles.createProfile}>Confirm your email address</h1>
                <h2 className={styles.subtitle}>A confirmation email has been sent to <b>{props.email}</b>. Click on the confirmation link in the email to activate your account. If you cannot find the email in your inbox, check your spam folder.</h2>
            </div>
        );
    } else {
        return (
            <div className={styles.finishPage}>
                {
                    navigationOptions.map((nav, index) => {
                        return (
                            <Link className={styles.roleLink} key={index} to={nav.link}>
                                <img
                                    className={nav.styling}
                                    src={nav.img}
                                    alt={nav.alt}
                                />
                                <p>{nav.text}</p>
                            </Link>
                        );
                    })
                }
            </div>
        );
    }
};

export default ReviewFinish;
