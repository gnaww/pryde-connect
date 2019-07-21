import React from 'react';
import SearchResult from './SearchResult';

const nameCompareAsc = (a, b) => {
    if (a.type === "project" ) {
        return a.name.localeCompare(b.name, 'en');
    } else {
        const nameA = `${a.first_name} ${a.last_name}`;
        const nameB = `${b.first_name} ${b.last_name}`;
        return nameA.localeCompare(nameB, 'en');
    }
};

const nameCompareDesc = (a, b) => {
    return -nameCompareAsc(a, b);
};

export const sortOptions = [
    {
        value: "",
        text: "None"
    },
    {
        value: "name-asc",
        text: "Name ↑"
    },
    {
        value: "name-desc",
        text: "Name ↓"
    }
];

export const SortableList = ({ sortBy, list }) => {
    let sortList;

    switch (sortBy) {
        case 'name-asc':
            sortList = lst => lst.sort(nameCompareAsc);
            break;
        case 'name-desc':
            sortList = lst => lst.sort(nameCompareDesc);
            break;
        default:
            sortList = lst => lst.sort((a, b) => a.pk - b.pk);
            break;
    }

    return sortList(list).map((elt, idx) => <SearchResult key={idx} {...elt} />)
};
