import React, { Component } from 'react';
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
        subtitle: "Your study has been submitted for approval.",
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
            <div className={styles.root} >
                <h1 className={styles.createProfile}>{pages[this.state.page].title}</h1>
                <h2 className={styles.subtitle}>{pages[this.state.page].subtitle}</h2>
                <PageContent clickedNext={this.state.clickedNext} onSubmitData={this.submitData} />
                <div className={styles.buttons}>
                    {
                        this.state.page < pages.length - 1 &&
                        (<input className={styles.nextButton} type="submit" value="NEXT" onClick={this.handleNext} />)
                    }
                </div>
            </div>
        )
    }
}

export default CreateProject;