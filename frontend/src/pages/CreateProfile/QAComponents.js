import React from 'react';
import styles from '../../styles/CreateProfile.module.css';
import CustomDropdown from '../../components/CustomDropdown';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import checkboxStyles from '../../styles/FilterCategory.module.css';
import { AnswerTypes } from './Constants';

export const getCheckedValuesArray = values => {
    return values.map(v => { return { value: v, checked: false, other: "" } })
}

export const getDropDownQuestion = (qa, handlerFunction) => {
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
                    />
                </div>
            }
        </div>
    )
}

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
}

export const getCheckboxQuestion = (qa, handlerFunction, state) => {
    return (
        qa.answer.type === AnswerTypes.Checkbox &&
        <>
            <p className={styles.question}>{qa.questionText}</p>
            {
                qa.answer.options.map((option, index) => {
                    return (
                        <div key={index}>
                            <Checkbox
                                color="default"
                                className={checkboxStyles.checkbox}
                                name={qa.questionText}
                                onChange={_e => handlerFunction(qa.answer.key, index, null)}
                                checked={state[qa.answer.key][index].checked}
                                value={option}
                                disableRipple
                            />
                            <label className={styles.qaOptionText}>{option}</label>
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
}

export const getRadiobuttonQuestion = (qa, handlerFunction, state) => {
    return (
        qa.answer.type === AnswerTypes.Radiobutton &&
        <>
            <p className={styles.question}>{qa.questionText}</p>
            {
                qa.answer.options.map((option, index) => {
                    return (
                        <div key={index}>
                            <Radio
                                color="default"
                                className={checkboxStyles.checkbox}
                                name={qa.questionText}
                                onChange={_e => handlerFunction(qa.answer.key, option, null)}
                                checked={state[qa.answer.key].option === option}
                                value={option}
                                disableRipple
                            />
                            <label className={styles.qaOptionText}>{option}</label>
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
}