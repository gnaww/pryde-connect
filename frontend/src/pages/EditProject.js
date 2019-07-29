import React from 'react';
import CreateProject from './CreateProject/CreateProject';
import { PractitionerInformation } from './CreateProfile/FormContent';
import { getCheckedValuesArray } from '../components/QAComponents';

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

const EditProject = ({ location }) => {
    let editProjectData = Object.assign({}, location.state.projectData);
    delete editProjectData.invalidProject;
    delete editProjectData.canEdit;
    delete editProjectData.canDelete;
    delete editProjectData.errorDeleting;
    delete editProjectData.owner;
    delete editProjectData.datePosted;
    editProjectData.name = formatInputbox(editProjectData.name);
    editProjectData.alternateLocation = formatInputbox(editProjectData.alternateLocation);

    // TODO: convert saved collaborators to fit into CreateProject, placeholder for now
    editProjectData.collaborators = {
        option: "",
        other: ""
    };

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
    editProjectData.status = STATUSES.indexOf(editProjectData.status) + 1;
    editProjectData.researchTopics = convertArray(editProjectData.researchTopics, PractitionerInformation.ResearchTopics);
    editProjectData.ageRanges = convertArray(editProjectData.ageRanges, PractitionerInformation.AgeGroups);
    editProjectData.deliveryModes = convertArray(editProjectData.deliveryModes, PractitionerInformation.ProgramDeliveryModes);
    // TODO: convert saved additional files to fit into CreateProject
    // editProjectData.additionalFiles = data.additionalFiles;
    return <CreateProject editProjectData={editProjectData} editing={true} />
};

export default EditProject;
