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

const EditProject = ({ location }) => {
    let editProjectData = Object.assign({}, location.state.projectData);
    delete editProjectData.invalidProject;
    delete editProjectData.canEdit;
    delete editProjectData.canDelete;
    delete editProjectData.errorDeleting;
    delete editProjectData.owner;
    delete editProjectData.datePosted;
    editProjectData.status = editProjectData.status.toString();
    editProjectData.researchTopics = convertArray(editProjectData.researchTopics, PractitionerInformation.ResearchTopics);
    editProjectData.ageRanges = convertArray(editProjectData.ageRanges, PractitionerInformation.AgeGroups);
    editProjectData.deliveryModes = convertArray(editProjectData.deliveryModes, PractitionerInformation.ProgramDeliveryModes);

    // TODO: convert saved additional files to fit into CreateProject
    // editProjectData.additionalFiles = data.additionalFiles;
    // TODO: convert saved collaborators to fit into CreateProject
    // editProjectData.collaborators = data.collaborators;
    return <CreateProject editProjectData={editProjectData} editing={true} />
};

export default EditProject;
