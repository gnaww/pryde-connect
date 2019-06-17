import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';

const questions = [
    {
        text: "What research needs do you see in your programs?"
    },
    {
        text: "What evaluation needs do you see in your programs?"
    }
];

class OptionalQuestions extends Component {
    render() {
        return (
            <div className={styles.form}>
                {
                    questions.map((question, index) => {
                        return (
                            <div className={styles.QAitem}>
                                <h2 className={styles.question}>{question.text}</h2>
                                <textarea className={styles.answer} placeholder="Type your answer here"></textarea>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default OptionalQuestions;