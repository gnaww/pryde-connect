import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import { getTextboxQuestion } from './QAComponents';
import { AnswerTypes } from './Constants';

const questions = [
    {
        questionText: "What research needs do you see in your programs?",
        answer: {
            type: AnswerTypes.Textbox,
            key: "researchNeeds"
        }
    },
    {
        questionText: "What evaluation needs do you see in your programs?",
        answer: {
            type: AnswerTypes.Textbox,
            key: "evaluationNeeds"
        }
    }
];

class OptionalQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            researchNeeds: "",
            evaluationNeeds: ""
        };
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.props.clickedNext) {
            this.props.onSubmitData(this.state, false);
        }
        return null;
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
        }
    }

    setTextboxValue = key => event => {
        var val = event.target.value;
        this.setState({
            [key]: val
        });
    }

    render() {
        return (
            <div className={styles.form}>
                {
                    questions.map((qa) => {
                        return getTextboxQuestion(qa, this.setTextboxValue, this.state)
                    })
                }
            </div>
        )
    }
}

export default OptionalQuestions;