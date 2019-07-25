import React from 'react';
import CreateProject from './CreateProject/CreateProject';

const EditProject = ({ location }) => {
    console.log(location.state.projectData);
    let editProjectData = Object.assign({}, location.state.projectData);
    delete editProjectData.invalidProject;
    delete editProjectData.canEdit;
    delete editProjectData.canDelete;
    delete editProjectData.errorDeleting;
    // TODO: reverse below transformation to fit into CreateProject.js
    // let project = Object.assign({}, data);
    // const formatArray = arr => {
    //     return (
    //         arr.filter(elt => elt.checked)
    //             .map(elt => elt.other ? elt.other : elt.value)
    //     );
    // };
    // project.status = parseInt(data.status);
    // project.researchTopics = formatArray(data.researchTopics);
    // project.ageRanges = formatArray(data.ageRanges);
    // project.deliveryModes = formatArray(data.deliveryModes);

    // // TODO: add additional files to projects
    // // project.additionalFiles = data.additionalFiles;
    // project.additionalFiles = [];
    // // TODO: add collaborators to projects
    // // project.collaborators = data.collaborators;
    // project.collaborators = [];
    return <CreateProject editProjectData={editProjectData} editing={true} />
};

export default EditProject;
