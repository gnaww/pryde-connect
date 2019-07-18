import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Browse from './pages/Browse';
import Login from './pages/Login';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import Profile from './pages/Profile';
import Project from './pages/Project';
import PageNotFound from './pages/PageNotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import styles from './App.module.css';

function App() {
    return (
        <Router>
            <div className={styles.wrapper}>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Homepage} />
                    <Route path="/browse" component={Browse} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" render={() => {
                            return localStorage.getItem("pryde_key") ? <Redirect to="/" /> : <CreateProfile />
                        }} />
                    <Route path="/user/:id" component={Profile} />
                    <Route path="/project/:id" component={Project} />
                    <Route component={PageNotFound} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
