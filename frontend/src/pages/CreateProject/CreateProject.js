import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import stylesUnauthorized from '../../styles/PageNotFound.module.css';
import styles from '../../styles/CreateProfile.module.css';
import SubmitProject from './SubmitProject';
import FinishSubmit from './FinishSubmit';
import api from '../../services/api';
import normalizeUrl from 'normalize-url';
import phone from 'phone';

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
let editPages = [
    {
        title: "Edit project",
        subtitle: "Edit your project's details and information.",
        content: SubmitProject
    },
    {
        title: "Your project was successfully updated.",
        subtitle: "",
        content: FinishSubmit
    }
];

class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            pageData: null,
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
        project.name = data.name.option;
        project.alternateLocation = data.alternateLocation.option;
        project.timeline = data.timeline.option;
        project.commitmentLength = data.commitmentLength.option;
        project.incentives = data.incentives.option;
        project.status = parseInt(data.status);
        project.researchTopics = formatArray(data.researchTopics);
        project.ageRanges = formatArray(data.ageRanges);
        project.deliveryModes = formatArray(data.deliveryModes);
        if (data.alternateContact.website) {
            project.alternateContact.website = data.alternateContact.website ? normalizeUrl(data.alternateContact.website) : "";
        }
        if (data.alternateContact.phone) {
            project.alternateContact.phone = data.alternateContact.phone ? phone(data.alternateContact.phone)[0] : "";
        }
        // TODO: add additional files to projects
        // project.additionalFiles = data.additionalFiles;
        project.additionalFiles = [];
        // TODO: add collaborators to projects
        // project.collaborators = data.collaborators;
        project.collaborators = [];
        console.log(project);
        // TODO: add error handling for if creating/updating project fails
        if (this.props.editing === true) {
            api.updateProject(this.props.editProjectData.id, project)
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                    console.log(err.response.data);
                });
        } else {
            api.createProject(project)
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                    console.log(err.response.data);
                });
        }
    }

    submitData = (data, errors) => {
        if (!errors) {
            this.createProject(data);
            this.setState({ page: 1 });
        }
        this.setState({ clickedNext: false });
    }

    handleNext = () => {
        this.setState({ clickedNext: true });
    }

    componentDidMount() {
        if (this.props.editProjectData) {
            this.setState({ pageData: this.props.editProjectData });
        }
    }

    render() {
        const { editing } = this.props;
        const PageContent = editing ? editPages[this.state.page].content : pages[this.state.page].content;
        const title = editing ? editPages[this.state.page].title : pages[this.state.page].title;
        const subtitle = editing ? editPages[this.state.page].subtitle : pages[this.state.page].subtitle;
        const NUM_PAGES = editing ? editPages.length : pages.length;

        return (
            localStorage.getItem("pryde_key") ?
                <div className={styles.root} >
                    <h1 className={styles.createProfile}>{title}</h1>
                    <h2 className={styles.subtitle}>{subtitle}</h2>
                    <PageContent clickedNext={this.state.clickedNext} onSubmitData={this.submitData} savedData={this.state.pageData} />
                    <div className={styles.buttons}>
                        {
                            this.state.page < NUM_PAGES - 1 &&
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