import React, { Component } from 'react';
import styles from '../styles/Index.module.css';
import { Link } from 'react-router-dom';
import logo from "../images/pryde-symbol.png";

class Login extends Component {

    render() {
        return (
            <>
                {/*    <div className={styles.welcomePic}>*/}
                {/*        <img src={logo} alt="PRYDE logo" className={styles.imagelogo} />*/}
                {/*        /!*<h1 className={styles.topText}> pic goes here</h1>*!/*/}

                {/*    </div>*/}

                {/*    <div className={styles.welcomeText}>*/}

                {/*        <h1 className={styles.topText}>*/}
                {/*            Welcome to PRYDE’s Research Connector!*/}
                {/*        </h1>*/}
                {/*        <br></br>*/}
                {/*        <input className={styles.loginButton} type="submit" value="SIGN IN TO CONTINUE" />*/}

                {/*    </div>*/}


                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}


                {/*<div className={styles.aboutDiv}>*/}
                {/*    <h1 className={styles.aboutCaps}>*/}
                {/*        ABOUT*/}
                {/*    </h1>*/}


                {/*    <h1 className={styles.topText}>*/}

                {/*        PRYDE created this space to connect researchers and practitioners with a shared interest in youth development.*/}
                {/*        <br></br>*/}
                {/*        <br></br>*/}
                {/*    </h1>*/}

                {/*</div>*/}

                {/*<div className={styles.aboutPic}>*/}
                {/*    <img src={logo} alt="PRYDE logo" className={styles.imagelogo} />*/}

                {/*</div>*/}

                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}




                {/*<div className={styles.homeDiv1}>*/}

                {/*    <h1 className={styles.cardtext}>*/}
                {/*        •    Are you looking to collaborate on a research idea? Search our network of profiles for people who share your research interest and reach out to them.*/}
                {/*        <br></br>*/}
                {/*        <br></br>*/}
                {/*    </h1>*/}


                {/*</div>*/}




                {/*<div className={styles.homeDiv2}>*/}
                {/*    <h1 className={styles.cardtext}>*/}


                {/*    •    Do you want to be part of a study that’s already in progress? Check out our list of research opportunities and get involved.*/}
                {/*        <br></br>*/}
                {/*        <br></br>*/}
                {/*    </h1>*/}

                {/*</div>*/}


                {/*<div className={styles.homeDiv3}>*/}

                {/*<h1 className={styles.cardtext}>*/}

                {/*•    Do you want to help PRYDE identify overlapping research interests and needs? Create a profile and tell us about the work you do and the projects you want to see.*/}
                {/*    Create your profile and let’s start making connections!*/}
                {/*    <br></br>*/}
                {/*    <br></br>*/}
                {/*</h1>*/}


                {/*</div>*/}



                <div id={styles.div1}>


                    <p id={styles.graphictext}>

                        some graphic/image here
                    </p>

                    <h1 id={styles.welcometext}>
                        Welcome to [website name]!

                    </h1>




                </div>


                <div id={styles.div2}>










                    <h1 id={styles.aboutheader}> About [Website Name] </h1>

                    <p id={styles.abouttext}>
                        [extended blurb about website] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris.
                    </p>









                </div>

                <div id={styles.div3}>



                    <h1 id={styles.communicate}> Communicate across the state </h1>


                    <p id={styles.discover}> Discover the work youth development researchers throughout New York State are doing. </p>


                    <h1 id={styles.browse}> Browse our archives </h1>

                    <p id={styles.view}> View results and documentation from studies completed in the past </p>



                    <h1 id={styles.understand}> Understand the needs of the New York youth  </h1>

                    <p id={styles.feedback}> Get feedback from 4-H practitioners across New York State about what issues they see in their communities </p>




                </div>

                <div id={styles.div4}>

                    <h1 id={styles.started}> GET STARTED: </h1>

                    <p id={styles.viewing}> Viewing studies and profiles does not require a sign up. </p>

                    <p id={styles.post}> To post about an initiative or create your own profile, sign up now. </p>


                </div>

            </>
        );
    }
}

export default Login;
