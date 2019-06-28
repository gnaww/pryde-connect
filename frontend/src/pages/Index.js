import React, { Component } from 'react';
import styles from '../styles/Index.module.css';
import { Link } from 'react-router-dom';
import logo from "../images/pryde-symbol.png";
import logoWhite from '../images/pryde-white.png';
import connect2 from '../images/connect2.png'
import screenshot1 from '../images/screenshot1.png'
import screenshot2 from '../images/screenshot2.png'
import screenshot3 from '../images/screenshot3.png'
import prydewhite from '../images/pryde white.png'
import clover from '../images/clover.png'
class Login extends Component {

    render() {
        return (
            <>


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

                    <img className={styles.clocktower} src={connect2} alt="Cornell ClockTower" />

                </div>




                <div id={styles.div3}>

                    <h1 id={styles.communicate}> Communicate across the state </h1>


                    <p id={styles.discover}> Discover the work youth development researchers throughout New York State are doing. </p>


                    <h1 id={styles.browse}> Browse our archives </h1>

                    <p id={styles.view}> View results and documentation from studies completed in the past </p>



                    <h1 id={styles.understand}> Understand the needs of the New York youth  </h1>

                    <p id={styles.feedback}> Get feedback from 4-H practitioners across New York State about what issues they see in their communities </p>


                    <img className={styles.screenshot1} src={screenshot1} alt="Screenshot 1" />
                    <img className={styles.screenshot2} src={screenshot2} alt="Screenshot 2" />
                    <img className={styles.screenshot3} src={screenshot3} alt="Screenshot 3" />




                </div>

                <div id={styles.div4}>

                    <h1 id={styles.started}> GET STARTED: </h1>

                    <p id={styles.viewing}> Viewing studies and profiles does not require a sign up. </p>

                    <p id={styles.post}> To post about an initiative or create your own profile, sign up now. </p>
                    {/*<img className={styles.prydewhite} src={prydewhite} alt="Screenshot 3" />*/}
                    {/*<img className={styles.clover} src={clover} alt="Screenshot 3" />*/}


                </div>

            </>
        );
    }
}

export default Login;
