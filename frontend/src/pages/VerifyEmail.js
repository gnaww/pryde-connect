import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import api from '../services/api';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            message: "Loading..."
        };
    }

    componentDidMount() {
        document.title = "PRYDE Connect | Confirm Email";

        const { key } = this.props.match.params;
        api.verifyEmail(key)
            .then(response => {
                this.setState({ submitted: true });
            })
            .catch(error => {
                console.log(error);
                console.log(error.response.data);
                this.setState({ message: "Invalid email confirmation key." });
            })
    }

    render() {
        return (
            <div className={styles.loginWrapper}>
                {
                    !this.state.submitted ?
                        <h1 className={styles.title}>{this.state.message}</h1>
                    :
                        <Redirect to="/login?confirm=true" />
                }
            </div>
        );
    }
}

export default VerifyEmail;
