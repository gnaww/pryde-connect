import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isEqual from 'lodash.isequal';
import UserCard from '../components/UserCard';
import showButton from '../images/show-project-button.svg';
import hideButton from '../images/hide-project-button.svg';
import deleteButton from '../images/delete-button.svg';
import editButtonOrange from '../images/edit-button-orange.svg';
import mailIcon from '../images/mail-icon-black.svg';
import phoneIcon from '../images/phone-icon-black.svg';
import linkIcon from '../images/link-icon-black.svg';
import calendarIcon from '../images/calendar-icon-black.svg';
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
            alternateContact: {
                email: "",
                phone: "",
                website: "",
                last_name: "",
                first_name: ""
            },
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
            datePosted: "",
            invalidProject: false,
            editPermission: false,
            deletePermission: false,
            editCollaboratorsPermission: false,
            isCollaborator: false,
            showProjectOnProfile: null
        };
    }

    handleToggleProjectVisibility = () => {
        const id = this.props.match.params.id;

        api.toggleProjectVisibility(id)
            .then(response => {
                this.setState(prevState => ({
                    showProjectOnProfile: !prevState.showProjectOnProfile
                }), window.location.reload());
            })
            .catch(err => {
                console.log(err);
                console.log(err.response.data)
                alert("An error occurred while changing your preferences.");
            })
    }

    handleDeleteProject = () => {
        const { history } = this.props;

        if (window.confirm("Are you sure you want to delete this project?")) {
            api.deleteProject(this.state.id)
                .then(res => history.push("/deletesuccess", { deleteType: "project" }))
                .catch(err => {
                    console.log(err);
                    alert("An error occurred while deleting this project.");
                });
        }
    }

    componentDidMount() {
        const { match } = this.props;
        const id = match.params.id;
        document.title = "PRYDE Research Connect | View Project";

        // user is logged in
        if (localStorage.getItem("pryde_key")) {
            api.getProjectByID(id)
                .then(project => this.setState({ ...project }))
                .catch(err => {
                    this.setState({ invalidProject: true });
                    console.log(err);
                });
            api.getProjectPermissions(id)
                .then(permissions => this.setState({ ...permissions }))
                .catch(err => {
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

        const location = alternateLocation ? alternateLocation : owner.location;
        const date = new Date(this.state.datePosted);
        const datePosted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const emptyAlternateContact = {
            email: "",
            phone: "",
            website: "",
            last_name: "",
            first_name: ""
        };

        return (
            <div className={styles.container}>
            {
                !this.state.invalidProject ?
                <>
                <main className={styles.projectWrapper}>
                    {
                        (this.state.editPermission || this.state.deletePermission || this.state.isCollaborator) &&
                        <div className={styles.buttonWrapper}>
                            <div>
                                {
                                    (this.state.isCollaborator && this.state.showProjectOnProfile === true) &&
                                        <button className={styles.hideButton} onClick={this.handleToggleProjectVisibility}>
                                                <img src={hideButton} alt="Hide button" />
                                        </button>
                                }
                                {
                                    (this.state.isCollaborator && this.state.showProjectOnProfile === false) &&
                                        <button className={styles.showButton} onClick={this.handleToggleProjectVisibility}>
                                                <img src={showButton} alt="Show button" />
                                        </button>
                                }
                            </div>
                            {
                                this.state.editPermission &&
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
                                this.state.deletePermission &&
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
                                    `${owner.first_name} ${owner.last_name} - ${owner.affiliation}`
                                }
                            </h2>
                            <h2>{location}</h2>
                        </div>
                        <div className={styles.projectContact}>
                            <h3>{ status.toUpperCase() }</h3>
                            <ul>
                                <li>
                                    <a href={`mailto:${owner.email}`}>{owner.email}</a>
                                    <img className={styles.contactIcon} src={mailIcon} alt="Email icon" />
                                </li>
                                {
                                    owner.phone !== "" &&
                                    <li>
                                        <a href={`tel:${owner.phone}`}>({owner.phone.slice(2, 5)})-{owner.phone.slice(5, 8)}-{owner.phone.slice(8, 12)}</a>
                                        <img className={styles.contactIcon} src={phoneIcon} alt="Phone icon" />
                                    </li>
                                }
                                {
                                    owner.website !== "" &&
                                    <li>
                                        <a href={owner.website} target="_blank" rel="noopener noreferrer">{owner.website.replace(/(^\w+:|^)\/\//, '')}</a>
                                        <img className={styles.contactIcon} src={linkIcon} alt="Website icon" />
                                    </li>
                                }
                                <li>
                                    Date posted: { datePosted }
                                    <img className={styles.contactIcon} src={calendarIcon} alt="Calendar icon" />
                                </li>
                            </ul>
                        </div>
                    </header>
                    {
                        (!isEqual(alternateContact, emptyAlternateContact) && Object.entries(alternateContact).length !== 0) &&
                        <section className={styles.whoToContact}>
                            <h2 className={styles.sectionHeader}>WHO TO CONTACT</h2>
                            <p>
                                <span>
                                    { `${alternateContact.first_name} ${alternateContact.last_name}` }
                                </span>
                                <a href={`mailto:${alternateContact.email}`}><img src={mailIcon} alt="Email icon" />{alternateContact.email}</a>
                                {
                                    alternateContact.phone !== "" &&
                                    <a href={`tel:${alternateContact.phone}`}><img src={phoneIcon} alt="Phone icon" />({alternateContact.phone.slice(2, 5)})-{alternateContact.phone.slice(5, 8)}-{alternateContact.phone.slice(8, 12)}</a>
                                }
                                {
                                    alternateContact.website !== "" &&
                                    <a href={alternateContact.website} target="_blank" rel="noopener noreferrer"><img src={linkIcon} alt="Website icon" />{alternateContact.website.replace(/(^\w+:|^)\/\//, '')}</a>
                                }
                            </p>
                        </section>
                    }
                    <section className={styles.summary}>
                        <h2 className={styles.sectionHeader}>SUMMARY</h2>
                        <p>{ summary }</p>
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
                                    collaborators.map(collaborator => <UserCard key={collaborator.pk} {...collaborator} />)
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
