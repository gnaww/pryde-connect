import React, { Component } from 'react';
import scrollDown from '../images/scroll-down.svg';
import connect from '../images/connect.png';
import heroImage1 from '../images/homepage-hero1.png';
import heroImage2 from '../images/homepage-hero2.png';
import heroImage3 from '../images/homepage-hero3.png';
import heroImage4 from '../images/homepage-hero4.png';
import heroImage5 from '../images/homepage-hero5.png';
import combinedLogos from '../images/pryde-4h-logos.png';
import screenshot1 from '../images/screenshot1.png';
import screenshot2 from '../images/screenshot2.png';
import screenshot3 from '../images/screenshot3.png';
import addPerson from '../images/add-person.png';
import projects from '../images/projects.png';
import styles from '../styles/Homepage.module.css';
import { Link } from 'react-router-dom';

class Homepage extends Component {
    componentDidMount() {
        const MIN = 0;
        const MAX = 4;
        const randomInt= Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
        const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5];
        document.getElementById(styles.welcomeBanner).style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(' + heroImages[randomInt] + ')';
        document.title = "PRYDE Connect";
    }

    render() {
        return (
            <div className={styles.container}>
                <section id={styles.welcomeBanner}>
                    <div>
                        <h1>Welcome to PRYDE Connect!</h1>
                        <p>Where connections are built.</p>
                        { !localStorage.getItem("pryde_key") && <Link to="/signup">SIGN UP NOW</Link> }
                    </div>
                    <button
                        onClick={
                            () =>
                                window.scroll({
                                    top: 700 + 110, // section height + navbar height
                                    left: 0,
                                    behavior: 'smooth'
                                })
                        }
                    >
                        <span>LEARN MORE</span>
                        <img src={scrollDown} alt="Scroll down arrow" />
                    </button>
                </section>
                <section className={styles.aboutUs}>
                    <div className={styles.aboutUsText}>
                        <h2>About Us</h2>
                        <p>
                            PRYDE Connect is the place for researchers and practitioners with a shared interest in youth development to connect to each other.
                        </p>
                        <p>
                            Share your research interests and needs, identify potential research partners, and stay up to date on all of the PRYDE-affiliated research opportunities. Let’s build connections to support research and practice that helps youth thrive.
                        </p>
                    </div>
                    <div className={styles.connect}>
                        <img src={connect} alt="PRYDE Connect" />
                    </div>
                </section>
                <section className={styles.features}>
                    <div className={styles.featuresText}>
                        <div>
                            <h2>Communicate across the state</h2>
                            <p>
                                Discover the work youth development researchers throughout New York State are doing.
                            </p>
                        </div>
                        <div>
                            <h2>Browse our archives</h2>
                            <p>
                                View results and documentation from projects completed in the past.
                            </p>
                        </div>
                        <div>
                            <h2>Understand the needs of New York youth</h2>
                            <p>
                                Get feedback from 4-H practitioners across New York State about what issues they see in their communities.
                            </p>
                        </div>
                    </div>
                    <div className={styles.screenshots}>
                        <img id={styles.screenshot1} src={screenshot1} alt="Website screenshot" />
                        <img id={styles.screenshot2} src={screenshot2} alt="Website screenshot" />
                        <img id={styles.screenshot3} src={screenshot3} alt="Website screenshot" />
                    </div>
                </section>
                <section className={styles.getStarted}>
                    <div className={styles.actionsWrapper}>
                        <h2>Get Started</h2>
                        <div className={styles.actions}>
                            <div className={styles.actionCard}>
                                <Link className={styles.actionLink} to="/browse">
                                    <img className={styles.viewProjects} src={projects} alt="View project" />
                                    <p>VIEW PROJECTS</p>
                                </Link>
                                <p className={styles.actionDescription}>
                                    View projects and profiles right now without an account
                                </p>
                            </div>
                            {
                                !localStorage.getItem("pryde_key") &&
                                <div className={styles.actionCard}>
                                    <Link className={styles.actionLink} to="/signup">
                                        <img className={styles.addPerson} src={addPerson} alt="Sign up" />
                                        <p>SIGN UP</p>
                                    </Link>
                                    <p className={styles.actionDescription}>
                                        Sign up now to post about an initiative or create your own profile
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={styles.logoWrapper}>
                        <img src={combinedLogos} alt="PRYDE and 4-H logo" />
                    </div>
                </section>
            </div>
        );
    }
};

export default Homepage;
