import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import { getInputboxQuestion, getCheckboxQuestion, getCheckedValuesArray, getDropDownQuestion, getMultipleAnswerQuestion, getContactInfoQuestion, getTextboxQuestion, CollaboratorQuestion, AnswerTypes } from '../../components/QAComponents';
import { PractitionerInformation } from '../CreateProfile/FormContent';
import { projectQAForm, KeyTypes, pairs } from './FormContent';
import { isValidEmail, isValidURL, isValidPhoneNumber } from '../../services/validators';

class SubmitProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                option: "",
                other: ""
            },
            status: null,
            summary: "",
            researchTopics: getCheckedValuesArray(PractitionerInformation.ResearchTopics),
            ageRanges: getCheckedValuesArray(PractitionerInformation.AgeGroups),
            deliveryModes: getCheckedValuesArray(PractitionerInformation.ProgramDeliveryModes),
            timeline: {
                option: "",
                other: ""
            },
            commitmentLength: {
                option: "",
                other: ""
            },
            incentives: {
                option: "",
                other: ""
            },
            additionalInformation: "",
            additionalFiles: [], // TODO: need to implement with file hosting
            initialCollaborators: [],
            collaborators: [],
            alternateContact: {
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                website: ""
            },
            alternateLocation: {
                option: "",
                other: ""
            }
        };
        this.errors = projectQAForm.map(_q => { return false });
    }

    componentDidUpdate(prevProps, _prevState) {
        function nonEmptyString(key, state) {
            return state[key].option !== "";
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
            const allRequiredFieldsFilled = contactInfo.first_name !== "" && contactInfo.last_name !== "" && contactInfo.email !== "";
            const allRequiredFieldsBlank = contactInfo.first_name === "" && contactInfo.last_name === "" && contactInfo.email === "";

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
                if (contactInfo.phone || contactInfo.website) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

        function hasError(pair, state) {
            if (pair.type === KeyTypes.String) {
                if (pair.key === "collaborators") {
                    return false;
                } else if (pair.key === "alternateLocation") {
                    return false;
                } else if (pair.key === "summary") {
                    return state.summary === "";
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

        if (prevProps.savedData !== this.props.savedData) {
            this.setState(this.props.savedData);
        }
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
        }
    }

    setTextbox = key => event => {
        let value = event.target.value;

        this.setState({
            [key]: value
        });
    }

    setInputbox = key => event => {
        this.setState({
            [key]: {
                option: event.target.value,
                other: ""
            }
        });
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

    addCollaborator = (collaborator, actionDescription) => {
        if (actionDescription.action === "select-option") {
            let collab = collaborator.value;
            const collaboratorExists = this.state.collaborators.filter(c => c.pk === collab.pk).length > 0;
            if (collaboratorExists) {
                alert("The same user cannot be added as a collaborator twice!");
            } else {
                collab.editPermission = false;
                collab.deletePermission = false;
                collab.editCollaboratorsPermission = false;
                this.setState(prevState => {
                    let newCollaborators = prevState.collaborators;
                    newCollaborators.push(collab);
                    return { collaborators: newCollaborators };
                });
            }
        }
    }

    updateCollaboratorPermission = (pk, permission) => {
        this.setState(prevState => {
            let newCollaborators = prevState.collaborators.map(c => {
                if (c.pk === pk) {
                    c[permission] = !c[permission];
                }
                return c;
            });
            return { collaborators: newCollaborators };
        });
    }

    deleteCollaborator = pk => {
        this.setState(prevState => {
            let newCollaborators = prevState.collaborators.filter(c => c.pk !== pk);
            return { collaborators: newCollaborators };
        });
    }

    getQAComponent = (qa, index) => {
        const defaultStatus = this.state.status ? this.state.status.toString() : "";
        const collabQuestion = {
            qa: qa,
            collaborators: this.state.collaborators,
            addCollaborator: this.addCollaborator,
            updateCollaboratorPermission: this.updateCollaboratorPermission,
            deleteCollaborator: this.deleteCollaborator
        }

        return (
            <li className={styles.numberedList} key={index}>
                {getDropDownQuestion(qa, this.setProjectStatus, defaultStatus, this.errors[index])}
                {getInputboxQuestion(qa, this.setInputbox, this.state, this.errors[index])}
                {getTextboxQuestion(qa, this.setTextbox, this.state, index, this.errors[index])}
                {getCheckboxQuestion(qa, this.setValues, this.state, this.errors[index])}
                {getMultipleAnswerQuestion(qa, this.setMultiAnswerResponse, this.state)}
                {getContactInfoQuestion(qa, this.setContactInfo, this.state, this.errors[index])}
                {qa.answer.type === AnswerTypes.Collaborator && <CollaboratorQuestion {...collabQuestion} />}
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
