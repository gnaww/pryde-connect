import React, { Component } from 'react';
import styles from '../styles/Login.module.css';
import { Link } from 'react-router-dom';
class Login extends Component {

    render() {
        return (
            <>
                <div>
                    <p className={styles.joinOurCommunity}>
                        Join our community
                    </p>
                    <p className={styles.loginToCreate}>
                        Log in to create a profile or post a study.
                    </p>
                    <form className={styles.loginForm}>
                        <input className={styles.textInput} placeholder="Email address" type="text" />
                        <input className={styles.textInput} placeholder="Password" type="password" />
                        <input className={styles.loginButton} type="submit" value="LOG IN" />
                    </form>
                    <div className={styles.links}>
                        <Link className={styles.link} to="/createaccount">Create an account</Link>
                        <Link className={styles.link} to="/forgotpassword">Forgot password?</Link>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;