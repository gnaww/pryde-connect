import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import { PractitionerInformation, ResearcherInformation, researcherQAForm } from './FormContent';
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
            ageRanges: getCheckedValuesArray(PractitionerInformation.AgeGroups),
            researchDescription: "",
            researchInterests: getCheckedValuesArray(ResearcherInformation.ResearchTopics),
            displayRole: {
                option: "",
                other: ""
            }
        };
        this.errors = researcherQAForm.map(_qa => { return false });
    }

    componentDidUpdate(_prevProps, _prevState) {
        function isInvalid(state, obj) {
            let locationValid;

            if (state.locatedAtCornell) {
                locationValid = state.metaLocation.college !== "" &&
                    state.metaLocation.department !== "";
            }
            else {
                locationValid = state.metaLocation.organization !== "" &&
                    state.metaLocation.address !== "";
            }

            let typeSelected = state.displayRole.option === "Other: " ? state.displayRole.other !== "" : state.displayRole.option !== "";
            let topicsSelected = state.researchInterests.filter(r => {
                if (r.value === "Other: ") {
                    return r.other !== ""
                } else {
                    return r.checked;
                }
            }).length > 0;
            let interestsStated = state.researchDescription !== "";
            obj.errors[0] = state.locatedAtCornell === null || !locationValid;
            obj.errors[1] = !typeSelected;
            obj.errors[2] = !topicsSelected;
            obj.errors[3] = !interestsStated;
            return state.locatedAtCornell === null || !locationValid
                || !interestsStated || !topicsSelected || !typeSelected;
        }

        if (this.props.clickedNext) {
            let error = isInvalid(this.state, this);
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
                { getDropDownQuestion(qa, this.setLocatedAtCornell, defaultLocatedAtCornell, this.errors[index]) }
                {
                    qa.id === 0 && this.state.locatedAtCornell !== null &&
                    (
                        <div className={styles.locationForm}>
                            <input
                                className={styles.longTextInput}
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
                                className={styles.longTextInput}
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
                { getRadiobuttonQuestion(qa, this.setValuesRadio, this.state, this.errors[index]) }
                { getCheckboxQuestion(qa, this.setValuesCheckbox, this.state, this.errors[index]) }
                { getTextboxQuestion(qa, this.setTextboxValue, this.state, index, this.errors[index]) }
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
