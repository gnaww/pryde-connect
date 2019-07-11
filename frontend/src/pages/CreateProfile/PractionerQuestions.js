import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import CustomDropdown from '../../components/CustomDropdown';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import checkboxStyles from '../../styles/FilterCategory.module.css';

const AnswerTypes = {
    Dropdown: "dropdown",
    Checkbox: "checkbox",
    Textbox: "textbox",
    Radiobutton: "radiobutton"
}

const PractionerInformation = {
    RoleDescriptions: [
        "Lead youth programs",
        "Design youth programs",
        "Evaluate youth programs",
        "Write grants",
        "Train volunteers",
        "Other: "
    ],
    AgeGroups: [
        "Infants (0-1 year)",
        "Toddlers (1-2 years)",
        "Toddlers (2-3 years)",
        "Preschoolers (3-5 years)",
        "Middle Childhood (6-8 years)",
        "Middle Childhood (9-11 years)",
        "Young Teens (12-14 years)",
        "Teenagers (15-17 years)"
    ],
    YouthProgramTypes: [
        "Animal Science",
        "Civic Engagement",
        "Cooking",
        "STEM",
        "Other: "
    ],
    ProgramDeliveryModels: [
        "Afterschool programs",
        "Camps",
        "Clubs",
        "Other: "
    ],
    ResearchTopics: [
        "Positive Youth Development",
        "Self and Identity",
        "Diversity, Equity, and Inclusion",
        "Education and Learning",
        "STEM education",
        "Health",
        "Civic Engagement",
        "Other: "
    ]
}

const qaForm = [
    {
        questionText: "Are you located within the Cornell Cooperative Extension?",
        answer: {
            type: AnswerTypes.Dropdown,
            label: "SELECT",
            options: [
                {
                    value: true,
                    text: "YES"
                },
                {
                    value: false,
                    text: "NO"
                }
            ]
        },
        id: 0, //put an id here for questions that have special properties
    },
    {
        questionText: "Which (if any) of the following describe your roles? (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractionerInformation.RoleDescriptions
        }
    },
    {
        questionText: "What age youth do you work with?",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractionerInformation.AgeGroups
        }
    },
    {
        questionText: "What types of youth programs do you work with? (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractionerInformation.YouthProgramTypes
        }
    },
    {
        questionText: "What types of program delivery models do you use? (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractionerInformation.ProgramDeliveryModels
        }
    },
    {
        questionText: "What research topics are you interested in? (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractionerInformation.ResearchTopics
        }
    }
];

class PractionerQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locatedAtCornell: null
        }
    }

    setLocatedAtCornell = value => {
        this.setState({ locatedAtCornell: value })
    }

    getQAComponent = (qa, index) => {
        return (
            <li className={styles.numberedList} key={index}>
                <div className={styles.dropdownQuestion}>
                    <p className={styles.question}>{qa.questionText}</p>
                    {
                        qa.answer.type === AnswerTypes.Dropdown &&
                        (
                            <div className={styles.dropdown}>
                                <CustomDropdown
                                    handleChange={this.setLocatedAtCornell}
                                    name={qa.questionText}
                                    label="SELECT"
                                    options={qa.answer.options}
                                />
                            </div>
                        )
                    }
                </div>
                {
                    qa.id === 0 &&
                    (
                        <div className={styles.form}>
                            <input
                                className={styles.mediumTextInput}
                                placeholder="College"
                                type="text"
                            />
                            <input
                                className={styles.mediumTextInput}
                                placeholder="Department"
                                type="text"
                            />
                        </div>
                    )
                }
                {
                    qa.answer.type === AnswerTypes.Checkbox &&
                    qa.answer.options.map((option, index) => {
                        return (
                            <div key={index}>
                                <Checkbox
                                    color="default"
                                    className={checkboxStyles.checkbox}
                                    name={qa.questionText}
                                    value={option}
                                    disableRipple
                                />
                                <label className={styles.qaOptionText}>{option}</label>
                                {option === "Other: " && (
                                    <input className={styles.otherTextbox} type="text" />
                                )}
                            </div>
                        )
                    })
                }
                {
                    qa.answer.type === AnswerTypes.Textbox &&
                    (
                        <textarea
                            className={styles.answer}
                            placeholder="Type your answer here"
                        >
                        </textarea>
                    )
                }
            </li>
        );
    }

    render() {
        return (
            <div className={styles.form}>
                <ol>
                    {
                        qaForm.map((qa, index) => {
                            return this.getQAComponent(qa, index)
                        })
                    }
                </ol>
            </div>
        )
    }
}

export default PractionerQuestions;