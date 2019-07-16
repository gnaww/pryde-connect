import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/CreateProfile.module.css';
import ProfileButton from '../../images/profile.svg';
import HomeButton from '../../images/home.svg';
import StudiesButton from '../../images/studies.svg';

const navigationOptions = [
    {
        img: ProfileButton,
        unclicked: styles.profileNavImg,
        link: "/"
    },
    {
        img: HomeButton,
        unclicked: styles.homeNavImg,
        link: "/"
    },
    {
        img: StudiesButton,
        unclicked: styles.studiesNavImg,
        link: "/browse"
    }

];

class ReviewFinish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: null
        };
    }

    handleClick = (index) => () => {
        this.setState({ clicked: index });
    }

    render() {
        return (
            <div className={styles.finishPage}>
                {
                    navigationOptions.map((nav, index) => {
                        return (
                            <div className={styles.roleCard} key={index}>
                                <Link to={nav.link}>
                                    <img
                                        className={nav.unclicked}
                                        src={nav.img}
                                        onClick={this.handleClick(index)}
                                        alt={"TODO"}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ReviewFinish;