import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import stylesUnauthorized from '../../styles/PageNotFound.module.css';
import styles from '../../styles/CreateProfile.module.css';
import SubmitProject from './SubmitProject';
import FinishSubmit from './FinishSubmit';

let pages = [
    {
        title: "Submit a project",
        subtitle: "Welcome! Please complete the following fields.",
        content: SubmitProject
    },
    {
        title: "Thank you!",
        subtitle: "Your project has been submitted for approval.",
        content: FinishSubmit
    }
];

class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            pageData: pages.map(() => { return null }),
            clickedNext: false
        };
    }

    submitData = (data, errors) => {
        if (!errors) {
            let nextPage = this.state.page + 1;
            let pageDataCopy = Array.from(this.state.pageData);
            pageDataCopy[this.state.page] = data;
            this.setState({ pageData: pageDataCopy, page: nextPage });
        }
        this.setState({ clickedNext: false });
    }

    handleNext = () => {
        this.setState({ clickedNext: true });
    }

    render() {
        let PageContent = pages[this.state.page].content;
        return (
            localStorage.getItem("pryde_key") ?
                <div className={styles.root} >
                    <h1 className={styles.createProfile}>{pages[this.state.page].title}</h1>
                    <h2 className={styles.subtitle}>{pages[this.state.page].subtitle}</h2>
                    <PageContent clickedNext={this.state.clickedNext} onSubmitData={this.submitData} />
                    <div className={styles.buttons}>
                        {
                            this.state.page < pages.length - 1 &&
                            (<input className={styles.nextButton} type="submit" value="FINISH" onClick={this.handleNext} />)
                        }
                    </div>
                </div>
            :
                <div className={stylesUnauthorized.container}>
                    <section className={stylesUnauthorized.pageNotFound}>
                        <div>
                            <h1>Unauthorized!</h1>
                            <p>You must be signed in to submit a new project.</p>
                            <p><Link to="/login">Log in</Link> to your account or <Link to="/signup">sign up</Link> for a new account.</p>
                        </div>
                    </section>
                </div>
        )
    }
}

export default CreateProject;