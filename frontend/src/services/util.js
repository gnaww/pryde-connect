import { getCheckedValuesArray } from '../components/QAComponents';

export const formatArray = arr => {
    return (
        arr.filter(elt => elt.checked)
            .map(elt => elt.other ? elt.other.replace(/,/g, "") : elt.value)
    );
};

export const formatPreferencesArray = (userPreferences, projectPreferences, userPreferenceName, projectPreferenceName) => {
    let preferences = [];

    for (let i = 0; i < userPreferences.length; i++) {
        if (userPreferences[i].checked) {
            preferences.push({
                type: "2",
                name: userPreferenceName,
                value: userPreferences[i].other ? userPreferences[i].other.replace(/,/g, "") : userPreferences[i].value
            })
        }
        if (projectPreferences[i].checked) {
            preferences.push({
                type: "1",
                name: projectPreferenceName,
                value: projectPreferences[i].other ? projectPreferences[i].other.replace(/,/g, "") : projectPreferences[i].value
            })
        }
    }

    return preferences;
};

export const convertArray = (savedArray, options) => {
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

export const convertResearchTopics = (savedResearchTopics, researchTopics) => {
    let convertedArray = getCheckedValuesArray(researchTopics);
    savedResearchTopics.forEach(researchTopic => {
        const idx = researchTopics.findIndex(option => {
            return option.label === researchTopic
        });

        // element is one of the option choices, so should be checked
        if (idx !== -1) {
            convertedArray[idx].checked = true;
        } else {
            // element is not one of the option choices, so it is the Other: checkbox
            convertedArray[convertedArray.length - 1].checked = true;
            convertedArray[convertedArray.length - 1].other = researchTopic;
        }
    });
    return convertedArray;
};
