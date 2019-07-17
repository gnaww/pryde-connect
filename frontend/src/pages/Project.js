import React, { Component } from 'react';
import SearchResult from '../components/SearchResult';
import editButtonOrange from '../images/edit-button-orange.svg';
import styles from '../styles/Project.module.css';
import api from '../services/api/api';

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // id: 1,
            // name: "Project Name",
            // owner: {
            //     first_name: "John",
            //     last_name: "Smith",
            //     affiliation: "Org Name",
            //     location: "Ithaca, NY",
            //     email: "something@something.edu",
            //     phone: "1234567890",
            //     website: "https://something.com"
            // },
            // status: "completed",
            // summary: "[this is where the goal question comes in] details or summary of project or research partner] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris.",
            // researchTopics: ["Positive Youth Development", "Civic Engagement"],
            // ageRanges: ["15-17 years old"],
            // deliveryModes: ["Afterschool Programs"],
            // timeline: "Next summer",
            // commitmentLength: "1 year",
            // incentives: ["Educators", "Participants"],
            // collaborators: [
            //     {
            //         id: 1,
            //         type: "partner",
            //         first_name: "Mary",
            //         last_name: "Jane",
            //         role: "Practitioner",
            //         affiliation: "Cornell"
            //     },
            //     {
            //         id: 2,
            //         type: "partner",
            //         first_name: "Bill",
            //         last_name: "Nye",
            //         role: "Researcher",
            //         affiliation: "Cornell"
            //     }
            // ],
            // additionalInformation: "[additional information] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget neque in mauris tristique condimentum a quis mauris.",
            // additionalFiles: [
            //     {
            //         filename: "results.pdf",
            //         source: "somelinkhere"
            //     },
            //     {
            //         filename: "stats.pdf",
            //         source: "somelinkhere"
            //     }
            // ]
        };
    }

    componentDidMount() {
        const { match } = this.props;
        console.log(this.props.match);
        const id = match.params.id;
        api.getProjectByID(id)
            .then(project => this.setState({ ...project }))
            .catch(err => console.log(err));
    }

    render() {
        const {
            name, owner, status, summary, researchTopics, ageRanges,
            deliveryModes, timeline, commitmentLength, incentives,
            collaborators, additionalInformation, additionalFiles
        } = this.state;

        let statusFormatted = '';
        if (status === "completed") {
            statusFormatted = "COMPLETE"
        } else if (status === "not-started") {
            statusFormatted = "NOT STARTED";
        } else if (status === "in-progress") {
            statusFormatted = "IN PROGRESS"
        }

        return (
            <div className={styles.container}>
                <main className={styles.projectWrapper}>
                    <div className={styles.editButtonWrapper}>
                        <button className={styles.editButton}>
                            <img src={editButtonOrange} alt="Edit button" />
                        </button>
                    </div>
                    <header className={styles.projectHeader}>
                        <div>
                            <h1>{name}</h1>
                            <h2>{`${owner.first_name} ${owner.last_name} - ${owner.affiliation}`}</h2>
                            <h2>{owner.location}</h2>
                        </div>
                        <div className={styles.projectContact}>
                            <h3>{statusFormatted}</h3>
                            <ul>
                                <li>
                                    <a href={`mailto:${owner.email}`}>{owner.email}</a>
                                </li>
                                <li>
                                    <a href={`tel:${owner.phone}`}>({owner.phone.slice(0, 3)})-{owner.phone.slice(3, 6)}-{owner.phone.slice(6, 10)}</a>
                                </li>
                                <li>
                                    <a href={owner.website} target="_blank" rel="noopener noreferrer">{owner.website.replace(/(^\w+:|^)\/\//, '')}</a>
                                </li>
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
                                <ul>
                                    {
                                        incentives.map((interest, idx) => <li key={idx}>{interest}</li>)
                                    }
                                </ul>
                            </div>
                        </section>
                        <section className={styles.collaborators}>
                            <h2 className={styles.sectionHeader}>COLLABORATORS</h2>
                            <div className={styles.collaboratorsWrapper}>
                                {
                                    collaborators.map(collaborator => <SearchResult {...collaborator} />)
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
            </div>
        );
    }
}

export default Project;
