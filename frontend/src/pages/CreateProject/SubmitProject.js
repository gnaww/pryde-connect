import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import { getInputboxQuestion, getCheckboxQuestion, getCheckedValuesArray, getDropDownQuestion, getMultipleAnswerQuestion, getContactInfoQuestion, getTextboxQuestion } from '../../components/QAComponents';
import { PractitionerInformation } from '../CreateProfile/FormContent';
import { projectQAForm, KeyTypes, pairs } from './FormContent';
import { isValidEmail, isValidURL, isValidPhoneNumber } from '../../services/validators';

class SubmitProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            status: null,
            summary: "",
            researchTopics: getCheckedValuesArray(PractitionerInformation.ResearchTopics),
            ageRanges: getCheckedValuesArray(PractitionerInformation.AgeGroups),
            deliveryModes: getCheckedValuesArray(PractitionerInformation.ProgramDeliveryModels),
            timeline: "",
            commitmentLength: "",
            incentives: "",
            additionalInformation: "",
            additionalFiles: [], // TODO: need to implement with file hosting
            collaborators: [], // TODO: need to implement form for adding/editing collaborators
            alternateContact: {
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                website: ""
            },
            alternateLocation: ""
        };
        this.errors = projectQAForm.map(_q => { return false });
    }

    componentDidUpdate(_prevProps, _prevState) {
        function nonEmptyString(key, state) {
            return state[key] !== "";
        }

        function nonEmptyArray(key, state) {
            let last = state[key].length - 1;
            if (key === "ageRanges") {
                return state[key].filter(r => r.checked).length > 0;
            } else {
                return state[key].filter(r => r.checked).length > 0
                    && (!state[key][last].checked || state[key][last].other !== "");
            }
        }

        function nonEmptyEnum(key, state) {
            return state[key] !== null;
        }

        function validContact(key, state) {
            const contactInfo = state[key];
            const allRequiredFieldsFilled = contactInfo.first_name !== "" && contactInfo.last_name !== ""&& contactInfo.email !== "";
            const allRequiredFieldsBlank = contactInfo.first_name === "" && contactInfo.last_name === ""&& contactInfo.email === "";

            if (allRequiredFieldsFilled) {
                if (!isValidEmail(contactInfo.email)) {
                    return false;
                } else if (contactInfo.phone && !isValidPhoneNumber(contactInfo.phone)) {
                    return false;
                } else if (contactInfo.website && !isValidURL(contactInfo.website)) {
                    return false;
                } else {
                    return true;
                }
            } else if (allRequiredFieldsBlank) {
                return true;
            } else {
                return false;
            }
        }

        function hasError(pair, state) {
            // TODO: add validation for files?
            if (pair.type === KeyTypes.String) {
                // TODO: add validation for collaborators
                if (pair.key === "collaborators") {
                    return false;
                } else if (pair.key === "alternateLocation") {
                    return false;
                } else {
                    return !nonEmptyString(pair.key, state);
                }
            } else if (pair.type === KeyTypes.Enum) {
                return !nonEmptyEnum(pair.key, state);
            } else if (pair.type === KeyTypes.Array) {
                return !nonEmptyArray(pair.key, state);
            } else if (pair.type === KeyTypes.Object) {
                return !validContact(pair.key, state)
            }
        }

        if (this.props.clickedNext) {
            for (let i = 0; i < pairs.length; i++) {
                this.errors[i] = hasError(pairs[i], this.state);
            }
            const error = this.errors.filter(e => e === true).length;
            this.props.onSubmitData(this.state, error > 0);
            window.scrollTo(0, 0);
        }
    }

    setTextbox = key => event => {
        let value = event.target.value;

        this.setState({
            [key]: value
        })
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

    setProjectStatus = event => {
        this.setState({
            status: event.target.value
        });
    }

    // TODO: will probably need to change when implementing file hosting
    setFileUploads = (key, event) => {
        let changed = Array.from(this.state.additionalFiles);
        if (key === null) {
            let file = event.target.files[0];
            let url = URL.createObjectURL(file);
            let name = file.name;
            changed.push([url, name]);
        }
        else {
            changed.splice(key, 1);
        }
        this.setState({
            additionalFiles: changed
        });
    }

    setMultiAnswerResponse = key => event => {
        if (key === null || Number.isInteger(key)) {
            this.setFileUploads(key, event);
        }
        else {
            this.setTextbox(key)(event);
        }
    }

    setContactInfo = key => event => {
        event.persist();

        this.setState(prevState => {
            return {
                alternateContact: {
                    ...prevState.alternateContact,
                    [key]: event.target.value
                }
            }
        });
    }

    getQAComponent = (qa, index) => {
        return (
            <li className={styles.numberedList} key={index}>
                { getDropDownQuestion(qa, this.setProjectStatus, "", this.errors[index]) }
                { getInputboxQuestion(qa, this.setTextbox, this, this.errors[index]) }
                { getTextboxQuestion(qa, this.setTextbox, this, index, this.errors[index]) }
                { getCheckboxQuestion(qa, this.setValues, this.state, this.errors[index]) }
                { getMultipleAnswerQuestion(qa, this.setMultiAnswerResponse, this.state) }
                { getContactInfoQuestion(qa, this.setContactInfo, this.state, this.errors[index]) }
            </li>
        );
    }

    render() {
        return (
            <div>
                <div className={styles.form}>
                    <ol>
                        {
                            projectQAForm.map((qa, index) => {
                                return this.getQAComponent(qa, index);
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }

}

export default SubmitProject;
