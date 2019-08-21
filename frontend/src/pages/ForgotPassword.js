import React, { Component } from 'react';
import styles from '../styles/Login.module.css';
import { isValidEmail } from '../services/validators';
import api from '../services/api';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errorMessage: '',
            submitted: false
        };
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (!this.state.email) {
            this.setState({ errorMessage: "An email address is required." });
        } else if (!isValidEmail(this.state.email)) {
            this.setState({ errorMessage: "Invalid email address." });
        } else {
            this.setState({ errorMessage: "" });
            api.requestPasswordReset(this.state.email)
                .then(response => {
                    this.setState({ submitted: true });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ errorMessage: Object.values(error.response.data)[0] });
                });
        }
    }

    componentDidMount() {
        document.title = "PRYDE Connect | Forgot Password";
    }

    render() {
        return (
            <div className={styles.loginWrapper}>
                {
                    !this.state.submitted ?
                        <>
                            <h1 className={styles.title}>
                                Forgot your password?
                            </h1>
                            <h2 className={styles.subtitle}>
                                Enter your account's email address, and we'll send you instructions for resetting your password.
                            </h2>
                            <form className={styles.loginForm} onSubmit={this.handleSubmit}>
                                <input className={styles.textInput} placeholder="Your email address" type="text" value={this.state.email} onChange={this.handleEmailChange} />
                                <p className={styles.errorMessage}>{this.state.errorMessage}</p>
                                <input className={styles.loginButton} type="submit" value="EMAIL ME" />
                            </form>
                        </>
                    :
                        <>
                            <h1 className={styles.title}>
                                Success!
                            </h1>
                            <h2 className={styles.subtitle}>
                                You will receive an email at <b>{this.state.email}</b> with further instructions to reset your password.
                            </h2>
                        </>
                }
            </div>
        );
    }
}

export default ForgotPassword;
