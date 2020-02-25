import React, { Component } from 'react';
import styles from '../styles/Login.module.css';
import api from '../services/api';
import { AnswerTypes, getCheckboxQuestion, getCheckedValuesArray, getResearchTopicsQuestion } from '../components/QAComponents';
import { convertArray, convertResearchTopics, formatPreferencesArray } from '../services/util';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Animal from '../images/research_icons/animal.png';
import Agriculture from '../images/research_icons/agriculture.png';
import Career from '../images/research_icons/career.png';
import Civic from '../images/research_icons/civic.png';
import Diversity from '../images/research_icons/diversity.png';
import Education from '../images/research_icons/education.png';
import Energy from '../images/research_icons/energy.png';
import Environment from '../images/research_icons/environment.png';
import Family from '../images/research_icons/family.png';
import Gardening from '../images/research_icons/gardening.png';
import Health from '../images/research_icons/health.png';
import IntergenerationalEngagement from '../images/research_icons/intergenerational_engagement.png';
import LifeSkills from '../images/research_icons/life_skills.png';
import Media from '../images/research_icons/media.png';
import Motivation from '../images/research_icons/motivation.png';
import Nutrition from '../images/research_icons/nutrition.png';
import OutdoorEducation from '../images/research_icons/outdoor_education.png';
import Parenting from '../images/research_icons/parenting.png';
import Peer from '../images/research_icons/peer.png';
import Policy from '../images/research_icons/policy.png';
import Positive from '../images/research_icons/positive.png';
import Program from '../images/research_icons/program.png';
import Risk from '../images/research_icons/risk.png';
import Self from '../images/research_icons/self.png';
import Stem from '../images/research_icons/stem.png';
import VolunteerEngagement from '../images/research_icons/volunteer_engagement.png';
import Youth from '../images/research_icons/youth.png';
import Other from '../images/research_icons/other.png';

const PreferencesInformation = {
    AgeGroups: [
        "Infants (0-1 year)",
        "Toddlers (1-2 years)",
        "Toddlers (2-3 years)",
        "Preschoolers (3-5 years)",
        "Early childhood (6-8 years)",
        "Middle childhood (9-11 years)",
        "Young teens (12-14 years)",
        "Teenagers (15-17 years)",
        "Young adults (18-24 years)",
        "Adults (25-64 years)",
        "Seniors (65+ years)"
    ],
    ProgramDeliveryModes: [
        "Afterschool programs",
        "Camps",
        "Clubs",
        "In-school Programming",
        "Summer Youth Employment Opportunities",
        "Special Interest/Short Term",
        "Fair/Events",
        "Other"
    ],
    ResearchTopics: [
        {
            image: Animal,
            label: "Animal Science"
        },
        {
            image: Agriculture,
            label: "Agriculture"
        },
        {
            image: Career,
            label: "Career Readiness"
        },
        {
            image: Civic,
            label: "Civic Engagement"
        },
        {
            image: Diversity,
            label: "Diversity Equity & Inclusion"
        },
        {
            image: Education,
            label: "Education & Learning"
        },
        {
            image: Energy,
            label: "Energy"
        },
        {
            image: Environment,
            label: "Environment & Sustainability"
        },
        {
            image: Family,
            label: "Families"
        },
        {
            image: Gardening,
            label: "Gardening & Horticulture"
        },
        {
            image: Health,
            label: "Health & Wellness"
        },
        {
            image: IntergenerationalEngagement,
            label: "Intergenerational Engagement"
        },
        {
            image: LifeSkills,
            label: "Life Skills"
        },
        {
            image: Media,
            label: "Media & Technology"
        },
        {
            image: Motivation,
            label: "Motivation"
        },
        {
            image: Nutrition,
            label: "Nutrition"
        },
        {
            image: OutdoorEducation,
            label: "Outdoor Education"
        },
        {
            image: Parenting,
            label: "Parenting"
        },
        {
            image: Peer,
            label: "Peer Relationships"
        },
        {
            image: Positive,
            label: "Positive Youth Development"
        },
        {
            image: Policy,
            label: "Policy Analysis"
        },
        {
            image: Program,
            label: "Program Evaluation"
        },
        {
            image: Risk,
            label: "Risk Behavior"
        },
        {
            image: Self,
            label: "Self & Identity"
        },
        {
            image: Stem,
            label: "Science Technology Engineering & Math (STEM)"
        },
        {
            image: VolunteerEngagement,
            label: "Volunteer Engagement"
        },
        {
            image: Youth,
            label: "Youth/Adult Relationships"
        },
        {
            image: Other,
            label: "Other"
        }
    ]
};

const userPreferenceQuestions = [
    {
        questionText: "Select user age ranges",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PreferencesInformation.AgeGroups,
            key: "userAgeRanges"
        }
    },
    {
        questionText:
            "Select user delivery modes",
        answer: {
            type: AnswerTypes.Checkbox,
            options:
                PreferencesInformation.ProgramDeliveryModes,
            key: "userDeliveryModes"
        }
    },
    {
        questionText:
            "Select user research interests",
        answer: {
            type: AnswerTypes.ResearchTopics,
            options: PreferencesInformation.ResearchTopics,
            key: "userResearchInterests"
        }
    }
];

const projectPreferenceQuestions = [
    {
        questionText: "Select project age ranges",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PreferencesInformation.AgeGroups,
            key: "projectAgeRanges"
        }
    },
    {
        questionText:
            "Select project delivery modes",
        answer: {
            type: AnswerTypes.Checkbox,
            options:
                PreferencesInformation.ProgramDeliveryModes,
            key: "projectDeliveryModes"
        }
    },
    {
        questionText:
            "Select project research topics",
        answer: {
            type: AnswerTypes.ResearchTopics,
            options: PreferencesInformation.ResearchTopics,
            key: "projectResearchTopics"
        }
    }
];

class EmailPreferences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAgeRanges: getCheckedValuesArray(PreferencesInformation.AgeGroups),
            userDeliveryModes: getCheckedValuesArray(PreferencesInformation.ProgramDeliveryModes),
            userResearchInterests: getCheckedValuesArray(PreferencesInformation.ResearchTopics),
            projectAgeRanges: getCheckedValuesArray(PreferencesInformation.AgeGroups),
            projectDeliveryModes: getCheckedValuesArray(PreferencesInformation.ProgramDeliveryModes),
            projectResearchTopics: getCheckedValuesArray(PreferencesInformation.ResearchTopics),
            tabValue: 0,
            successMessage: '',
            errorMessage: ''
        };
    }

    setValues = (key, index, text) => {
        let copy = Array.from(this.state[key]);

        if (text !== null) {
            copy[index].other = text;
        }
        else {
            copy[index].checked = !copy[index].checked;
            copy[index].other = "";
        }

        this.setState({
            [key]: copy
        });
    }

    getQAComponent = (qa, index) => {
        return (
            <div className={styles.question} key={index}>
                { getCheckboxQuestion(qa, this.setValues, this.state, false) }
                { getResearchTopicsQuestion(qa, this.setValues, this.state, false) }
            </div>
        );
    }

    changeTab = (event, newValue) => {
        this.setState({ tabValue: newValue });
    }

    savePreferences = () => {
        this.setState({ successMessage: "", errorMessage: "" });

        const { userAgeRanges, userDeliveryModes, userResearchInterests, projectAgeRanges, projectDeliveryModes, projectResearchTopics } = this.state;

        let preferences = [].concat(
            formatPreferencesArray(userAgeRanges, projectAgeRanges, "ageRange", "ageRange"),
            formatPreferencesArray(userDeliveryModes, projectDeliveryModes, "deliveryMode", "deliveryMode"),
            formatPreferencesArray(userResearchInterests, projectResearchTopics, "researchInterest", "researchTopic")
        );

        if (preferences.length !== 0) {
            api.updateEmailPreferences(preferences)
                .then(response => {
                    this.setState({ successMessage: "Email preferences successfully saved." });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ errorMessage: Object.values(error.response.data)[0] });
                });
        } else {
            this.setState({ errorMessage: "At least one preference must be selected." });
        }
    }

    unsubscribe = () => {
        this.setState({ successMessage: "", errorMessage: "" });
        api.unsubscribe()
            .then(response => {
                if (response) {
                    this.setState({
                        successMessage: "Successfully unsubscribed from all emails.",
                        userAgeRanges: getCheckedValuesArray(PreferencesInformation.AgeGroups),
                        userDeliveryModes: getCheckedValuesArray(PreferencesInformation.ProgramDeliveryModes),
                        userResearchInterests: getCheckedValuesArray(PreferencesInformation.ResearchTopics),
                        projectAgeRanges: getCheckedValuesArray(PreferencesInformation.AgeGroups),
                        projectDeliveryModes: getCheckedValuesArray(PreferencesInformation.ProgramDeliveryModes),
                        projectResearchTopics: getCheckedValuesArray(PreferencesInformation.ResearchTopics)
                    });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ errorMessage: Object.values(error.response.data)[0] });
            });
    }

    initializePreferences = preferences => {
        let initialUserAgeRanges = [];
        let initialUserDeliveryModes = [];
        let initialUserResearchInterests = [];
        let initialProjectAgeRanges = [];
        let initialProjectDeliveryModes = [];
        let initialProjectResearchTopics = [];

        preferences.forEach(preference => {
            // project preference
            if (preference.type === "1") {
                if (preference.preferenceName === "ageRange") {
                    initialProjectAgeRanges.push(preference.preferenceValue);
                } else if (preference.preferenceName === "deliveryMode") {
                    initialProjectDeliveryModes.push(preference.preferenceValue);
                } else if (preference.preferenceName === "researchTopic") {
                    initialProjectResearchTopics.push(preference.preferenceValue);
                }
            } else { // user preference
                if (preference.preferenceName === "ageRange") {
                    initialUserAgeRanges.push(preference.preferenceValue);
                } else if (preference.preferenceName === "deliveryMode") {
                    initialUserDeliveryModes.push(preference.preferenceValue);
                } else if (preference.preferenceName === "researchInterest") {
                    initialUserResearchInterests.push(preference.preferenceValue);
                }
            }
        });

        initialUserAgeRanges = convertArray(initialUserAgeRanges, PreferencesInformation.AgeGroups);
        initialUserDeliveryModes = convertArray(initialUserDeliveryModes, PreferencesInformation.ProgramDeliveryModes);
        initialUserResearchInterests = convertResearchTopics(initialUserResearchInterests, PreferencesInformation.ResearchTopics);
        initialProjectAgeRanges = convertArray(initialProjectAgeRanges, PreferencesInformation.AgeGroups);
        initialProjectDeliveryModes = convertArray(initialProjectDeliveryModes, PreferencesInformation.ProgramDeliveryModes);
        initialProjectResearchTopics = convertResearchTopics(initialProjectResearchTopics, PreferencesInformation.ResearchTopics);

        this.setState({
            userAgeRanges: initialUserAgeRanges,
            userDeliveryModes: initialUserDeliveryModes,
            userResearchInterests: initialUserResearchInterests,
            projectAgeRanges: initialProjectAgeRanges,
            projectDeliveryModes: initialProjectDeliveryModes,
            projectResearchTopics: initialProjectResearchTopics
        });
    }

    selectAllUserPreferences = () => {
        const checker = elt => {
            elt.checked = true;
            return elt;
        };

        let ageRanges = this.state.userAgeRanges.map(checker);
        let deliveryModes = this.state.userDeliveryModes.map(checker);
        let researchInterests = this.state.userResearchInterests.map(checker);

        this.setState({
            userAgeRanges: ageRanges,
            userDeliveryModes: deliveryModes,
            userResearchInterests: researchInterests,
        });
    }

    clearUserPreferences = () => {
        this.setState({
            userAgeRanges: getCheckedValuesArray(PreferencesInformation.AgeGroups),
            userDeliveryModes: getCheckedValuesArray(PreferencesInformation.ProgramDeliveryModes),
            userResearchInterests: getCheckedValuesArray(PreferencesInformation.ResearchTopics),
        });
    }

    selectAllProjectPreferences = () => {
        const checker = elt => {
            elt.checked = true;
            return elt;
        };

        let ageRanges = this.state.projectAgeRanges.map(checker);
        let deliveryModes = this.state.projectDeliveryModes.map(checker);
        let researchTopics = this.state.projectResearchTopics.map(checker);

        this.setState({
            projectAgeRanges: ageRanges,
            projectDeliveryModes: deliveryModes,
            projectResearchTopics: researchTopics,
        });
    }

    clearProjectPreferences = () => {
        this.setState({
            projectAgeRanges: getCheckedValuesArray(PreferencesInformation.AgeGroups),
            projectDeliveryModes: getCheckedValuesArray(PreferencesInformation.ProgramDeliveryModes),
            projectResearchTopics: getCheckedValuesArray(PreferencesInformation.ResearchTopics)
        });
    }

    componentDidMount() {
        document.title = "PRYDE Connect | Email Preferences";
        api.getEmailPreferences()
            .then(preferences => {
                if (preferences.length !== 0) {
                    this.initializePreferences(preferences);
                }
            });
    }

    render() {
        return (
            <div className={styles.emailPreferenceWrapper}>
                <h1 className={styles.title}>
                    Update email preferences
                </h1>
                <h2 className={styles.description}>
                    Selecting a preference means you will be opting into monthly emails notifying you of new users and/or projects that match your selected preferences. You may unsubscribe at any time.
                </h2>
                {
                    this.state.successMessage &&
                    <p className={styles.successMessage}>{this.state.successMessage}</p>
                }
                {
                    this.state.errorMessage &&
                    <p className={styles.errorMessage}>{this.state.errorMessage}</p>
                }
                <div className={styles.buttonWrapper}>
                    <button className={styles.update} onClick={this.savePreferences}>
                        UPDATE PREFERENCES
                    </button>
                    <button className={styles.unsubscribe} onClick={this.unsubscribe}>
                        UNSUBSCRIBE FROM ALL EMAILS
                    </button>
                </div>
                <Tabs className={styles.tabMenu}
                    value={this.state.tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.changeTab}
                    variant="fullWidth"
                >
                    <Tab disableRipple label="User Email Preferences" />
                    <Tab disableRipple label="Project Email Preferences" />
                </Tabs>
                <div className={styles.buttonWrapper}>
                    <button
                        className={styles.update}
                        onClick={() => {
                            if (this.state.tabValue === 0) {
                                this.selectAllUserPreferences();
                            } else {
                                this.selectAllProjectPreferences();
                            }
                        }}
                    >
                        SELECT ALL { this.state.tabValue === 0 ? "USER" : "PROJECT" } PREFERENCES
                    </button>
                    <button
                        className={styles.unsubscribe}
                        onClick={() => {
                            if (this.state.tabValue === 0) {
                                this.clearUserPreferences();
                            } else {
                                this.clearProjectPreferences();
                            }
                        }}
                    >
                        CLEAR { this.state.tabValue === 0 ? "USER" : "PROJECT" } PREFERENCES
                    </button>
                </div>
                {
                    this.state.tabValue === 0 ?
                        <>
                            <div className={styles.questionsWrapper}>
                                {
                                    this.getQAComponent(userPreferenceQuestions[0], 0)
                                }
                                {
                                    this.getQAComponent(userPreferenceQuestions[1], 1)
                                }
                            </div>
                            {
                                this.getQAComponent(userPreferenceQuestions[2], 2)
                            }
                        </>
                    :
                        <>
                            <div className={styles.questionsWrapper}>
                                {
                                    this.getQAComponent(projectPreferenceQuestions[0], 0)
                                }
                                {
                                    this.getQAComponent(projectPreferenceQuestions[1], 1)
                                }
                            </div>
                            {
                                this.getQAComponent(projectPreferenceQuestions[2], 2)
                            }
                        </>
                }
            </div>
        );
    }
}

export default EmailPreferences;
