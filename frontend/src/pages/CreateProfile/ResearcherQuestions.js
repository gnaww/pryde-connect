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

const ResearcherInformation = {
    ResearcherType: [
        "Faculty",
        "Academic Staff",
        "Postdoctoral Fellow",
        "Graduate Student",
        "Undergraduate Student",
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
        questionText: "Are you located at Cornell?",
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
        questionText: "Which of the following best describes you?",
        answer: {
            type: AnswerTypes.Radiobutton,
            options: ResearcherInformation.ResearcherType
        }
    },
    {
        questionText: "What research topics do you study?",
        answer: {
            type: AnswerTypes.Checkbox,
            options: ResearcherInformation.ResearchTopics
        }
    },
    {
        questionText: "In 1-2 sentences, please describe your research interests.",
        answer: {
            type: AnswerTypes.Textbox,
        }
    }
];
function Textbox({ placeholder }) {

    const [ph, setPh] = React.useState(placeholder);

    return (
        <input
            className={styles.mediumTextInput}
            placeholder={ ph }
            type="text"
        />
    )
}

class ResearcherQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            var: 0,
            locatedAtCornell: null,
            locationPlaceholders: null
        }
    }

    setLocatedAtCornell = event => {
        console.log(event.target.value);
        this.setState({
            locatedAtCornell: event.target.value,
            locationPlaceholders: event.target.value ?
            ["College", "Department"] :
            ["What is your institution or organization?", "Where are you located?"]
        });
    }

    render() {
        return (
            <div className={styles.form}>
                <ol>
                    {
                        qaForm.map((qa, index) => {
                            return (
                                <li className={styles.numberedList} key={index}>
                                    <div className={styles.dropdownQuestion}>
                                        <p className={styles.question}>{qa.questionText}</p>
                                        {
                                            qa.answer.type === AnswerTypes.Dropdown &&
                                            (
                                                <div className={styles.dropdown}>
                                                    <select name={qa.questionText} defaultValue="" onChange={this.setLocatedAtCornell}>
                                                        <option value="" disabled>{"SELECT"}</option>
                                                        {
                                                            qa.answer.options.map((option, idx) => <option key={idx} value={option.value}>{option.text}</option>)
                                                        }
                                                    </select>
                                                </div>
                                            )
                                        }
                                    </div>
                                    {
                                        qa.id === 0 && this.state.locationPlaceholders &&
                                        (
                                            <div className={styles.form}>
                                                <Textbox placeholder={ this.state.locatedAtCornell === "true" ? 'A' : 'B' } />
                                                <input
                                                    className={styles.mediumTextInput}
                                                    placeholder={ this.state.locatedAtCornell === "true" ? 'A' : 'B' }
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
                                    {
                                        qa.answer.type === AnswerTypes.Radiobutton &&
                                        qa.answer.options.map((option, index) => {
                                            return (
                                                <div key={index}>
                                                    <Radio
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
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        )
    }
}

export default ResearcherQuestions;