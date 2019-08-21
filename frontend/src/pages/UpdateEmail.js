import React, { Component } from 'react';
import styles from '../styles/Login.module.css';
import { isValidEmail } from '../services/validators';
import api from '../services/api';

class UpdateEmail extends Component {
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
            api.updateEmail(this.state.email)
                .then(response => {
                    if (response) {
                        api.logout()
                        this.setState({ submitted: true });
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ errorMessage: Object.values(error.response.data)[0] });
                })
        }
    }

    componentDidMount() {
        document.title = "PRYDE Connect | Update Email";
    }

    render() {
        return (
            <div className={styles.loginWrapper}>
                {
                    !this.state.submitted ?
                        <>
                            <h1 className={styles.title}>
                                Update email address
                            </h1>
                            <form className={styles.loginForm} onSubmit={this.handleSubmit}>
                                <input className={styles.textInput} placeholder="New email address" type="text" value={this.state.email} onChange={this.handleEmailChange} />
                                <p className={styles.errorMessage}>{this.state.errorMessage}</p>
                                <input className={styles.loginButton} type="submit" value="UPDATE" />
                            </form>
                        </>
                    :
                        <>
                            <h1 className={styles.title}>
                                Success!
                            </h1>
                            <h2 className={styles.subtitle}>
                                A confirmation email has been sent to <b>{this.state.email}</b>. Click on the confirmation link in the email to re-activate your account.
                            </h2>
                        </>
                }
            </div>
        );
    }
}

export default UpdateEmail;
