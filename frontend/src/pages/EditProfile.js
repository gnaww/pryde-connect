import React from 'react';
import CreateProfile from './CreateProfile/CreateProfile';

const EditProfile = ({ location }) => {
    console.log(location.state.userData);
    let editProfileData = location.state.userData;
    // TODO: reverse below transformations to fit into CreateProfile.js
    // let user = {};
    // const formatArray = arr => {
    //     return (
    //         arr.filter(elt => elt.checked)
    //             .map(elt => elt.other ? elt.other : elt.value)
    //     );
    // };

    // // Basic Info
    // user.email = data[0].email;
    // user.first_name = data[0].first_name;
    // user.last_name = data[0].last_name;
    // user.password1 = data[0].password;
    // user.password2 = data[0].confirmPassword;
    // user.phone = data[0].phone ? phone(data[0].phone)[0] : "";
    // user.website = data[0].website ? normalizeUrl(data[0].website) : "";

    // // Role Selection
    // user.role = data[1].role === "Practitioner" ? 1 : 2;

    // // Practitioner / Researcher Questions
    // user.affiliation = data[2].affiliation;
    // user.displayRole = data[2].displayRole.other ? data[2].displayRole.other : data[2].displayRole.option;
    // user.locatedAtCCE = data[2].locatedAtCCE === undefined ? false : data[2].locatedAtCCE;
    // user.locatedAtCornell = data[2].locatedAtCornell === undefined ? false : data[2].locatedAtCornell;
    // user.location = data[2].location;
    // user.researchDescription = data[2].researchDescription ? data[2].researchDescription : "";
    // user.ageRanges = data[2].ageRanges ? formatArray(data[2].ageRanges) : [];
    // user.deliveryModes = data[2].deliveryModes ? formatArray(data[2].deliveryModes) : [];
    // user.researchInterests = data[2].researchInterests ? formatArray(data[2].researchInterests) : [];
    // user.roles = data[2].roles ? formatArray(data[2].roles) : [];

    // // Optional Questions
    // user.researchNeeds = data[3] === null ? "" : data[3].researchNeeds;
    // user.evaluationNeeds = data[3] === null ? "" : data[3].evaluationNeeds;

    // // TODO: add profile picture to users
    // // user.profilePicture = data[4].profilePicture;

    return <CreateProfile editProfileData={editProfileData} editing={true} />
};

export default EditProfile;
