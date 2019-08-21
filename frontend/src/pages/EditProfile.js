import React from 'react';
import CreateProfile from './CreateProfile/CreateProfile';
import { PractitionerInformation, ResearcherInformation } from './CreateProfile/FormContent';
import { popState } from '../services/localStorage';
import { convertArray, convertResearchTopics } from '../services/util';

const EditProfile = () => {
    try {
        let userData = popState("userData");
        let editProfileData = [];

        // Basic Info
        let basicInfo = {};
        basicInfo.email = userData.email;
        basicInfo.first_name = userData.first_name;
        basicInfo.last_name = userData.last_name;
        basicInfo.password = "";
        basicInfo.confirmPassword = "";
        basicInfo.phone = userData.phone ? userData.phone.slice(2) : "";
        basicInfo.website = userData.website ? userData.website.replace(/(^\w+:|^)\/\//, '') : "";

        // Role Selection
        let roleSelection = {};
        roleSelection.role = userData.role;
        roleSelection.clicked = userData.role === "Researcher" ? 0 : 1;

        // Practitioner / Researcher Questions
        let questions = {};
        questions.locatedAtCCE = userData.locatedAtCCE;
        questions.locatedAtCornell = userData.locatedAtCornell;
        if (userData.role === "Researcher") {
            if (userData.locatedAtCornell) {
                questions.metaLocation = {
                    address: "",
                    college: userData.affiliation.split(" at ")[1],
                    department: userData.affiliation.split(" at ")[0],
                    organization: ""
                }
            } else {
                questions.metaLocation = {
                    address: userData.location,
                    college: "",
                    department: "",
                    organization: userData.affiliation
                }
            }
            questions.affiliation = userData.affiliation;
            questions.location = userData.location;
        } else {
            questions.affiliation = userData.affiliation;
            questions.location = userData.location;
        }
        if (roleSelection.role === "Practitioner") {
            questions.displayRole = { option: userData.displayRole, other: "" };
        } else {
            if (ResearcherInformation.ResearcherType.includes(userData.displayRole)) {
                questions.displayRole = { option: userData.displayRole, other: "" };
            } else {
                questions.displayRole = { option: "Other: ", other: userData.displayRole };
            }
        }
        questions.researchDescription = userData.researchDescription;
        questions.ageRanges = convertArray(userData.ageRanges, PractitionerInformation.AgeGroups);
        questions.deliveryModes = convertArray(userData.deliveryModes, PractitionerInformation.ProgramDeliveryModes);
        questions.researchInterests = convertResearchTopics(userData.researchInterests, PractitionerInformation.ResearchTopics);
        questions.roles = convertArray(userData.roles, PractitionerInformation.RoleDescriptions);

        // Optional Questions
        let optional = {}
        optional.researchNeeds = userData.researchNeeds;
        optional.evaluationNeeds = userData.evaluationNeeds;

        editProfileData.push(basicInfo);
        editProfileData.push(roleSelection);
        editProfileData.push(questions);
        editProfileData.push(optional);
        editProfileData.push(null);

        return <CreateProfile editProfileData={editProfileData} editing={true} />
    } catch (err) {
        console.log(err);
        alert("Something went wrong while loading the edit profile page. Please close this tab and try again.");
        return <CreateProfile editing={true} />
    }
};

export default EditProfile;
