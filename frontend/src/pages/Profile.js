import React, { Component } from 'react';
import profilePicture from '../images/profile-picture.png';
import badge from '../images/badge.svg';
import editButton from '../images/edit-button.svg';
import editIcon from '../images/edit-icon.svg';
import CustomDropdown from '../components/CustomDropdown';
import SearchResult from '../components/SearchResult';
import styles from '../styles/Profile.module.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "John Smith",
                role: "4-H Practitioner",
                affiliation: "Organization/Department",
                location: "Ithaca, NY",
                email: "something@something.edu",
                phone: "1234567890",
                website: "https://something.com",
                researchInterests: ["Positive Youth Development", "Civic Engagement"],
                roles: ["Lead youth programs", "Train volunteers"],
                ageRanges: ["Adolescents"],
                youthProgramTypes: ["Civic Engagement", "STEM"],
                deliveryModes: ["Afterschool Programs"],
                researchNeeds: ["foo"],
                evaluationNeeds: ["bar"],
                projects: [
                    {
                        type: "project",
                        name: "Project Name",
                        owner: "John Smith",
                        status: 'complete',
                        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris. THERE SHOULD BE A CHARACTER LIMIT ON THIS"
                    },
                    {
                        type: "project",
                        name: "totally a real project",
                        owner: "Foo Bar",
                        status: 'in progress',
                        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris."
                    }
                ]
            }
        };
    }

    componentDidMount() {
    }

    render() {
        const { user } = this.state;

        return (
            <div className={styles.container}>
                <header className={styles.profileHeader}>
                    <div className={styles.profilePicture}>
                        <img src={profilePicture} alt="Profile pic" />
                        <button>
                            <img src={editIcon} alt="Edit button" />
                        </button>
                    </div>
                    <div className={styles.personalInformation}>
                        <h1>{user.name} <img src={badge} alt="CCE badge" /></h1>
                        <h2>{user.role}</h2>
                        <h2>{user.affiliation}</h2>
                        <h2>{user.location}</h2>
                    </div>
                    <div className={styles.contactInformation}>
                        <ul>
                            <li>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </li>
                            <li>
                                <a href={`tel:${user.phone}`}>({user.phone.slice(0, 3)})-{user.phone.slice(3, 6)}-{user.phone.slice(6, 10)}</a>
                            </li>
                            <li>
                                <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website.replace(/(^\w+:|^)\/\//, '')}</a>
                            </li>
                        </ul>
                    </div>
                    <button id={styles.editProfile}>
                        <img src={editButton} alt="Edit button" />
                    </button>
                </header>
                <main className={styles.profileContent}>
                    <section className={styles.profileSummary}>
                        <h1>Profile</h1>
                        <div>
                            <h2>Research Interests</h2>
                            <ul>
                                {
                                    user.researchInterests.map((interest, idx) => <li key={idx}>{interest}</li>)
                                }
                            </ul>
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
                            <h2>Types of Youth Programs</h2>
                            <ul>
                                {
                                    user.youthProgramTypes.map((youthProgram, idx) => <li key={idx}>{youthProgram}</li>)
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
                        </div>
                    </section>
                    <section className={styles.projects}>
                        <h1>View Projects</h1>
                        <div>
                            {
                                user.projects.map(project => <SearchResult {...project} />)
                            }
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

export default Profile;
