import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import { getCheckboxQuestion, getDropDownQuestion, getCheckedValuesArray, getInputboxQuestion } from '../../components/QAComponents';
import { PractitionerInformation, practitionerQAForm } from './FormContent';

class PractitionerQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locatedAtCCE: null,
            affiliation: "",
            location: "",
            displayRole: {
                option: "",
                other: ""
            },
            roles: getCheckedValuesArray(PractitionerInformation.RoleDescriptions),
            ageRanges: getCheckedValuesArray(PractitionerInformation.AgeGroups),
            deliveryModes: getCheckedValuesArray(PractitionerInformation.ProgramDeliveryModels),
            researchInterests: getCheckedValuesArray(PractitionerInformation.ResearchTopics)
        };
    }

    componentDidUpdate(_prevProps, _prevState) {
        function keyIsValid(state, key) {
            let last = state[key].length - 1;
            if (key === "ageRanges") {
                return state[key].filter(r => r.checked).length > 0;
            }
            else if (key === "displayRole") {
                if (state[key].option === "Other: ") {
                    return state[key].other !== "";
                } else {
                    return state[key].option !== "";
                }
            } else {
                return state[key].filter(r => r.checked).length > 0
                    && (!state[key][last].checked || state[key][last].other !== "");
            }
        }

        function isInvalid(state) {
            let locationValid = state.affiliation !== "" && state.location !== "";
            let keys = ["displayRole", "roles", "ageRanges", "deliveryModes", "researchInterests"];
            let validArray = keys.map(k => keyIsValid(state, k));
            return !locationValid || validArray.filter(v => !v).length !== 0;
        }

        if (this.props.clickedNext) {
            let error = isInvalid(this.state);
            this.props.onSubmitData(this.state, error);
        }
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
        }
    }

    setLocatedAtCCE = event => {
        this.setState({
            locatedAtCCE: event.target.value === "true",
            affiliation: "",
            location: ""
        });
    }

    setDisplayRole = event => {
        this.setState({
            displayRole: {
                other: "",
                option: event.target.value
            }
        });
    }

    setLocationDropdown = event => {
        this.setState({
            affiliation: "Cornell Cooperative Extension",
            location: event.target.value
        });
    }

    setLocationTextbox = key => event => {
        let value = event.target.value;

        if (key === "affiliation") {
            this.setState((prevState, _props) => ({
                affiliation: value,
                location: prevState.location
            }));
        } else {
            this.setState((prevState, _props) => ({
                affiliation: prevState.affiliation,
                location: value
            }));
        }
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
        const defaultLocatedAtCCE = this.state.locatedAtCCE !== null ? this.state.locatedAtCCE : "";
        const defaultCounty = this.state.location ? this.state.location : "";

        return (
            <li className={styles.numberedList} key={index}>
                {getDropDownQuestion(qa, this.setLocatedAtCCE, defaultLocatedAtCCE)}
                {getCheckboxQuestion(qa, this.setValues, this.state)}
                {getInputboxQuestion(qa, this.setDisplayRole, this.state)}
                {
                    qa.id === 0 && this.state.locatedAtCCE !== null &&
                    (
                        <div className={styles.form}>
                            {
                                this.state.locatedAtCCE ?
                                    getDropDownQuestion(qa.extra, this.setLocationDropdown, defaultCounty)
                                    :
                                    <>
                                        <input
                                            className={styles.longTextInput}
                                            placeholder="What is your institution or organization?"
                                            type="text"
                                            value={this.state.affiliation}
                                            onChange={this.setLocationTextbox("affiliation")}
                                        />
                                        <input
                                            className={styles.longTextInput}
                                            placeholder="Where are you located?"
                                            type="text"
                                            value={this.state.location}
                                            onChange={this.setLocationTextbox("location")}
                                        />
                                    </>
                            }
                        </div>
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
                        practitionerQAForm.map((qa, index) => {
                            return this.getQAComponent(qa, index)
                        })
                    }
                </ol>
            </div>
        );
    }
}

export default PractitionerQuestions;
