import React, { Component } from 'react';
import CreateProject from './CreateProject/CreateProject';
import { PractitionerInformation } from './CreateProfile/FormContent';
import { getCheckedValuesArray } from '../components/QAComponents';
import api from '../services/api';
import { popState } from '../services/localStorage';

const convertArray = (savedArray, options) => {
    let convertedArray = getCheckedValuesArray(options);
    savedArray.forEach(elt => {
        const idx = options.indexOf(elt);

        // element is one of the option choices, so should be checked
        if (idx !== -1) {
            convertedArray[idx].checked = true;
        } else {
            // element is not one of the option choices, so it is the Other: checkbox
            convertedArray[convertedArray.length - 1].checked = true;
            convertedArray[convertedArray.length - 1].other = elt;
        }
    });
    return convertedArray;
};

const formatInputbox = value => ({
    option: value,
    other: ""
});

const STATUSES = ["Completed", "In Progress", "Not Started"];

class EditProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
        let editProjectData = Object.assign({}, popState("projectData"));
        delete editProjectData.invalidProject;
        delete editProjectData.editPermission;
        delete editProjectData.deletePermission;
        delete editProjectData.isCollaborator;
        delete editProjectData.showProjectOnProfile;
        delete editProjectData.owner;
        delete editProjectData.datePosted;
        editProjectData.name = formatInputbox(editProjectData.name);
        editProjectData.alternateLocation = formatInputbox(editProjectData.alternateLocation);

        try {
            let collaborators = await api.getProjectCollaborators(editProjectData.id)
            editProjectData.collaborators = collaborators.map(elt => ({ ...elt }));
            editProjectData.initialCollaborators = collaborators.map(elt => ({ ...elt }));
        } catch (err) {
            console.log(err);
            console.log(err.response.data);
            editProjectData.collaborators = [];
            editProjectData.initialCollaborators = [];
            alert("Something went wrong while retrieving existing project collaborators. Please refresh the page.")
        }

        editProjectData.timeline = formatInputbox(editProjectData.timeline);
        editProjectData.commitmentLength = formatInputbox(editProjectData.commitmentLength);
        editProjectData.incentives = formatInputbox(editProjectData.incentives);
        if (Object.entries(editProjectData.alternateContact).length === 0) {
            editProjectData.alternateContact = {
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                website: ""
            };
        }
        editProjectData.alternateContact.phone = editProjectData.alternateContact.phone ? editProjectData.alternateContact.phone.slice(2) : "";
        editProjectData.alternateContact.website = editProjectData.alternateContact.website ? editProjectData.alternateContact.website.replace(/(^\w+:|^)\/\//, '') : "";
        editProjectData.status = STATUSES.indexOf(editProjectData.status) + 1;
        editProjectData.researchTopics = convertArray(editProjectData.researchTopics, PractitionerInformation.ResearchTopics);
        editProjectData.ageRanges = convertArray(editProjectData.ageRanges, PractitionerInformation.AgeGroups);
        editProjectData.deliveryModes = convertArray(editProjectData.deliveryModes, PractitionerInformation.ProgramDeliveryModes);
        editProjectData.additionalFiles = editProjectData.additionalFiles.map(file => {
            return [file.pk, file.file_name]
        });
        this.setState({ ...editProjectData });
    }

    render() {
        if (Object.entries(this.state).length === 0) {
            return <CreateProject editProjectData={null} editing={true} location={this.props.location} />
        } else {
            return <CreateProject editProjectData={this.state} editing={true} location={this.props.location} />
        }
    }
}

export default EditProject;
