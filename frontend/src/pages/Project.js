import React, { Component } from 'react';
import SearchResult from '../components/SearchResult';
import editButtonOrange from '../images/edit-button-orange.svg';
import styles from '../styles/Project.module.css';

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {
                id: 1,
                name: "Project Name",
                owner: {
                    name: "John Smith",
                    affiliation: "Org Name",
                    location: "Ithaca, NY",
                    email: "something@something.edu",
                    phone: "1234567890",
                    website: "https://something.com"
                },
                status: "completed",
                summary: "[this is where the goal question comes in] details or summary of project or research partner] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris.",
                stats: {
                    researchTopics: ["Positive Youth Development", "Civic Engagement"],
                    ageRange: ["15-17 years old"],
                    deliveryModes: ["Afterschool Programs"],
                    timeline: "Next summer",
                    commitmentLength: "1 year",
                    incentives: ["Educators", "Participants"]
                },
                collaborators: [
                    {
                        id: 1,
                        type: "partner",
                        name: "Mary Jane",
                        role: "Practitioner",
                        affiliation: "Cornell"
                    },
                    {
                        id: 2,
                        type: "partner",
                        name: "Bill Nye",
                        role: "Researcher",
                        affiliation: "Cornell"
                    }
                ],
                additionalInformation: {
                    text: "[additional information] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris.",
                    filename: "results.pdf"
                }
            }
        };
    }

    componentDidMount() {
    }

    render() {
        const { project } = this.state;

        return (
            <div className={styles.container}>
                <main>
                    <button className={styles.editButton}>
                        <img src={editButtonOrange} alt="Edit button" />
                    </button>
                    <header>
                        <div>
                            <h1>{project.name}</h1>
                            <h2>{`${project.owner.name} - ${project.owner.affiliation}`}</h2>
                            <h2>{project.location}</h2>
                        </div>
                        <div>
                            <h3>{project.status}</h3>
                            <ul>
                                <li>
                                    <a href={`mailto:${project.owner.email}`}>{project.owner.email}</a>
                                </li>
                                <li>
                                    <a href={`tel:${project.owner.phone}`}>({project.owner.phone.slice(0, 3)})-{project.owner.phone.slice(3, 6)}-{project.owner.phone.slice(6, 10)}</a>
                                </li>
                                <li>
                                    <a href={project.owner.website} target="_blank" rel="noopener noreferrer">{project.owner.website.replace(/(^\w+:|^)\/\//, '')}</a>
                                </li>
                            </ul>
                        </div>
                    </header>
                    <section>
                        <h2>SUMMARY</h2>
                        <p>{project.summary}</p>
                    </section>
                    <div>
                        <section>
                            <h2>STATS</h2>
                            <div>
                                <h3>Research Topics</h3>
                                <ul>
                                    {
                                        project.stats.researchTopics.map((interest, idx) => <li key={idx}>{interest}</li>)
                                    }
                                </ul>
                                <h3>Age Range</h3>
                                <ul>
                                    {
                                        project.stats.ageRange.map((interest, idx) => <li key={idx}>{interest}</li>)
                                    }
                                </ul>
                                <h3>Delivery Modes</h3>
                                <ul>
                                    {
                                        project.stats.deliveryModes.map((interest, idx) => <li key={idx}>{interest}</li>)
                                    }
                                </ul>
                                <h3>Timeline</h3>
                                <p>{project.stats.timeline}</p>
                                <h3>Length of Participant Commitment</h3>
                                <p>{project.stats.commitmentLength}</p>
                                <h3>Benefits + Incentives</h3>
                                <ul>
                                    {
                                        project.stats.incentives.map((interest, idx) => <li key={idx}>{interest}</li>)
                                    }
                                </ul>
                            </div>
                        </section>
                        <section>
                            <h2>COLLABORATORS</h2>
                            <div>
                                {
                                    project.collaborators.map(collaborator => <SearchResult {...collaborator} />)
                                }
                            </div>
                        </section>
                    </div>
                    <section>
                        <h2>ADDITIONAL INFORMATION</h2>
                        <div>
                            <p>{project.additionalInformation.text}</p>
                            <button>
                                {project.additionalInformation.filename}
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

export default Project;
