import { getCheckedValuesArray } from '../components/QAComponents';

export const formatArray = arr => {
    return (
        arr.filter(elt => elt.checked)
            .map(elt => elt.other.replace(/,/g, "") ? elt.other : elt.value)
    );
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
