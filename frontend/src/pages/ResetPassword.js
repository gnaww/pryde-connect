import React, { Component } from 'react';
import loginGreen from '../images/login-green.png';
import loginBlue from '../images/login-blue.png';
import styles from '../styles/Login.module.css';
import { Link } from 'react-router-dom';
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

    handleEmailChange = event => {
        this.setState({ new_password1: event.target.value });
    }

    handlePasswordChange = event => {
        this.setState({ new_password2: event.target.value });
    }

    handleLogin = event => {
        event.preventDefault();

        if (!this.state.new_password1 || !this.state.new_password2) {
            this.setState({ errorMessage: "Both fields must be filled in."});
        } else {
            if (this.state.new_password1 != this.state.new_password2) {
                this.setState({errorMessage: "Passwords must match"});
            } else {
                this.setState({errorMessage: ""});
                const { uid } = this.props.match.params;
                const { token } = this.props.match.params;
                console.log(uid);
                console.log(token);
                let data = {
                    'uid': uid,
                    'token': token,
                    'new_password1': this.state.new_password1,
                    'new_password2': this.state.new_password2
                }
                api.resetPassword(data)
                    .then(response => {
                        console.log(response);
                        this.props.history.push("/login")

                    })
                    .catch(error => {
                        console.log(error)
                        this.setState({errorMessage: Object.values(error.response.data)[0][0]});
                    })


            }

        }
    }

    componentDidMount() {
        document.title = "PRYDE Connect | Password Reset";

    }

    render() {
        return (
            <div className={styles.loginWrapper}>
                <div className={styles.loginGraphic} id={styles.loginBlue}>
                    <img  src={loginBlue} alt="Login graphic" />
                </div>
                <h1 className={styles.joinOurCommunity}>
                    Reset Your Password Below
                </h1>
                <form className={styles.loginForm} onSubmit={this.handleLogin}>
                    <input className={styles.textInput} placeholder="New Password" type="password" value={this.state.new_password1} onChange={this.handleEmailChange} />
                    <input className={styles.textInput} placeholder="Confirm Password" type="password" value={this.state.new_password2} onChange={this.handlePasswordChange} />
                    <p className={styles.errorMessage}>{this.state.errorMessage}</p>
                    <input className={styles.loginButton} type="submit" value="RESET" />
                </form>
                <div className={styles.loginGraphic} id={styles.loginGreen}>
                    <img src={loginGreen} alt="Login graphic" />
                </div>
            </div>
        );
    }
}

export default ResetPassword;
