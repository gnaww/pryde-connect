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
        text: "VIEW YOUR PROFILE"
    },
    {
        img: HomeButton,
        styling: styles.homeNavImg,
        link: "/",
        text: "BACK TO HOME"
    },
    {
        img: ProjectsButton,
        styling: styles.studiesNavImg,
        link: "/browse",
        text: "BROWSE PROJECTS"
    },
    {
        img: SubmitProject,
        styling: styles.submitProjImg,
        link: "/submit",
        text: "SUBMIT A PROJECT"
    }
];

const FinishSubmit = () => (
    <div className={styles.finishPage}>
        {
            navigationOptions.map((nav, index) => {
                return (
                    <div className={styles.roleCard} key={index}>
                        <Link className={styles.roleLink} to={nav.link}>
                            <img
                                s className={nav.styling}
                                src={nav.img}
                                alt="Go to another page."
                            />
                            <p>{nav.text}</p>
                        </Link>
                    </div>
                );
            })
        }
    </div>
);

export default FinishSubmit;
