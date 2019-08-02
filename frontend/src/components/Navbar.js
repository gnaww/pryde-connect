import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import logo from '../images/pryde-symbol.png';
import api from '../services/api';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            key: 0
        };
    }

    remount = () => {
        this.setState(prevState => ({ key: prevState.key + 1 }));
    }

    handleLogout = () => {
        api.logout();
        this.setState({ loggedIn: false });
        this.props.history.push("/");
    }

    componentDidUpdate(prevProps, _prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.remount();
            if (localStorage.getItem("pryde_key")) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        }
    }

    componentDidMount() {
        if (localStorage.getItem("pryde_key")) {
            this.setState({ loggedIn: true });
        } else {
            this.setState({ loggedIn: false });
        }
    }

    render() {
        const { location } = this.props;
        const { loggedIn } = this.state;
        const url = location.pathname;


        return (
            <nav key={this.state.key} className={styles.navbar}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="PRYDE logo" />
                        <p>
                            <span id={styles.pryde}>PRYDE</span>
                            <br/>
                            <span id={styles.name}>Connect</span>
                        </p>
                    </Link>
                </div>
                <div className={styles.linksContainer}>
                    <Link className={url === "/browse" ? styles.activeLink : styles.link} to="/browse">
                        BROWSE
                    </Link>
                    <Link className={url === "/submit" ? styles.activeLink : styles.link} to="/submit">
                        SUBMIT A PROJECT
                    </Link>
                    {
                        loggedIn ?
                        <>
                            <Link className={url === "/myprofile" ? styles.activeLink : styles.link} to="/myprofile">
                                MY PROFILE
                            </Link>
                            <button className={styles.link} onClick={this.handleLogout}>
                                LOG OUT
                            </button>
                        </>
                        :
                        <>
                            <Link className={url === "/login" ? styles.activeLink : styles.link} to="/login">
                                LOG IN
                            </Link>
                            <Link className={url === "/signup" ? styles.activeLink : styles.link} to="/signup">
                                SIGN UP
                            </Link>
                        </>
                    }
                </div>
            </nav>
        );
    }
};

export default withRouter(Navbar);
