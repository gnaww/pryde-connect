import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Browse from './pages/Browse';
import Login from './pages/Login';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import CreateProject from './pages/CreateProject/CreateProject';
import Profile from './pages/Profile';
import Project from './pages/Project';
import EditProfile from './pages/EditProfile';
import EditProject from './pages/EditProject';
import PageNotFound from './pages/PageNotFound';
import SuccessfulDelete from './pages/SuccessfulDelete';
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import EmailPreferences from './pages/EmailPreferences';
import UpdateEmail from './pages/UpdateEmail';
import VerifyEmail from './pages/VerifyEmail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import styles from './App.module.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (width < 1410) {
            alert("Please use this website on a desktop or laptop size screen with the browser fully maximized, or else there may be visual glitches.")
        }
    }

    render() {
        return (
            <Router>
                <div className={styles.wrapper}>
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Homepage} />
                        <Route path="/browse" component={Browse} />
                        <Route path="/login" exact render={renderProps => (
                            localStorage.getItem("pryde_key") ? <Redirect to="/" /> : <Login {...renderProps} />
                        )} />
                        <Route path="/signup" exact render={renderProps => (
                            localStorage.getItem("pryde_key") ? <Redirect to="/" /> : <CreateProfile {...renderProps} />
                        )} />
                        <Route path="/myprofile" exact render={renderProps => (
                            !localStorage.getItem("pryde_key") ? <Redirect to="/" /> : <Profile {...renderProps} />
                        )} />
                        <Route path="/submit" exact component={CreateProject} />
                        <Route path="/user/:id" component={Profile} />
                        <Route path="/project/:id" component={Project} />
                        <Route path="/editprofile" exact component={EditProfile} />
                        <Route path="/editproject" exact component={EditProject} />
                        <Route path="/success" exact component={SuccessfulDelete} />
                        <Route path="/password" render={renderProps => (
                            !localStorage.getItem("pryde_key") ? <Redirect to="/" /> : <ChangePassword {...renderProps} />
                        )} />
                        <Route path="/forgot" render={renderProps => (
                            localStorage.getItem("pryde_key") ? <Redirect to="/" /> : <ForgotPassword {...renderProps} />
                        )} />
                        <Route path="/reset/:uid/:token" render={renderProps => (
                            localStorage.getItem("pryde_key") ? <Redirect to="/" /> : <ResetPassword {...renderProps} />
                        )} />
                        <Route path="/update" render={renderProps => (
                            !localStorage.getItem("pryde_key") ? <Redirect to="/" /> : <UpdateEmail {...renderProps} />
                        )} />
                        <Route path="/preferences" render={renderProps => (
                            !localStorage.getItem("pryde_key") ? <Redirect to="/" /> : <EmailPreferences {...renderProps} />
                        )} />
                        <Route path="/confirm/:key" render={renderProps => (
                            localStorage.getItem("pryde_key") ? <Redirect to="/" /> : <VerifyEmail {...renderProps} />
                        )} />
                        <Route component={PageNotFound} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App;
