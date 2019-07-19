import React from 'react';
import styles from '../../styles/CreateProfile.module.css';
import CustomDropdown from '../../components/CustomDropdown';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import checkboxStyles from '../../styles/FilterCategory.module.css';
import { AnswerTypes } from './FormContent';

export const getCheckedValuesArray = values => {
    return values.map(v => { return { value: v, checked: false, other: "" } })
};

export const getDropDownQuestion = (qa, handlerFunction, defaultValue) => {
    return (
        qa.answer.type === AnswerTypes.Dropdown &&
        <div className={styles.dropdownQuestion}>
            <p className={styles.question}>{qa.questionText}</p>
            {
                <div className={styles.dropdown}>
                    <CustomDropdown
                        handleChange={handlerFunction}
                        name={qa.questionText}
                        label={qa.answer.label}
                        options={qa.answer.options}
                        defaultValue={defaultValue}
                    />
                </div>
            }
        </div>
    )
};

export const getPractitionerRoleQuestion = (qa, handlerFunction, state, index) => {
    return (
        qa.answer.type === AnswerTypes.Inputbox &&
        (
            <>
                <p className={styles.question}>{qa.questionText}</p>
                <input
                    className={styles.longTextInput}
                    placeholder="Ex: 4-H Educator"
                    type="text"
                    value={state[qa.answer.key].option}
                    onChange={handlerFunction}
                />
            </>
        )
    )
};

export const getTextboxQuestion = (qa, handlerFunction, state, index) => {
    return (
        qa.answer.type === AnswerTypes.Textbox &&
        (
            <>
                <p className={styles.question}>{qa.questionText}</p>
                <textarea
                    key={index}
                    className={styles.answer}
                    placeholder={"Type your answer here"}
                    value={state[qa.answer.key]}
                    onChange={handlerFunction(qa.answer.key)}
                >
                </textarea>
            </>
        )
    )
};

export const getCheckboxQuestion = (qa, handlerFunction, state) => {
    return (
        qa.answer.type === AnswerTypes.Checkbox &&
        <>
            <p className={styles.question}>{qa.questionText}</p>
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
                                classes={{ label: styles.qaOptionText}}
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

export const getRadiobuttonQuestion = (qa, handlerFunction, state) => {
    return (
        qa.answer.type === AnswerTypes.Radiobutton &&
        <>
            <p className={styles.question}>{qa.questionText}</p>
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
                                classes={{ label: styles.qaOptionText}}
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
