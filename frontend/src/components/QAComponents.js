import React from 'react';
import styles from '../styles/CreateProfile.module.css';
import CustomDropdown from './CustomDropdown';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import checkboxStyles from '../styles/FilterCategory.module.css';
import DeleteIcon from '../images/delete-icon.svg';

export const AnswerTypes = {
    Dropdown: "dropdown",
    Checkbox: "checkbox",
    Textbox: "textbox",
    Radiobutton: "radiobutton",
    Inputbox: "inputbox",
    MultipleAnswers: "mutipleanswers",
    ContactInfo: "contactinfo",
    Button: "button"
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
                            <div key={f[1]} className={styles.fileUploaded}>
                                <p>{f[1]}</p>
                                <img onClick={handlerFunction(i)} src={DeleteIcon} alt="Delete" />
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
}

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
}
