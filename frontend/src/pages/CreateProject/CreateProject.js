import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import stylesUnauthorized from '../../styles/PageNotFound.module.css';
import styles from '../../styles/CreateProfile.module.css';
import SubmitProject from './SubmitProject';
import FinishSubmit from './FinishSubmit';
import api from '../../services/api';
import normalizeUrl from 'normalize-url';
import phone from 'phone';
import isEqual from 'lodash.isequal';
import { formatArray } from '../../services/util';

let pages = [
    {
        title: "Submit a project",
        subtitle: "Welcome! Please complete the following questions.",
        content: SubmitProject
    },
    {
        title: "Thank you!",
        subtitle: "Your project has been posted on PRYDE Connect!",
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

const identifyCollaboratorChanges = (newCollaborators, oldCollaborators) => {
    let updatedCollabs = [];
    let addedCollabs = [];
    let deletedCollabs = [];

    // identify collaborators that have changed permissions or are newly added
    newCollaborators.forEach(newCollab => {
        let preExistingCollaborator = oldCollaborators.find(c => c.pk === newCollab.pk);

        // collaborator previously existed, check if permissions have changed
        if (preExistingCollaborator) {
            let collaboratorPermissionChanged = newCollab.editPermission !== preExistingCollaborator.editPermission || newCollab.deletePermission !== preExistingCollaborator.deletePermission || newCollab.editCollaboratorsPermission !== preExistingCollaborator.editCollaboratorsPermission;

            if (collaboratorPermissionChanged) {
                updatedCollabs.push({
                    user: newCollab.pk,
                    editPermission: newCollab.editPermission,
                    deletePermission: newCollab.deletePermission,
                    editCollaboratorsPermission: newCollab.editCollaboratorsPermission
                });
            }
        }

        // collaborator was not pre-existing, is a newly added collaborator
        if (preExistingCollaborator === undefined) {
            addedCollabs.push({
                user: newCollab.pk,
                editPermission: newCollab.editPermission,
                deletePermission: newCollab.deletePermission,
                editCollaboratorsPermission: newCollab.editCollaboratorsPermission
            });
        }
    });

    // identify collaborators that were deleted
    oldCollaborators.forEach(oldCollab => {
        let deleted = newCollaborators.find(c => c.pk === oldCollab.pk) === undefined;

        if (deleted) {
            deletedCollabs.push({ user: oldCollab.pk });
        }
    })

    return { addedCollaborators: addedCollabs, updatedCollaborators: updatedCollabs, deletedCollaborators: deletedCollabs };
};

const identifyProjectFileChanges = (newFiles, oldFiles) => {
    let addedFiles = [];
    let deletedFiles = [];

    newFiles.forEach(file => {
        // if file was pre-existing, file[0] is an integer pk
        if (file[0] instanceof File) {
            addedFiles.push(file);
        }
    });

    oldFiles.forEach(file => {
        // file[0] is an integer pk, f[0] is either a File object or an integer pk
        let deleted = newFiles.find(f => f[0] === file[0]) === undefined;

        if (deleted) {
            deletedFiles.push(file[0]);
        }
    });

    return { addedFiles: addedFiles, deletedFiles: deletedFiles };
};

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
    createProject = async data => {
        let project = Object.assign({}, data);

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

        delete project.collaborators;
        delete project.initialCollaborators;
        delete project.additionalFiles;
        delete project.initialAdditionalFiles;

        if (this.props.editing === true) {
            try {
                await api.updateProject(this.props.editProjectData.id, project);
                if (project.editCollaboratorsPermission) {
                    const { addedCollaborators, updatedCollaborators, deletedCollaborators } = identifyCollaboratorChanges(data.collaborators, data.initialCollaborators);
                    addedCollaborators.forEach(async added => {
                        await api.addCollaborator(project.id, added);
                    });
                    updatedCollaborators.forEach(async updated => {
                        await api.updateCollaborator(project.id, updated);
                    });
                    deletedCollaborators.forEach(async deleted => {
                        await api.deleteCollaborator(project.id, deleted);
                    });
                }
                const { addedFiles, deletedFiles } = identifyProjectFileChanges(data.additionalFiles, data.initialAdditionalFiles);
                addedFiles.forEach(async added => {
                    await api.uploadProjectFile(project.id, added[0]);
                });
                deletedFiles.forEach(async deleted => {
                    await api.deleteProjectFile(project.id, deleted);
                });
                return { success: true, message: "" };
            } catch(err) {
                console.log(err);
                console.log(err.response.data);
                return { success: false, message: Object.values(err.response.data)[0] };
            }
        } else {
            try {
                let createdProject = await api.createProject(project);
                data.collaborators.forEach(async collaborator => {
                    const c = {
                        user: collaborator.pk,
                        editPermission: collaborator.editPermission,
                        deletePermission: collaborator.deletePermission,
                        editCollaboratorsPermission: collaborator.editCollaboratorsPermission
                    }
                    await api.addCollaborator(createdProject.data.id, c);
                });
                data.additionalFiles.forEach(async file => {
                    await api.uploadProjectFile(createdProject.data.id, file[0]);
                })
                return { success: true, message: "" };
            } catch(err) {
                console.log(err);
                console.log(err.response.data);
                return { success: false, message: Object.values(err.response.data)[0] };
            }
        }
    }

    submitData = (data, errors) => {
        if (!errors) {
            this.createProject(data)
                .then(response => {
                    if (response.success) {
                        // successful
                        this.setState({ page: 1 });
                    } else {
                        // failed to create/update project
                        this.setState({ pageData: data, page: 0 });
                        if (this.props.editing) {
                            alert(response.message ? response.message : "There was an error updating your project. Please try again and make sure all questions are filled out properly.");
                        } else {
                            alert(response.message ? response.message : "There was an error creating your project. Please try again and make sure all questions are filled out properly.");
                        }
                    }
                });
        }
        this.setState({ clickedNext: false });
    }

    handleNext = () => {
        this.setState({ clickedNext: true });
    }

    componentDidUpdate(prevProps, _prevState) {
        if (!isEqual(prevProps.editProjectData, this.props.editProjectData)) {
            this.setState({ pageData: this.props.editProjectData });
        }
    }

    componentDidMount() {
        document.title = this.props.editing ? "PRYDE Connect | Edit Project" : "PRYDE Connect | Submit a Project";
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
                    <p className={styles.disclaimer}>Keep in mind that the contact information you provide will be publicly viewable so that potential partners can contact you.</p>
                    <PageContent clickedNext={this.state.clickedNext} onSubmitData={this.submitData} savedData={this.state.pageData} editing={editing} location={this.props.location} />
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
                            <h1>Oops!</h1>
                            <p>You must be signed in to submit a new project.</p>
                            <p><Link to="/login">Log in</Link> to your account or <Link to="/signup">sign up</Link> for a new account.</p>
                        </div>
                    </section>
                </div>
        )
    }
}

export default CreateProject;
