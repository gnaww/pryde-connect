import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import { ResearcherInformation, researcherQAForm } from './FormContent';
import { getDropDownQuestion, getCheckboxQuestion, getTextboxQuestion, getCheckedValuesArray, getRadiobuttonQuestion } from '../../components/QAComponents';

class ResearcherQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locatedAtCornell: null,
            metaLocation: {
                college: "",
                department: "",
                organization: "",
                address: ""
            },
            researchDescription: "",
            researchInterests: getCheckedValuesArray(ResearcherInformation.ResearchTopics),
            displayRole: {
                option: "",
                other: ""
            }
        };
    }

    componentDidUpdate(_prevProps, _prevState) {
        function isInvalid(state) {
            let locationValid;

            if (state.locatedAtCornell) {
                locationValid = state.metaLocation.college !== "" &&
                    state.metaLocation.department !== "";
            }
            else {
                locationValid = state.metaLocation.organization !== "" &&
                    state.metaLocation.address !== "";
            }

            let interestsStated = state.researchDescription !== "";
            let topicsSelected = state.researchInterests.filter(r => r.checked).length > 0;
            let typeSelected = state.displayRole.option === "" ?
                false : (state.displayRole.option === "Other: " ? state.other !== "" : true);

            return state.locatedAtCornell === null || !locationValid
                || !interestsStated || !topicsSelected || !typeSelected;
        }

        if (this.props.clickedNext) {
            let error = isInvalid(this.state);
            let data = Object.assign({}, this.state);

            if (data.locatedAtCornell) {
                data.location = "Cornell University";
                data.affiliation = `${data.metaLocation.department} at ${data.metaLocation.college}`;
            } else {
                data.location = data.metaLocation.address;
                data.affiliation = data.metaLocation.organization;
            }

            this.props.onSubmitData(data, error);
        }
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
        }
    }

    setLocatedAtCornell = event => {
        this.setState({
            locatedAtCornell: event.target.value === "true",
            metaLocation: {
                college: "",
                department: "",
                organization: "",
                address: ""
            }
        });
    }

    setValuesCheckbox = (key, index, text) => {
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

    setValuesRadio = (key, option, text) => {
        if (text !== null) {
            this.setState({
                [key]: {
                    option: option,
                    other: text
                }
            });
        }
        else {
            this.setState({
                [key]: {
                    option: option,
                    other: ""
                }
            });
        }
    }

    setLocationTextbox = key => event => {
        let value = event.target.value;
        this.setState((prevState, _props) => ({
            metaLocation: {
                ...prevState.metaLocation,
                [key]: value
            }
        }));
    }

    setTextboxValue = key => event => {
        let val = event.target.value;
        this.setState({
            [key]: val
        });
    }

    getQAComponent = (qa, index) => {
        const defaultLocatedAtCornell = this.state.locatedAtCornell !== null ? this.state.locatedAtCornell : "";
        return (
            <li className={styles.numberedList} key={index}>
                {getDropDownQuestion(qa, this.setLocatedAtCornell, defaultLocatedAtCornell)}
                {
                    qa.id === 0 && this.state.locatedAtCornell !== null &&
                    (
                        <div className={styles.form}>
                            <input
                                className={
                                    this.state.locatedAtCornell ?
                                        styles.mediumTextInput : styles.longTextInput
                                }
                                placeholder={
                                    this.state.locatedAtCornell ?
                                        "College" : "What is your institution or organization?"
                                }
                                type="text"
                                value={
                                    this.state.locatedAtCornell ?
                                        this.state.metaLocation.college : this.state.metaLocation.organization
                                }
                                onChange={
                                    this.setLocationTextbox(
                                        this.state.locatedAtCornell ?
                                            "college" : "organization"
                                    )
                                }
                            />
                            <input
                                className={
                                    this.state.locatedAtCornell ?
                                        styles.mediumTextInput : styles.longTextInput
                                }
                                placeholder={
                                    this.state.locatedAtCornell ?
                                        "Department" : "Where are you located?"
                                }
                                type="text"
                                value={
                                    this.state.locatedAtCornell ?
                                        this.state.metaLocation.department : this.state.metaLocation.address
                                }
                                onChange={
                                    this.setLocationTextbox(
                                        this.state.locatedAtCornell ?
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
                {}
            </li>
        );
    }

    render() {
        return (
            <div className={styles.form}>
                <ol>
                    {
                        researcherQAForm.map((qa, index) => {
                            return this.getQAComponent(qa, index);
                        })
                    }
                </ol>
            </div>
        )
    }
}

export default ResearcherQuestions;
