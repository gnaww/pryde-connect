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

const FinishSubmit = () => (
    <div className={styles.finishPage}>
        {
            navigationOptions.map((nav, index) => {
                return (
                    nav.link === "/submit" ?
                    <Link key={index} className={styles.roleLink} to={nav.link} onClick={() => window.location.reload()}>
                        <img
                            className={nav.styling}
                            src={nav.img}
                            alt={nav.alt}
                        />
                        <p>{nav.text}</p>
                    </Link>
                    :
                    <Link key={index} className={styles.roleLink} to={nav.link}>
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

export default FinishSubmit;
