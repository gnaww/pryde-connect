import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchResult from '../components/SearchResult';
import deleteButton from '../images/delete-button.svg';
import editButtonOrange from '../images/edit-button-orange.svg';
import styles from '../styles/Project.module.css';
import api from '../services/api';

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            owner: {
                first_name: "",
                last_name: "",
                affiliation: "",
                location: "",
                email: "",
                phone: "",
                website: ""
            },
            alternateContact: {},
            alternateLocation: "",
            status: "",
            summary: "",
            researchTopics: [],
            ageRanges: [],
            deliveryModes: [],
            timeline: "",
            commitmentLength: "",
            incentives: "",
            collaborators: [],
            additionalInformation: "",
            additionalFiles:[],
            invalidProject: false,
            canEdit: false,
            canDelete: false,
            errorDeleting: false
        };
    }

    handleDeleteProject = () => {
        const { history } = this.props;

        // TODO: need more elegant action to take after successful delete
        if (window.confirm("Are you sure you want to delete this project?")) {
            api.deleteProject(this.state.id)
                .then(res => history.push("/myprofile"))
                .catch(err => {
                    console.log(err);
                    this.setState({ errorDeleting: true });
                });
        }
    }

    componentDidMount() {
        const { match } = this.props;
        const id = match.params.id;

        // user is logged in
        if (localStorage.getItem("pryde_key")) {
            Promise.all([api.getProjectByID(id), api.getLoggedInUser()])
                .then(values => {
                    const project = values[0];
                    const loggedInUser = values[1];
                    if (project.owner.pk === loggedInUser.id) {
                        this.setState({ ...project, canEdit: true, canDelete: true });
                    } else {
                        this.setState({ ...project });
                    }
                })
                .catch(err => {
                    this.setState({ invalidProject: true });
                    console.log(err);
                })
        } else {
            api.getProjectByID(id)
                .then(project => this.setState({ ...project }))
                .catch(err => {
                    this.setState({ invalidProject: true });
                    console.log(err);
                });
        }
    }

    render() {
        const {
            name, owner, alternateContact, alternateLocation, status, summary, researchTopics, ageRanges,
            deliveryModes, timeline, commitmentLength, incentives,
            collaborators, additionalInformation, additionalFiles
        } = this.state;

        const contact = Object.entries(alternateContact).length !== 0 ? alternateContact : owner;
        const location = alternateLocation ? alternateLocation : owner.location;
        let statusFormatted = status.replace("-", " ").toUpperCase();

        return (
            <div className={styles.container}>
            {
                !this.state.invalidProject ?
                <>
                <main className={styles.projectWrapper}>
                    {
                        (this.state.canEdit || this.state.canDelete) &&
                        <div className={styles.buttonWrapper}>
                            {
                                this.state.errorDeleting &&
                                <p className={styles.errorMessage}>An error occurred while deleting this project.</p>
                            }
                            {
                                this.state.canEdit &&
                                    <Link
                                    to={{
                                        pathname: "/editproject",
                                        state: { projectData: this.state }
                                    }}
                                    >
                                        <button className={styles.editButton}>
                                            <img src={editButtonOrange} alt="Edit button" />
                                        </button>
                                    </Link>
                            }
                            {
                                this.state.canDelete &&
                                    <button className={styles.deleteButton} onClick={this.handleDeleteProject}>
                                        <img src={deleteButton} alt="Delete button" />
                                    </button>
                            }
                        </div>
                    }
                    <header className={styles.projectHeader}>
                        <div>
                            <h1>{name}</h1>
                            <h2>
                                {
                                    contact.affiliation ?
                                    `${contact.first_name} ${contact.last_name} - ${contact.affiliation}`
                                    :
                                    `${contact.first_name} ${contact.last_name}`
                                }
                            </h2>
                            <h2>{location}</h2>
                        </div>
                        <div className={styles.projectContact}>
                            <h3>{statusFormatted}</h3>
                            <ul>
                                <li>
                                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                </li>
                                {
                                    contact.phone !== "" &&
                                    <li>
                                        <a href={`tel:${contact.phone}`}>({contact.phone.slice(2, 5)})-{contact.phone.slice(5, 8)}-{contact.phone.slice(8, 12)}</a>
                                    </li>
                                }
                                {
                                    contact.website !== "" &&
                                    <li>
                                        <a href={contact.website} target="_blank" rel="noopener noreferrer">{contact.website.replace(/(^\w+:|^)\/\//, '')}</a>
                                    </li>
                                }
                            </ul>
                        </div>
                    </header>
                    <section className={styles.summary}>
                        <h2 className={styles.sectionHeader}>SUMMARY</h2>
                        <p>{summary}</p>
                    </section>
                    <div className={styles.projectInformationWrapper}>
                        <section className={styles.stats}>
                            <h2 className={styles.sectionHeader}>STATS</h2>
                            <div>
                                <h3>Research Topics</h3>
                                <ul>
                                    {
                                        researchTopics.map((interest, idx) => <li key={idx}>{interest}</li>)
                                    }
                                </ul>
                                <h3>Age Range</h3>
                                <ul>
                                    {
                                        ageRanges.map((interest, idx) => <li key={idx}>{interest}</li>)
                                    }
                                </ul>
                                <h3>Delivery Modes</h3>
                                <ul>
                                    {
                                        deliveryModes.map((interest, idx) => <li key={idx}>{interest}</li>)
                                    }
                                </ul>
                                <h3>Timeline</h3>
                                <p>{timeline}</p>
                                <h3>Participant Commitment Length</h3>
                                <p>{commitmentLength}</p>
                                <h3>Benefits + Incentives</h3>
                                <p>{incentives}</p>
                            </div>
                        </section>
                        <section className={styles.collaborators}>
                            <h2 className={styles.sectionHeader}>COLLABORATORS</h2>
                            <div className={styles.collaboratorsWrapper}>
                                {
                                    collaborators.map(collaborator => <SearchResult key={collaborator.pk} {...collaborator} />)
                                }
                            </div>
                        </section>
                    </div>
                    <section className={styles.additionalInformation}>
                        <h2 className={styles.sectionHeader}>ADDITIONAL INFORMATION</h2>
                        <div>
                            <p>{additionalInformation}</p>
                            {
                                additionalFiles.map((file, idx) =>
                                    <a key={idx} href={file.source}>
                                        {file.filename}
                                    </a>
                                )
                            }
                        </div>
                    </section>
                </main>
                </>
                :
                <section className={styles.projectNotFound}>
                    <div>
                        <h1>Oops!</h1>
                        <p>We can't seem to find the project page you're looking for.</p>
                    </div>
                </section>
            }
            </div>
        );
    }
}

export default Project;
