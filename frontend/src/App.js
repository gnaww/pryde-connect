import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Browse from './pages/Browse';
import styles from './App.modulecss';

function App() {
    return (
        <Router>
            <div className={styles.Wrapper}>
                {/* <Header /> */}
                <div className={styles.Container}>
                    <Switch>
                        <Route path="/" exact component={Browse} />
                    </Switch>
                </div>
                {/* <Footer /> */}
            </div>
        </Router>
    );
}

export default App;
