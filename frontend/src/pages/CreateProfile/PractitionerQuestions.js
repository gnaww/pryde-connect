import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import { getCheckboxQuestion, getDropDownQuestion, getCheckedValuesArray } from './QAComponents';
import { PractitionerInformation, practitionerQAForm } from './Constants';

class PractitionerQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locatedAtCornell: null,
            location: {
                instituition: "",
                address: ""
            },
            roleDescriptions: getCheckedValuesArray(PractitionerInformation.RoleDescriptions),
            ageGroups: getCheckedValuesArray(PractitionerInformation.AgeGroups),
            programTypes: getCheckedValuesArray(PractitionerInformation.YouthProgramTypes),
            deliveryTypes: getCheckedValuesArray(PractitionerInformation.ProgramDeliveryModels),
            researchTopics: getCheckedValuesArray(PractitionerInformation.ResearchTopics)
        }
    }

    componentDidUpdate(_prevProps, _prevState) {
        function keyIsValid(state, key) {
            var last = state[key].length - 1;
            return state[key].filter(r => r.checked).length > 0
                && (!state[key][last].checked || state[key][last].other !== "");
        }
        function isInvalid(state) {
            var locationValid = state.location.instituition !== "" && state.location.address !== "";
            var keys = ["roleDescriptions", "ageGroups", "programTypes", "deliveryTypes", "researchTopics"];
            var validArray = keys.map(k => keyIsValid(state, k));
            return !locationValid || validArray.filter(v => !v).length > 0;
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
                instituition: "",
                address: ""
            }
        });
    }

    setLocationDropdown = event => {
        this.setState({
            location: {
                instituition: "Cornell Cooperative Extension",
                address: event.target.value
            }
        });
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

    setValues = (key, index, text) => {
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

    getQAComponent = (qa, index) => {
        return (
            <li className={styles.numberedList} key={index}>
                {getDropDownQuestion(qa, this.setLocatedAtCornell)}
                {getCheckboxQuestion(qa, this.setValues, this.state)}
                {
                    qa.id === 0 && this.state.locatedAtCornell !== null &&
                    (
                        <div className={styles.form}>
                            {
                                this.state.locatedAtCornell === "true" &&
                                getDropDownQuestion(qa.extra, this.setLocationDropdown)
                            }
                            {
                                this.state.locatedAtCornell === "false" &&
                                (
                                    <>
                                        <input
                                            className={styles.longTextInput}
                                            placeholder="What is your instituition or organization?"
                                            type="text"
                                            value={this.state.location.instituition}
                                            onChange={this.setLocationTextbox("instituition")}
                                        />
                                        <input
                                            className={styles.longTextInput}
                                            placeholder="Where are you located?"
                                            type="text"
                                            value={this.state.location.address}
                                            onChange={this.setLocationTextbox("address")}
                                        />
                                    </>
                                )
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
        )
    }
}

export default PractitionerQuestions;