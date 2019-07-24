import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import { getInputboxQuestion, getCheckboxQuestion, getCheckedValuesArray, getDropDownQuestion, getMultipleAnswerQuestion } from '../../components/QAComponents';
import { PractitionerInformation } from '../CreateProfile/FormContent';
import { projectQAForm, KeyTypes, pairs } from './FormContent';

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
            incentivesForProgram: "", // part of incentives
            incentivesForParticipants: "", // part of incentives
            additionalInformation: "",
            additionalFiles: [],
            collaborators: "",
            website: "" //not in model
        };
        this.errors = projectQAForm.map(_q => { return false });
    }

    componentDidUpdate(_prevProps, _prevState) {
        function nonEmptyString(key, state) {
            return state[key] !== "";
        }

        function nonEmptyArray(key, state) {
            var checkedAtLeastOne = state[key].filter(o => o.checked).length > 0;
            var hasOther = state[key].filter(o => o.value === "Other: ");
            var checkedAndAnswerOther = hasOther[0] ? hasOther[0].checked ? hasOther[0].other !== "" : true : true;
            return checkedAtLeastOne && checkedAndAnswerOther;
        }

        function nonEmptyEnum(key, state) {
            return state[key] !== null;
        }

        function hasError(pair, state) {
            if (pair.type === KeyTypes.String) {
                if (pair.key === "collaborators") {
                    return false;
                }
                else {
                    return !nonEmptyString(pair.key, state);
                }
            }
            else if (pair.type === KeyTypes.Enum) {
                return !nonEmptyEnum(pair.key, state);
            }
            else if (pair.type === KeyTypes.Array) {
                return !nonEmptyArray(pair.key, state);
            }
        }

        if (this.props.clickedNext) {
            for (var i = 0; i < pairs.length; i++) {
                this.errors[i] = hasError(pairs[i], this.state);
            }
            var error = this.errors.filter(e => e === true).length;
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
        if (key === null || isFinite(key)) {
            this.setFileUploads(key, event);
        }
        else {
            this.setTextbox(key)(event);
        }
    }

    getQAComponent = (qa, index) => {
        return (
            <li className={styles.numberedList} key={index}>
                {getDropDownQuestion(qa, this.setProjectStatus, "", this.errors[index])}
                {getInputboxQuestion(qa, this.setTextbox, this, this.errors[index])}
                {getCheckboxQuestion(qa, this.setValues, this.state, this.errors[index])}
                {getMultipleAnswerQuestion(qa, this.setMultiAnswerResponse, this.state)}
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