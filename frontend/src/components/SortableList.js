import React from 'react';
import SearchResult from './SearchResult';

const stringCompareAsc = stringType => (a, b) => {
    if (stringType === "name" && a.type === "partner")  {
        const nameA = `${a.first_name} ${a.last_name}`;
        const nameB = `${b.first_name} ${b.last_name}`;
        return nameA.localeCompare(nameB, "en");
    } else if (stringType === "name" && a.type === "project") {
        const nameA = `${a.owner.first_name} ${a.owner.last_name}`;
        const nameB = `${b.owner.first_name} ${b.owner.last_name}`;
        return nameA.localeCompare(nameB, "en");
    } else if (stringType === "location" && a.type === "partner") {
        return a.location.localeCompare(b.location, "en");
    } else if (stringType === "location" && a.type === "project") {
        return a.owner.location.localeCompare(b.owner.location, "en");
    }
};

const stringCompareDesc = stringType => (a, b) => {
    return -stringCompareAsc(stringType)(a, b);
};

const numProjectsCompareAsc = (a, b) => {
    return a.numProjects - b.numProjects;
};

const numProjectsCompareDesc = (a, b) => {
    return b.numProjects - a.numProjects;
};

const dateCompareAsc = (a, b) => {
    let dateA, dateB;
    if (a.type === "partner") {
        dateA = new Date(a.date_joined);
        dateB = new Date(b.date_joined);
    } else if (a.type === "project") {
        dateA = new Date(a.datePosted);
        dateB = new Date(b.datePosted);
    }

    if (dateA < dateB) {
        return - 1;
    } else if (dateA > dateB) {
        return 1;
    } else {
        return 0;
    }
};

const dateCompareDesc = (a, b) => {
    return -dateCompareAsc(a, b);
};

const statusCompareAsc = (a, b) => {
    const statuses = ["Not Started", "In Progress", "Completed"];

    return statuses.indexOf(a.status) - statuses.indexOf(b.status);
};

const statusCompareDesc = (a, b) => {
    return - statusCompareAsc(a, b);
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
        value: "date-asc",
        text: "Date Joined ↑"
    },
    {
        value: "date-desc",
        text: "Date Joined ↓"
    }
];

export const SortableList = ({ sortBy, list }) => {
    let sortList;

    switch (sortBy) {
        case "location-asc":
            sortList = lst => lst.sort(stringCompareAsc("location"));
            break;
        case "location-desc":
            sortList = lst => lst.sort(stringCompareDesc("location"));
            break;
        case "projects-asc":
            sortList = lst => lst.sort(numProjectsCompareAsc);
            break;
        case "projects-desc":
            sortList = lst => lst.sort(numProjectsCompareDesc);
            break;
        case "name-asc":
            sortList = lst => lst.sort(stringCompareAsc("name"));
            break;
        case "name-desc":
            sortList = lst => lst.sort(stringCompareDesc("name"));
            break;
        case "date-asc":
            sortList = lst => lst.sort(dateCompareAsc);
            break;
        case "date-desc":
            sortList = lst => lst.sort(dateCompareDesc);
            break;
        case "status-asc":
            sortList = lst => lst.sort(statusCompareAsc);
            break;
        case "status-desc":
            sortList = lst => lst.sort(statusCompareDesc);
            break;
        default:
            sortList = lst => lst.sort((a, b) => a.pk - b.pk);
            break;
    }

    return sortList(list).map(elt => <SearchResult key={elt.pk} {...elt} />)
};
