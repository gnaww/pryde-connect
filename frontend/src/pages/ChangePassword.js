import React, { Component } from 'react';
import styles from '../styles/Login.module.css';
import api from '../services/api';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            old_password: '',
            new_password1: '',
            new_password2: '',
            errorMessage: '',
            changed: false
        };
    }

    handleOldPasswordChange = event => {
        this.setState({ old_password: event.target.value });
    }

    handlePasswordChange = event => {
        this.setState({ new_password1: event.target.value });
    }

    handlePasswordConfirmChange = event => {
        this.setState({ new_password2: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (!this.state.new_password1 || !this.state.new_password2 || !this.state.old_password) {
            this.setState({ errorMessage: "All fields are required." });
        } else if (this.state.new_password1.trim().length < 8) {
            this.setState({ errorMessage: "New password must be at least 8 characters long." });
        } else if (this.state.new_password1 !== this.state.new_password2) {
            this.setState({ errorMessage: "New passwords do not match." });
        } else {
            this.setState({ errorMessage: "" });
            let data = {
                old_password: this.state.old_password,
                new_password1: this.state.new_password1,
                new_password2: this.state.new_password2
            }
            api.changePassword(data)
                .then(response => {
                    this.setState({ changed: true })
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response.data);
                    this.setState({ errorMessage: Object.values(error.response.data)[0] });
                })
        }
    }

    componentDidMount() {
        document.title = "PRYDE Connect | Change Password";
    }

    render() {
        return (
            <div className={styles.loginWrapper}>
                {
                    !this.state.changed ?
                        <>
                            <h1 className={styles.joinOurCommunity}>
                                Change your password
                            </h1>
                            <form className={styles.loginForm} onSubmit={this.handleSubmit}>
                                <input className={styles.textInput} placeholder="Current password" type="password" value={this.state.old_password} onChange={this.handleOldPasswordChange} />
                                <input className={styles.textInput} placeholder="New password" type="password" value={this.state.new_password1} onChange={this.handlePasswordChange} />
                                <input className={styles.textInput} placeholder="Confirm new password" type="password" value={this.state.new_password2} onChange={this.handlePasswordConfirmChange} />
                                <p className={styles.errorMessage}>{this.state.errorMessage}</p>
                                <input className={styles.loginButton} type="submit" value="SAVE" />
                            </form>
                        </>
                    :
                        <>
                            <h1 className={styles.joinOurCommunity}>
                                Success!
                            </h1>
                            <h2 className={styles.loginToCreate}>
                                Your password was succesfully changed.
                            </h2>
                        </>
                }
            </div>
        );
    }
}

export default ChangePassword;
