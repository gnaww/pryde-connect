import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profilePicture from '../images/profile-picture.png';
import CCEBadge from '../images/cce-badge.svg';
import CornellBadge from '../images/cornell-badge.svg';
import editButton from '../images/edit-button.svg';
import editButtonGreen from '../images/edit-button-green.svg';
import editIcon from '../images/edit-icon.svg';
import editIconGreen from '../images/edit-icon-green.svg';
import deleteButton from '../images/delete-button-borderless.svg';
import mailIcon from '../images/mail-icon-white.svg';
import phoneIcon from '../images/phone-icon.svg';
import linkIcon from '../images/link-icon.svg';
import calendarIcon from '../images/calendar-icon-white.svg';
import CustomDropdown from '../components/CustomDropdown';
import ProfilePictureModal from '../components/ProfilePictureModal';
import { sortProjectsOptions, SortableList } from '../components/SortableList';
import styles from '../styles/Profile.module.css';
import api from '../services/api';
import { saveStateWithPath, saveState } from '../services/localStorage';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: "",
                first_name: "",
                last_name: "",
                role: "",
                displayRole: "",
                locatedAtCornell: false,
                locatedAtCCE: false,
                affiliation: "",
                location: "",
                email: "",
                phone: "",
                website: "",
                researchInterests: [],
                researchDescription: "",
                roles: [],
                ageRanges: [],
                deliveryModes: [],
                researchNeeds: [],
                evaluationNeeds: [],
                projects: [],
                date_joined: "",
                profile_picture: ""
            },
            statusFilter: "",
            sortBy: "",
            showModal: false,
            invalidProfile: false,
            canEditDelete: false
        };
    }

    handleDropdownChange = dropdown => event => {
        this.setState({ [dropdown]: event.target.value });
    }

    showModal = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }

    handleDeleteProfile = () => {
        const { history } = this.props;

        if (window.confirm("Are you sure you want to delete your account?")) {
            api.deleteUser(this.state.user.id)
                .then(_ => {
                    history.push("/success", { deleteType: "profile" });
                })
                .catch(err => {
                    console.log(err);
                    alert("An error occurred while deleting your account.");
                });
        }
    }

    componentDidMount() {
        const { match } = this.props;

        if (match.url === "/myprofile") {
            document.title = "PRYDE Connect | My Profile";
            api.getLoggedInUser()
                .then(user => this.setState({ user: user, canEditDelete: true }))
                .catch(err => {
                    this.setState({ invalidProfile: true });
                    console.log(err);
                });
        } else {
            document.title = "PRYDE Connect | View Profile";
            const id = match.params.id;
            api.getUserByID(id)
                .then(userPage => this.setState({ user: userPage }))
                .catch(err => {
                    this.setState({ invalidProfile: true });
                    console.log(err);
                });
        }
    }

    render() {
        const { user } = this.state;
        const { match } = this.props;
        const statusDropdown = {
            label: "STATUS",
            name: "status",
            options: [
                {
                    value: "",
                    text: "All"
                },
                {
                    value: "Not Started",
                    text: "Not Started"
                },
                {
                    value: "In Progress",
                    text: "In Progress"
                },
                {
                    value: "Completed",
                    text: "Completed"
                }
            ],
            handleChange: this.handleDropdownChange("statusFilter"),
            defaultValue: this.state.statusFilter
        };
        const sortDropdown = {
            label: "SORT BY",
            name: "sort",
            options: sortProjectsOptions,
            handleChange: this.handleDropdownChange("sortBy"),
            defaultValue: this.state.sortBy
        };
        let projectsDisplay;
        if (user.projects.length === 0) {
            projectsDisplay = <h2>No projects yet.</h2>
        } else {
            if (this.state.statusFilter === "") {
                projectsDisplay = <SortableList sortBy={this.state.sortBy} list={user.projects} />
            } else {
                if (user.projects.filter(project => project.status === this.state.statusFilter).length === 0) {
                    projectsDisplay = <h2>No projects matching filter.</h2>
                } else {
                    projectsDisplay = <SortableList sortBy={this.state.sortBy} list={user.projects.filter(project => project.status === this.state.statusFilter)} />
                }
            }
        }
        const date = new Date(this.state.user.date_joined);
        const date_joined = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const profilePic = this.state.user.profile_picture ? this.state.user.profile_picture : profilePicture

        return (
            <div className={styles.container}>
                {
                    !this.state.invalidProfile ?
                        <>
                            <header className={user.role === "Practitioner" ? styles.profileHeaderPractitioner : styles.profileHeaderResearcher}>
                                <div className={styles.profilePicture}>
                                    <img src={profilePic} alt="Profile pic" />
                                    <button className={styles.profilePictureEdit} onClick={this.showModal}>
                                        {
                                            user.role === "Practitioner" ?
                                                <img src={editIcon} alt="Edit button" />
                                                :
                                                <img src={editIconGreen} alt="Edit button" />
                                        }
                                    </button>
                                    <ProfilePictureModal visible={this.state.showModal} handleClose={this.hideModal} />
                                </div>
                                <div className={styles.personalInformation}>
                                    <h1>
                                        {`${user.first_name} ${user.last_name}`}
                                        {user.locatedAtCCE && <img className={styles.CCEBadge} src={CCEBadge} alt="CCE badge" />}
                                        {user.locatedAtCornell && <img className={styles.CornellBadge} src={CornellBadge} alt="Cornell badge" />}
                                    </h1>
                                    <h2>{user.displayRole}</h2>
                                    <h2>{user.affiliation}</h2>
                                    <h2>{user.location}</h2>
                                </div>
                                <div className={styles.contactInformation}>
                                    <div className={styles.buttonWrapper}>
                                        {
                                            this.state.canEditDelete &&
                                            <>
                                                <Link
                                                    to={saveStateWithPath("/editprofile", { userData: this.state.user })}
                                                >
                                                    <button className={styles.editButton}>
                                                        {
                                                            user.role === "Practitioner" ?
                                                                <img src={editButton} alt="Edit button" />
                                                                :
                                                                <img src={editButtonGreen} alt="Edit button" />
                                                        }
                                                    </button>
                                                </Link>
                                                <button className={styles.deleteButton} onClick={this.handleDeleteProfile}>
                                                    <img src={deleteButton} alt="Edit button" />
                                                </button>
                                            </>
                                        }
                                    </div>
                                    <ul>
                                        <li>
                                            <img className={styles.contactIcon} src={mailIcon} alt="Email icon" />
                                            <a href={`mailto:${user.email}`}>{user.email}</a>
                                        </li>
                                        {
                                            user.phone !== "" &&
                                            <li>
                                                <img className={styles.contactIcon} src={phoneIcon} alt="Phone icon" />
                                                <a href={`tel:${user.phone}`}>({user.phone.slice(2, 5)})-{user.phone.slice(5, 8)}-{user.phone.slice(8, 12)}</a>
                                            </li>
                                        }
                                        {
                                            user.website !== "" &&
                                            <li>
                                                <img className={styles.contactIcon} src={linkIcon} alt="Link icon" />
                                                <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website.replace(/(^\w+:|^)\/\//, '')}</a>
                                            </li>
                                        }
                                        <li>
                                            <img className={styles.contactIcon} src={calendarIcon} alt="Calendar icon" />
                                            {date_joined}
                                        </li>
                                    </ul>
                                </div>
                            </header>
                            <main className={styles.profileContent}>
                                <section className={styles.profileSummary}>
                                    <h1>PROFILE</h1>
                                    <div>
                                        <h2>Research Interests</h2>
                                        <ul>
                                            {
                                                user.researchInterests.map((interest, idx) => <li key={idx}>{interest}</li>)
                                            }
                                        </ul>
                                        {
                                            user.role === "Practitioner" ?
                                                <>
                                                    <h2>Roles</h2>
                                                    <ul>
                                                        {
                                                            user.roles.map((role, idx) => <li key={idx}>{role}</li>)
                                                        }
                                                    </ul>
                                                    <h2>Age Ranges</h2>
                                                    <ul>
                                                        {
                                                            user.ageRanges.map((ageRange, idx) => <li key={idx}>{ageRange}</li>)
                                                        }
                                                    </ul>
                                                    <h2>Delivery Modes</h2>
                                                    <ul>
                                                        {
                                                            user.deliveryModes.map((mode, idx) => <li key={idx}>{mode}</li>)
                                                        }
                                                    </ul>
                                                    <hr />
                                                    <h2>Research Needs</h2>
                                                    <p>{user.researchNeeds ? user.researchNeeds : "N/A"}</p>
                                                    <h2>Evaluation Needs</h2>
                                                    <p>{user.evaluationNeeds ? user.evaluationNeeds : "N/A"}</p>
                                                </>
                                                :
                                                <>
                                                    <h2>Age Ranges</h2>
                                                    <ul>
                                                        {
                                                            user.ageRanges.map((ageRange, idx) => <li key={idx}>{ageRange}</li>)
                                                        }
                                                    </ul>
                                                    <hr />
                                                    <h2>Research Description</h2>
                                                    <p>{user.researchDescription ? user.researchDescription : "N/A"}</p>
                                                </>
                                        }

                                    </div>
                                </section>
                                <section className={styles.projects}>
                                    <div className={styles.projectsHeader}>
                                        <h1>VIEW PROJECTS</h1>
                                        <div>
                                            <CustomDropdown {...statusDropdown} />
                                            <CustomDropdown {...sortDropdown} />
                                        </div>
                                    </div>
                                    <div>
                                        {projectsDisplay}
                                    </div>
                                </section>
                            </main>
                        </>
                        :
                        <section className={styles.profileNotFound}>
                            <div>
                                <h1>Oops!</h1>
                                {
                                    match.url === "/myprofile" ?
                                        <p>An error occurred while accessing your profile page. Please log out and log back in again.</p>
                                        :
                                        <p>We can't seem to find the profile page you're looking for.</p>
                                }
                            </div>
                        </section>
                }
            </div>
        );
    }
}

export default Profile;
