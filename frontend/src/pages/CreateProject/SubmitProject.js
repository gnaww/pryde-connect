import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import { getInputboxQuestion, getCheckboxQuestion, getCheckedValuesArray, getDropDownQuestion, getMultipleAnswerQuestion } from '../../components/QAComponents';
import { PractitionerInformation } from '../CreateProfile/FormContent';
import { projectQAForm, additionalQAForm } from './FormContent';

class SubmitProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            collaborators: "", //JSON
            status: null,
            summary: "",
            timeline: "",
            commitmentLength: "",
            incentivesForProgram: "",
            incentivesForParticipants: "",
            deliveryModels: getCheckedValuesArray(PractitionerInformation.ProgramDeliveryModels),

            researchTopics: getCheckedValuesArray(PractitionerInformation.ResearchTopics),
            ageRanges: getCheckedValuesArray(PractitionerInformation.AgeGroups),
            additionalInformation: "",
            website: "",




            // additionalInformation = models.TextField()
            // additionalFiles = ArrayField(models.FileField(upload_to='uploads/'), default=None)
            // type = models.CharField(max_length=100, default='project')
        }
    }

    getQAComponent = (qa, index) => {
        return (
            <li className={styles.numberedList} key={index}>
                {getDropDownQuestion(qa, e => console.log(e))}
                {getInputboxQuestion(qa, e => console.log(e), this, index)}
                {getCheckboxQuestion(qa, e => console.log(e), this.state)}
                {getMultipleAnswerQuestion(qa, e => console.log(e), this)}
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