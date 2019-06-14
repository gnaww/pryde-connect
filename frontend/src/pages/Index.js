import React, { Component } from 'react';
import styles from '../styles/Index.module.css';
import { Link } from 'react-router-dom';
import logo from "../images/pryde-symbol.png";

class Login extends Component {

    render() {
        return (
            <>
                    <div className={styles.welcomePic}>
                        <img src={logo} alt="PRYDE logo" className={styles.imagelogo} />
                        {/*<h1 className={styles.topText}> pic goes here</h1>*/}

                    </div>

                    <div className={styles.welcomeText}>

                        <h1 className={styles.topText}>
                            Welcome to PRYDE’s Research Connector!
                        </h1>
                        <br></br>
                        <input className={styles.loginButton} type="submit" value="SIGN IN TO CONTINUE" />

                    </div>


                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>


                <div className={styles.aboutDiv}>
                    <h1 className={styles.aboutCaps}>
                        ABOUT
                    </h1>


                    <h1 className={styles.topText}>

                        PRYDE created this space to connect researchers and practitioners with a shared interest in youth development.
                        <br></br>
                        <br></br>
                    </h1>

                </div>

                <div className={styles.aboutPic}>
                    <img src={logo} alt="PRYDE logo" className={styles.imagelogo} />

                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>




                <div className={styles.homeDiv1}>

                    <h1 className={styles.cardtext}>
                        •    Are you looking to collaborate on a research idea? Search our network of profiles for people who share your research interest and reach out to them.
                        <br></br>
                        <br></br>
                    </h1>


                </div>




                <div className={styles.homeDiv2}>
                    <h1 className={styles.cardtext}>


                    •    Do you want to be part of a study that’s already in progress? Check out our list of research opportunities and get involved.
                        <br></br>
                        <br></br>
                    </h1>

                </div>


                <div className={styles.homeDiv3}>

                <h1 className={styles.cardtext}>

                •    Do you want to help PRYDE identify overlapping research interests and needs? Create a profile and tell us about the work you do and the projects you want to see.
                    Create your profile and let’s start making connections!
                    <br></br>
                    <br></br>
                </h1>


                </div>

            </>
        );
    }
}

export default Login;
