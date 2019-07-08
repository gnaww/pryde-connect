import React, { Component } from 'react';
import styles from '../styles/Login.module.css';
import { Link } from 'react-router-dom';
import api from '../services/api/api'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange = event => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = event => {

        console.log("clicked button");
        console.log(this.state);
        event.preventDefault();

        api.login(this.state)
            .then(response => {

                console.log(response);
                console.log("hello there");
            })
            .catch(error => {
                console.log(error);
                console.log("there was an error");
            })
    }

    render() {
        return (
            <>
                <h1 className={styles.joinOurCommunity}>
                    Join our community
                </h1>
                <h2 className={styles.loginToCreate}>
                    Log in to create a profile or post a study.
                </h2>
                <form className={styles.loginForm} onSubmit={this.handleSubmit}>
                    <input className={styles.textInput} placeholder="Email address" type="text" value={this.state.email} onChange={this.handleEmailChange} />
                    <input className={styles.textInput} placeholder="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <input className={styles.loginButton} type="submit" value="LOG IN" />
                </form>
                <div className={styles.links}>
                    <Link className={styles.link} to="/signup">Create an account</Link>
                    <Link className={styles.link} to="/forgotpassword">Forgot password?</Link>
                </div>
            </>
        );
    }
}

export default Login;
