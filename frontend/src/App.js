import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Browse from './pages/Browse';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Project from './pages/Project';
import PageNotFound from './pages/PageNotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import styles from './App.module.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    componentDidMount() {
        if (localStorage.getItem("pryde_key")) {
            this.setState({ loggedIn: true })
        }
    }

    render() {
        return (
            <Router>
                <div className={styles.wrapper}>
                    <Navbar loggedIn={this.state.loggedIn} />
                    <Switch>
                        <Route path="/" exact component={Homepage} />
                        <Route path="/browse" component={Browse} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/myprofile" exact component={Profile} />
                        <Route path="/user/:id" component={Profile} />
                        <Route path="/project/:id" component={Project} />
                        <Route component={PageNotFound} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
