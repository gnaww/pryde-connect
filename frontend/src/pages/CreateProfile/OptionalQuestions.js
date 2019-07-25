import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import { getTextboxQuestion } from '../../components/QAComponents';
import { optionalQAForm } from './FormContent';

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
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
        }
    }

    setTextboxValue = key => event => {
        let val = event.target.value;
        this.setState({
            [key]: val
        });
    }

    render() {
        return (
            <div className={styles.form}>
                {
                    optionalQAForm.map((qa, idx) => {
                        return (
                            <div key={idx}>
                                {getTextboxQuestion(qa, this.setTextboxValue, this.state, idx)}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default OptionalQuestions;
