import React, { Component } from 'react';
import loginGreen from '../images/login-green.png';
import loginBlue from '../images/login-blue.png';
import styles from '../styles/Login.module.css';
import { Link } from 'react-router-dom';
import api from '../services/api';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        };
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange = event => {
        this.setState({ password: event.target.value });
    }

    handleLogin = event => {
        event.preventDefault();

        this.setState({ errorMessage: "" });
        if (!this.state.email || !this.state.password) {
            this.setState({ errorMessage: "Both fields must be filled in."});
        } else {
            api.login(this.state)
                .then(response => {
                    localStorage.setItem("pryde_key", response.data.key);
                    this.props.history.push("/myprofile");
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ errorMessage: Object.values(error.response.data)[0][0] });
                });
        }
    }

    componentDidMount() {
        document.title = "PRYDE Connect | Log In";
    }

    render() {
        return (
            <div className={styles.loginWrapper}>
                <div className={styles.loginGraphic} id={styles.loginBlue}>
                    <img  src={loginBlue} alt="Login graphic" />
                </div>
                <h1 className={styles.title}>
                    Join our community
                </h1>
                <h2 className={styles.subtitle}>
                    Log in to create a profile or post a study
                </h2>
                {
                    this.props.location.search === "?confirm=true" &&
                    <p className={styles.successMessage}>Email address verified!</p>
                }
                {
                    this.props.location.search === "?reset=true" &&
                    <p className={styles.successMessage}>Password successfully reset! You may now log in.</p>
                }
                <form className={styles.loginForm} onSubmit={this.handleLogin}>
                    <input className={styles.textInput} placeholder="Email address" type="text" value={this.state.email} onChange={this.handleEmailChange} />
                    <input className={styles.textInput} placeholder="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <p className={styles.errorMessage}>{this.state.errorMessage}</p>
                    <input className={styles.loginButton} type="submit" value="LOG IN" />
                </form>
                <div className={styles.links}>
                    <Link className={styles.link} to="/signup">Create an account</Link>
                    <Link className={styles.link} to="/forgot">Forgot your password?</Link>
                </div>
                <div className={styles.loginGraphic} id={styles.loginGreen}>
                    <img src={loginGreen} alt="Login graphic" />
                </div>
            </div>
        );
    }
}

export default Login;
