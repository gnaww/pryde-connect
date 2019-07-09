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
import studies from '../images/studies.png';
import styles from '../styles/Homepage.module.css';
import { Link } from 'react-router-dom';

class Homepage extends Component {
    componentDidMount() {
        const MIN = 0;
        const MAX = 4;
        const randomInt= Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
        const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5];
        document.getElementById(styles.welcomeBanner).style.backgroundImage = 'url(' + heroImages[randomInt] + ')';
    }
    
    render() {
        return (
            <div className={styles.container}>
                <section id={styles.welcomeBanner}>
                    <h1>Welcome to Research Connect</h1>
                    <p>Where connections are built.</p>
                    <Link to="/signup">CLICK TO SIGN UP</Link>
                    <button 
                        onClick={
                            () =>
                                window.scroll({
                                    top: 800,
                                    left: 0,
                                    behavior: 'smooth'
                                })
                        }
                    >
                        LEARN MORE
                        <img src={scrollDown} alt="Scroll down arrow" />
                    </button>
                </section>
                <section className={styles.aboutUs}>
                    <div>
                        <h2>About Us</h2>
                        <p>
                            The Research Connector is the place for researchers and practitioners with a shared interest in youth development to connect to each other.
                        </p>
                        <p>
                            Share your research interests and needs, identify potential research partners, and stay up to date on all of the PRYDE-affiliated research opportunities. Let’s build connections to support research and practice that helps youth thrive.
                        </p>
                    </div>
                    <img src={connect} alt="Research connect" />
                </section>
                <section className={styles.features}>
                    <div>
                        <div>
                            <h2>Communicate across the state</h2>
                            <p>
                                Discover the work youth development researchers throughout New York State are doing
                            </p>
                        </div>
                        <div>
                            <h2>Browse our archives</h2>
                            <p>
                                View results and documentation from studies completed in the past
                            </p>
                        </div>
                        <div>
                            <h2>Understand the needs of New York youth</h2>
                            <p>
                                Get feedback from 4-H practitioners across New York State about what issues they see in their communities
                            </p>
                        </div>
                    </div>
                    <div>
                        <img src={screenshot1} alt="Website screenshot" />
                        <img src={screenshot2} alt="Website screenshot" />
                        <img src={screenshot3} alt="Website screenshot" />
                    </div>
                </section>
                <section className={styles.getStarted}>
                    <div>
                        <h2>GET STARTED</h2>
                        <div>
                            <Link to="/browse">
                                <img src={studies} alt="View studies" />
                            </Link>
                            <p>
                                Viewing studies and profiles does not require signing up.
                            </p>
                        </div>
                        <div>
                            <Link to="/signup">
                                <img src={addPerson} alt="Sign up" />
                            </Link>
                            <p>
                                To post about an initiative or create your own profile, sign up now.
                            </p>
                        </div>
                    </div>
                    <img src={combinedLogos} alt="PRYDE and 4-H logo" />
                </section>
            </div>
        );
    }
};
    
export default Homepage;
