import React, { Component } from 'react';
import profilePicture from '../images/profile-picture.png';
import badge from '../images/badge.svg';
import badgeGreen from '../images/badge-green.svg';
import editButton from '../images/edit-button.svg';
import editButtonGreen from '../images/edit-button-green.svg';
import editIcon from '../images/edit-icon.svg';
import editIconGreen from '../images/edit-icon-green.svg';
import CustomDropdown from '../components/CustomDropdown';
import SearchResult from '../components/SearchResult';
import ProfilePictureModal from '../components/ProfilePictureModal';
import styles from '../styles/Profile.module.css';
import api from '../services/api/api';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                first_name: "",
                last_name: "",
                role: "",
                displayRole: "",
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
                projects: []
            },
            statusFilter: "all",
            sortBy: "name-asc",
            showModal: false
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

    componentDidMount() {
        const { match } = this.props;

        if (match.url === "/myprofile") {
            api.getLoggedInUser()
                .then(user => this.setState({ user: user }))
                .catch(err => console.log(err));
        } else {
            const id = match.params.id;
            api.getUserByID(id)
                .then(user => this.setState({ user: user }))
                .catch(err => console.log(err));
        }
    }

    render() {
        const { user } = this.state;
        const statusDropdown = {
            label: "STATUS",
            name: "status",
            options: [
                {
                    value: "all",
                    text: "All"
                },
                {
                    value: "not-started",
                    text: "Not Started"
                },
                {
                    value: "in-progress",
                    text: "In Progress"
                },
                {
                    value: "completed",
                    text: "Completed"
                }
            ],
            handleChange: this.handleDropdownChange("statusFilter")
        };
        const sortDropdown = {
            label: "SORT BY",
            name: "sort",
            options: [
                {
                    value: "name-asc",
                    text: "Name ↑"
                },
                {
                    value: "name-desc",
                    text: "Name ↓"
                }
            ],
            handleChange: this.handleDropdownChange("sortBy")
        };

        return (
            <div className={styles.container}>
                <header className={user.role === "Practitioner" ? `${styles.profileHeader} ${styles.practitioner}` : `${styles.profileHeader} ${styles.researcher}`}>
                    <div className={styles.profilePicture}>
                        <img src={profilePicture} alt="Profile pic" />
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
                        <h1>{`${user.first_name} ${user.last_name}`} { user.role === "Practitioner" ? <img src={badge} alt="CCE badge" /> : <img src={badgeGreen} alt="Cornell badge" /> }</h1>
                        <h2>{user.displayRole}</h2>
                        <h2>{user.affiliation}</h2>
                        <h2>{user.location}</h2>
                    </div>
                    <div className={styles.contactInformation}>
                        <ul>
                            <li>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </li>
                            <li>
                                <a href={`tel:${user.phone}`}>({user.phone.slice(2, 5)})-{user.phone.slice(5, 8)}-{user.phone.slice(8, 12)}</a>
                            </li>
                            <li>
                                <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website.replace(/(^\w+:|^)\/\//, '')}</a>
                            </li>
                        </ul>
                    </div>
                    <button id={styles.editProfile}>
                        {
                            user.role === "Practitioner" ?
                                <img src={editButton} alt="Edit button" />
                            :
                                <img src={editButtonGreen} alt="Edit button" />
                        }
                    </button>
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
                                        <h2>Age Range</h2>
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
                                        <ul>
                                            {
                                                user.researchNeeds.map((need, idx) => <li key={idx}>{need}</li>)
                                            }
                                        </ul>
                                        <h2>Evaluation Needs</h2>
                                        <ul>
                                            {
                                                user.evaluationNeeds.map((need, idx) => <li key={idx}>{need}</li>)
                                            }
                                        </ul>
                                    </>
                                :
                                    <>
                                        <hr />
                                        <h2>Research Description</h2>
                                        <p>{user.researchDescription}</p>
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
                            {
                                this.state.statusFilter === "all" ?
                                    user.projects.map((project, idx) => <SearchResult key={idx} {...project} />)
                                :
                                    user.projects.filter(project=> project.status === this.state.statusFilter).map((project, idx) => <SearchResult key={idx} {...project} />)
                            }
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

export default Profile;
