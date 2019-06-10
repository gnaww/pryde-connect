import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Browse from './pages/Browse';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import styles from './App.module.css';

function App() {
    return (
        <Router>
            <div className={styles.wrapper}>
                <Navbar />
                <main className={styles.container}>
                    <Switch>
                        <Route path="/browse" exact component={Browse} />
                    </Switch>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
