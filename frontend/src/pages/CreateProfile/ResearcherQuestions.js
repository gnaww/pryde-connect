import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import { AnswerTypes } from './Constants';
import { getDropDownQuestion, getCheckboxQuestion, getTextboxQuestion, getCheckedValuesArray, getRadiobuttonQuestion } from './QAComponents';

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
            options: ResearcherInformation.ResearcherType,
            key: "researchType"
        }
    },
    {
        questionText: "What research topics do you study?",
        answer: {
            type: AnswerTypes.Checkbox,
            options: ResearcherInformation.ResearchTopics,
            key: "researchTopics"
        }
    },
    {
        questionText: "In 1-2 sentences, please describe your research interests.",
        answer: {
            type: AnswerTypes.Textbox,
            key: "researchInterests"
        }
    }
];

class ResearcherQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locatedAtCornell: null,
            location: {
                college: "",
                department: "",
                organization: "",
                address: ""
            },
            researchInterests: "",
            researchTopics: getCheckedValuesArray(ResearcherInformation.ResearchTopics),
            researchType: {
                option: "",
                other: ""
            }
        }
    }

    componentDidUpdate(_prevProps, _prevState) {
        function isInvalid(state) {
            var locationValid;
            if (state.locatedAtCornell) {
                locationValid = state.location.college !== "" &&
                    state.location.department !== "";
            }
            else {
                locationValid = state.location.organization !== "" &&
                    state.location.address !== "";
            }
            var interestsStated = state.researchInterests !== "";
            var topicsSelected = state.researchTopics.filter(r => r.checked).length > 0;
            var typeSelected = state.researchType.option === "" ?
                false : (state.researchType.option === "Other: " ? state.other !== "" : true);
            return state.locatedAtCornell === null || !locationValid
                || !interestsStated || !topicsSelected || !typeSelected;
        }

        if (this.props.clickedNext) {
            var error = isInvalid(this.state);
            this.props.onSubmitData(this.state, error);
        }
        return null;
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
        }
    }

    setLocatedAtCornell = event => {
        this.setState({
            locatedAtCornell: event.target.value,
            location: {
                college: "",
                department: "",
                organization: "",
                address: ""
            },

        });
    }

    setValuesCheckbox = (key, index, text) => {
        var copy = Array.from(this.state[key]);
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

    setValuesRadio = (key, option, text) => {
        if (text !== null) {
            this.setState({
                [key]: {
                    option: option,
                    other: text
                }
            })
        }
        else {
            this.setState({
                [key]: {
                    option: option,
                    other: ""
                }
            })
        }
    }

    setLocationTextbox = key => event => {
        var value = event.target.value;
        this.setState((prevState, _props) => ({
            location: {
                ...prevState.location,
                [key]: value
            }
        }));
    }

    setTextboxValue = key => event => {
        var val = event.target.value;
        this.setState({
            [key]: val
        });
    }

    getQAComponent = (qa, index) => {
        return (
            <li className={styles.numberedList} key={index}>

                {getDropDownQuestion(qa, this.setLocatedAtCornell)}
                {
                    qa.id === 0 && this.state.locatedAtCornell !== null &&
                    (
                        <div className={styles.form}>
                            <input
                                className={
                                    this.state.locatedAtCornell === "true" ?
                                        styles.mediumTextInput : styles.longTextInput
                                }
                                placeholder={
                                    this.state.locatedAtCornell === "true" ?
                                        "College" : "What is your institution or organization?"
                                }
                                type="text"
                                value={
                                    this.state.locatedAtCornell === "true" ?
                                        this.state.location.college : this.state.location.organization
                                }
                                onChange={
                                    this.setLocationTextbox(
                                        this.state.locatedAtCornell === "true" ?
                                            "college" : "organization"
                                    )
                                }
                            />
                            <input
                                className={
                                    this.state.locatedAtCornell === "true" ?
                                        styles.mediumTextInput : styles.longTextInput
                                }
                                placeholder={
                                    this.state.locatedAtCornell === "true" ?
                                        "Department" : "Where are you located?"
                                }
                                type="text"
                                value={
                                    this.state.locatedAtCornell === "true" ?
                                        this.state.location.department : this.state.location.address
                                }
                                onChange={
                                    this.setLocationTextbox(
                                        this.state.locatedAtCornell === "true" ?
                                            "department" : "address"
                                    )
                                }
                            />
                        </div>
                    )
                }
                {getRadiobuttonQuestion(qa, this.setValuesRadio, this.state)}
                {getCheckboxQuestion(qa, this.setValuesCheckbox, this.state)}
                {getTextboxQuestion(qa, this.setTextboxValue, this.state, index)}
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

export default ResearcherQuestions;