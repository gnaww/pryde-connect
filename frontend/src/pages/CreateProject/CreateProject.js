import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import stylesUnauthorized from '../../styles/PageNotFound.module.css';
import styles from '../../styles/CreateProfile.module.css';
import SubmitProject from './SubmitProject';
import FinishSubmit from './FinishSubmit';
import api from '../../services/api';

let pages = [
    {
        title: "Submit a project",
        subtitle: "Welcome! Please complete the following questions.",
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
            clickedNext: false
        };
    }

    // builds project object from data to POST to the API
    createProject = data => {
        let project = Object.assign({}, data);
        const formatArray = arr => {
            return (
                arr.filter(elt => elt.checked)
                    .map(elt => elt.other ? elt.other : elt.value)
            );
        };
        project.status = parseInt(data.status);
        project.researchTopics = formatArray(data.researchTopics);
        project.ageRanges = formatArray(data.ageRanges);
        project.deliveryModes = formatArray(data.deliveryModes);

        // TODO: add additional files to projects
        // project.additionalFiles = data.additionalFiles;
        project.additionalFiles = [];
        // TODO: add collaborators to projects
        // project.collaborators = data.collaborators;
        project.collaborators = [];
        // TODO: add error handling for if creating project fails
        api.createProject(project)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
                //console.log(err.response.data);
            });
    }

    submitData = (data, errors) => {
        console.log(errors);
        if (!errors) {
            this.createProject(data);
            this.setState({ page: 1 });
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