import React, { Component } from 'react';
import styles from '../styles/Login.module.css';
import api from '../services/api';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new_password1: '',
            new_password2: '',
            errorMessage: ''
        };
    }

    handlePasswordChange = event => {
        this.setState({ new_password1: event.target.value });
    }

    handlePasswordConfirmChange = event => {
        this.setState({ new_password2: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (!this.state.new_password1 || !this.state.new_password2) {
            this.setState({ errorMessage: "Both password fields are required." });
        } else if (this.state.new_password1.trim().length < 8) {
            this.setState({ errorMessage: "Password must be at least 8 characters long." });
        } else if (this.state.new_password1 !== this.state.new_password2) {
            this.setState({ errorMessage: "Passwords do not match." });
        } else {
            this.setState({ errorMessage: "" });
            const { uid } = this.props.match.params;
            const { token } = this.props.match.params;
            let data = {
                uid: uid,
                token: token,
                new_password1: this.state.new_password1,
                new_password2: this.state.new_password2
            }
            api.resetPassword(data)
                .then(response => {
                    console.log(response);
                    this.props.history.push("/login")
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response.data);
                    this.setState({ errorMessage: Object.values(error.response.data)[0] });
                })
        }
    }

    componentDidMount() {
        document.title = "PRYDE Connect | Reset Password";
    }

    render() {
        return (
            <div className={styles.loginWrapper}>
                <h1 className={styles.joinOurCommunity}>
                    Reset your password
                </h1>
                <form className={styles.loginForm} onSubmit={this.handleSubmit}>
                    <input className={styles.textInput} placeholder="New password" type="password" value={this.state.new_password1} onChange={this.handlePasswordChange} />
                    <input className={styles.textInput} placeholder="Confirm password" type="password" value={this.state.new_password2} onChange={this.handlePasswordConfirmChange} />
                    <p className={styles.errorMessage}>{this.state.errorMessage}</p>
                    <input className={styles.loginButton} type="submit" value="DONE" />
                </form>
            </div>
        );
    }
}

export default ResetPassword;
