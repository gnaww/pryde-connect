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

export const sortProjectsOptions = [
    {
        value: "",
        text: "None"
    },
    {
        value: "status-asc",
        text: "Status ↑"
    },
    {
        value: "status-desc",
        text: "Status ↓"
    },
    {
        value: "location-asc",
        text: "Location ↑"
    },
    {
        value: "location-desc",
        text: "Location ↓"
    },
    {
        value: "name-asc",
        text: "Owner ↑"
    },
    {
        value: "name-desc",
        text: "Owner ↓"
    },
    {
        value: "date-asc",
        text: "Date Posted ↑"
    },
    {
        value: "date-desc",
        text: "Date Posted ↓"
    }
];

export const sortUsersOptions = [
    {
        value: "",
        text: "None"
    },
    {
        value: "location-asc",
        text: "Location ↑"
    },
    {
        value: "location-desc",
        text: "Location ↓"
    },
    {
        value: "projects-asc",
        text: "# Projects ↑"
    },
    {
        value: "projects-desc",
        text: "# Projects ↓"
    },
    {
        value: "name-asc",
        text: "Name ↑"
    },
    {
        value: "name-desc",
        text: "Name ↓"
    },
    {
        value: "joined-asc",
        text: "Date Joined ↑"
    },
    {
        value: "joined-desc",
        text: "Date Joined ↓"
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

    return sortList(list).map(elt => <SearchResult key={elt.pk} {...elt} />)
};
