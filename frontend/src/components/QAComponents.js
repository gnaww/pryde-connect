import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import styles from '../styles/CreateProfile.module.css';
import CustomDropdown from './CustomDropdown';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import checkboxStyles from '../styles/FilterCategory.module.css';
import DeleteIcon from '../images/delete-icon.svg';
import api from '../services/api';

export const AnswerTypes = {
    Dropdown: "dropdown",
    Checkbox: "checkbox",
    Textbox: "textbox",
    Radiobutton: "radiobutton",
    Inputbox: "inputbox",
    MultipleAnswers: "mutipleanswers",
    ContactInfo: "contactinfo",
    Button: "button",
    Collaborator: "collaborator"
};

export const getCheckedValuesArray = values => {
    return values.map(v => { return { value: v, checked: false, other: "" } })
};

export const getDropDownQuestion = (qa, handlerFunction, defaultValue, hasError) => {
    return (
        qa.answer.type === AnswerTypes.Dropdown &&
        <>
            <div className={styles.dropdownQuestion}>
                <div>
                    <p className={styles.question}>{qa.questionText}</p>
                </div>
                <div className={styles.dropdown}>
                    <CustomDropdown
                        handleChange={handlerFunction}
                        name={qa.questionText}
                        label={qa.answer.label}
                        options={qa.answer.options}
                        defaultValue={defaultValue}
                    />
                </div>
            </div>
            {hasError && <p className={styles.errorMsg}>This question is required.</p>}
        </>
    )
};

export const getInputboxQuestion = (qa, handlerFunction, state, hasError) => {
    return (
        qa.answer.type === AnswerTypes.Inputbox &&
        (
            <>
                <p className={styles.question}>{qa.questionText}</p>
                <p className={styles.label}>{qa.answer.label}</p>
                {hasError && <p className={styles.errorMsg}>This question is required.</p>}
                <input
                    className={styles.longTextInput}
                    placeholder={qa.answer.placeholder}
                    type="text"
                    value={state[qa.answer.key] ? state[qa.answer.key].option : state[qa.answer.key]}
                    onChange={handlerFunction(qa.answer.key)}
                />
            </>
        )
    )
};

export const getButtonInput = (qa, handlerFunction, state) => {
    return (
        qa.answer.type === AnswerTypes.Button &&
        (
            <>
                <p className={styles.question}>{qa.questionText}</p>
                <p className={styles.label}>{qa.answer.label}</p>
                <label className={styles.uploadButton} htmlFor="uploadButton">{qa.answer.value}</label>
                <input
                    className={styles.propic}
                    id={"uploadButton"}
                    type="file"
                    onChange={handlerFunction(null)}
                />
                {
                    state[qa.answer.key] &&
                    state[qa.answer.key].map((f, i) => {
                        return (
                            <div key={`${f[1]}${i}`} className={styles.fileUploaded}>
                                <p>{f[1]}</p>
                                <button className={styles.deleteFile} onClick={handlerFunction(i)}>
                                    <img src={DeleteIcon} alt="Delete"/>
                                </button>
                            </div>
                        )
                    })
                }
            </>
        )
    )
};

export const getTextboxQuestion = (qa, handlerFunction, state, index, hasError) => {
    return (
        qa.answer.type === AnswerTypes.Textbox &&
        (
            <>
                <p className={styles.question}>{qa.questionText}</p>
                {hasError && <p className={styles.errorMsg}>This question is required.</p>}
                <textarea
                    key={index}
                    className={styles.answer}
                    placeholder={qa.answer.placeholder ? qa.answer.placeholder : "Type your answer here"}
                    value={state[qa.answer.key]}
                    onChange={handlerFunction(qa.answer.key)}
                >
                </textarea>
            </>
        )
    )
};

export const getCheckboxQuestion = (qa, handlerFunction, state, hasError) => {
    return (
        qa.answer.type === AnswerTypes.Checkbox &&
        <>
            <p className={styles.question}>{qa.questionText}</p>
            {hasError && <p className={styles.errorMsg}>This question is required.</p>}
            {
                qa.answer.options.map((option, index) => {
                    return (
                        <div key={index}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="default"
                                        className={checkboxStyles.checkbox}
                                        name={qa.questionText}
                                        value={option}
                                        checked={state[qa.answer.key][index].checked}
                                        onChange={_e => handlerFunction(qa.answer.key, index, null)}
                                        disableRipple
                                    />
                                }
                                classes={{ label: styles.qaOptionText }}
                                label={option}
                            />
                            {option === "Other: " && (
                                <input
                                    disabled={!state[qa.answer.key][index].checked}
                                    className={styles.otherTextbox}
                                    type="text"
                                    value={state[qa.answer.key][index].other}
                                    onChange={e => handlerFunction(qa.answer.key, index, e.target.value)}
                                />
                            )}
                        </div>
                    )
                })
            }
        </>
    )
};

export const getRadiobuttonQuestion = (qa, handlerFunction, state, hasError) => {
    return (
        qa.answer.type === AnswerTypes.Radiobutton &&
        <>
            <p className={styles.question}>{qa.questionText}</p>
            {hasError && <p className={styles.errorMsg}>This question is required.</p>}
            {
                qa.answer.options.map((option, index) => {
                    return (
                        <div key={index}>
                            <FormControlLabel
                                control={
                                    <Radio
                                        color="default"
                                        className={checkboxStyles.checkbox}
                                        name={qa.questionText}
                                        onChange={_e => handlerFunction(qa.answer.key, option, null)}
                                        checked={state[qa.answer.key].option === option}
                                        value={option}
                                        disableRipple
                                    />
                                }
                                classes={{ label: styles.qaOptionText }}
                                label={option}
                            />
                            {option === "Other: " && (
                                <input
                                    disabled={state[qa.answer.key].option !== option}
                                    className={styles.otherTextbox}
                                    type="text"
                                    value={state[qa.answer.key].other}
                                    onChange={e => handlerFunction(qa.answer.key, option, e.target.value)}
                                />
                            )}
                        </div>
                    )
                })
            }
        </>
    )
};

export const getMultipleAnswerQuestion = (qa, handlerFunction, state) => {
    return (
        qa.answer.type === AnswerTypes.MultipleAnswers &&
        <>
            <p className={styles.question}>{qa.questionText}</p>
            {
                qa.answers.map((q, index) => {
                    return (
                        <div key={index}>
                            {getTextboxQuestion(q, handlerFunction, state, index, false)}
                            {getButtonInput(q, handlerFunction, state, index, false)}
                        </div>
                    )
                })
            }
        </>
    )
};

export const getContactInfoQuestion = (qa, handlerFunction, state, hasError) => {
    return (
        qa.answer.type === AnswerTypes.ContactInfo &&
        <>
            <p className={styles.question}>{qa.questionText}</p>
            {hasError && <p className={styles.errorMsg}>All required fields must be filled in.<br /> Email, phone, and website must be valid.</p>}
            <div>
                <input
                    className={styles.smallTextInput}
                    placeholder="First name*"
                    type="text"
                    value={state.alternateContact.first_name}
                    onChange={handlerFunction('first_name')}
                />
                <input
                    className={styles.smallTextInput}
                    placeholder="Last name*"
                    type="text"
                    value={state.alternateContact.last_name}
                    onChange={handlerFunction('last_name')}
                />
            </div>
            <input
                className={styles.longTextInput}
                placeholder="Email address*"
                type="text"
                value={state.alternateContact.email}
                onChange={handlerFunction('email')}
            />
            <div className={styles.optionalField}>
                <input
                    className={styles.smallTextInput}
                    placeholder="Phone # (optional)"
                    type="text"
                    value={state.alternateContact.phone}
                    onChange={handlerFunction('phone')}
                />
                <input
                    className={styles.smallTextInput}
                    placeholder="Website (optional)"
                    type="text"
                    value={state.alternateContact.website}
                    onChange={handlerFunction('website')}
                />
            </div>
        </>
    )
};

const loadOptions = (inputValue, callback) => {
    api.collaboratorSearch(inputValue)
        .then(results => {
            callback(results.map(result => {
                return {
                    label: `${result.first_name} ${result.last_name} - ${result.email}`,
                    value: result
                }
            }))
        })
        .catch(err => {
            console.log(err);
            alert("An error occurred while searching for users to add as a collaborator.");
        })
};

export class CollaboratorQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collaboratorSearch: ''
        };
    }

    handleInputChange = collaboratorSearch => {
        this.setState({ collaboratorSearch });
        return collaboratorSearch;
    };

    render() {
        const { addCollaborator, qa, userCanEditCollaborators, collaborators, updateCollaboratorPermission, deleteCollaborator } = this.props;
        return (
            <div className={styles.collaboratorQuestionWrapper}>
                <p className={styles.question}>{qa.questionText}</p>
                <AsyncSelect
                    loadOptions={loadOptions}
                    onInputChange={this.handleInputChange}
                    onChange={addCollaborator}
                    isClearable
                    isDisabled={!userCanEditCollaborators}
                    placeholder="Search for users to add by their email..."
                />
                <div>
                    {
                        collaborators.map(collaborator => {
                            return (
                                <div key={collaborator.pk} className={styles.collaboratorCard}>
                                    <div className={styles.collaboratorInfo}>
                                        <h4>{`${collaborator.first_name} ${collaborator.last_name}`}</h4>
                                        <h4>{collaborator.email}</h4>
                                    </div>
                                    <div>
                                        <div className={styles.permissionsHeader}>
                                            <h4>Permissions</h4>
                                            {
                                                userCanEditCollaborators &&
                                                <button onClick={() => deleteCollaborator(collaborator.pk)}>
                                                    <img src={DeleteIcon} alt="Delete icon" />
                                                </button>
                                            }
                                        </div>
                                        <div>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="default"
                                                        className={checkboxStyles.checkbox}
                                                        name="editPermission"
                                                        checked={collaborator.editPermission}
                                                        onChange={() => updateCollaboratorPermission(collaborator.pk, "editPermission")}
                                                        disabled={!userCanEditCollaborators}
                                                        disableRipple
                                                    />
                                                }
                                                classes={{ label: styles.collaboratorCheckboxLabel }}
                                                label="Edit project"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="default"
                                                        className={checkboxStyles.checkbox}
                                                        name="deletePermission"
                                                        checked={collaborator.deletePermission}
                                                        onChange={() => updateCollaboratorPermission(collaborator.pk, "deletePermission")}
                                                        disabled={!userCanEditCollaborators}
                                                        disableRipple
                                                    />
                                                }
                                                classes={{ label: styles.collaboratorCheckboxLabel }}
                                                label="Delete project"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="default"
                                                        className={checkboxStyles.checkbox}
                                                        name="editCollaboratorsPermission"
                                                        checked={collaborator.editCollaboratorsPermission}
                                                        onChange={() => updateCollaboratorPermission(collaborator.pk, "editCollaboratorsPermission")}
                                                        disabled={!userCanEditCollaborators}
                                                        disableRipple
                                                    />
                                                }
                                                classes={{ label: styles.collaboratorCheckboxLabel }}
                                                label="Edit collaborators"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
