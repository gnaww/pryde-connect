import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserCard from '../components/UserCard';
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
            datePosted: "",
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

        const location = alternateLocation ? alternateLocation : owner.location;
        let statusFormatted = status.replace("-", " ").toUpperCase();
        const date = new Date(this.state.datePosted);
        const datePosted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

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
                                    `${owner.first_name} ${owner.last_name} - ${owner.affiliation}`
                                }
                            </h2>
                            <h2>{location}</h2>
                        </div>
                        <div className={styles.projectContact}>
                            <h3>{statusFormatted}</h3>
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
                        Object.entries(alternateContact).length !== 0 &&
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
