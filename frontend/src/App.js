import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Browse from './pages/Browse';
import Login from './pages/Login';
import Profile from './pages/Profile';
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
                    <Route path="/browse" component={Browse} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/user/:id" component={Profile} />
                    <Route component={PageNotFound} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
