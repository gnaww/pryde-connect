export const ROLE_TYPE = {
    practitioner: "Practitioner",
    researcher: "Researcher"
};

export const AnswerTypes = {
    Dropdown: "dropdown",
    Checkbox: "checkbox",
    Textbox: "textbox",
    Radiobutton: "radiobutton",
    Inputbox: "inputbox"
};

export const PractitionerInformation = {
    PractitionerType: [
        "4-H Educator",
        "Other CCE Role",
        "Practice Focused Role",
        "Other: "
    ],
    RoleDescriptions: [
        "Lead youth programs",
        "Design youth programs",
        "Evaluate youth programs",
        "Write grants",
        "Train volunteers",
        "Other: "
    ],
    AgeGroups: [
        "Infants (0-1 year)",
        "Toddlers (1-2 years)",
        "Toddlers (2-3 years)",
        "Preschoolers (3-5 years)",
        "Middle Childhood (6-8 years)",
        "Middle Childhood (9-11 years)",
        "Young Teens (12-14 years)",
        "Teenagers (15-17 years)"
    ],
    ProgramDeliveryModels: [
        "Afterschool programs",
        "Camps",
        "Clubs",
        "Other: "
    ],
    ResearchTopics: [
        "Positive Youth Development",
        "Self and Identity",
        "Diversity, Equity, and Inclusion",
        "Education and Learning",
        "STEM education",
        "Health",
        "Civic Engagement",
        "Other: "
    ]
};

export const practitionerQAForm = [
    {
        questionText:
            "Are you located within the Cornell Cooperative Extension?*",
        answer: {
            type: AnswerTypes.Dropdown,
            label: "SELECT",
            options: [
                {
                    value: true,
                    text: "YES"
                },
                {
                    value: false,
                    text: "NO"
                }
            ]
        },
        extra: {
            questionText: "Where are you located in CCE?*",
            answer: {
                type: AnswerTypes.Dropdown,
                label: "COUNTIES",
                options: [
                    {
                        value: "Albany County, NY",
                        text: "Albany"
                    },
                    {
                        value: "Allegany County, NY",
                        text: "Allegany"
                    },
                    {
                        value: "Bronx County, NY",
                        text: "Bronx"
                    },
                    {
                        value: "Broome County, NY",
                        text: "Broome"
                    },
                    {
                        value: "Cattaraugus County, NY",
                        text: "Cattaraugus"
                    },
                    {
                        value: "Cayuga County, NY",
                        text: "Cayuga"
                    },
                    {
                        value: "Chautauqua County, NY",
                        text: "Chautauqua"
                    },
                    {
                        value: "Chemung County, NY",
                        text: "Chemung"
                    },
                    {
                        value: "Chenango County, NY",
                        text: "Chenango"
                    },
                    {
                        value: "Clinton County, NY",
                        text: "Clinton"
                    },
                    {
                        value: "Columbia County, NY",
                        text: "Columbia"
                    },
                    {
                        value: "Cortland County, NY",
                        text: "Cortland"
                    },
                    {
                        value: "Delaware County, NY",
                        text: "Delaware"
                    },
                    {
                        value: "Dutchess County, NY",
                        text: "Dutchess"
                    },
                    {
                        value: "Erie County, NY",
                        text: "Erie"
                    },
                    {
                        value: "Essex County, NY",
                        text: "Essex"
                    },
                    {
                        value: "Franklin County, NY",
                        text: "Franklin"
                    },
                    {
                        value: "Fulton County, NY",
                        text: "Fulton"
                    },
                    {
                        value: "Genesee County, NY",
                        text: "Genesee"
                    },
                    {
                        value: "Greene County, NY",
                        text: "Greene"
                    },
                    {
                        value: "Hamilton County, NY",
                        text: "Hamilton"
                    },
                    {
                        value: "Herkimer County, NY",
                        text: "Herkimer"
                    },
                    {
                        value: "Jefferson County, NY",
                        text: "Jefferson"
                    },
                    {
                        value: "Kings (Brooklyn) County, NY",
                        text: "Kings (Brooklyn)"
                    },
                    {
                        value: "Lewis County, NY",
                        text: "Lewis"
                    },
                    {
                        value: "Livingston County, NY",
                        text: "Livingston"
                    },
                    {
                        value: "Madison County, NY",
                        text: "Madison"
                    },
                    {
                        value: "Monroe County, NY",
                        text: "Monroe"
                    },
                    {
                        value: "Montgomery County, NY",
                        text: "Montgomery"
                    },
                    {
                        value: "Nassau County, NY",
                        text: "Nassau"
                    },
                    {
                        value: "New York (Manhattan) County, NY",
                        text: "New York (Manhattan)"
                    },
                    {
                        value: "Niagara County, NY",
                        text: "Niagara"
                    },
                    {
                        value: "Oneida County, NY",
                        text: "Oneida"
                    },
                    {
                        value: "Onondaga County, NY",
                        text: "Onondaga"
                    },
                    {
                        value: "Ontario County, NY",
                        text: "Ontario"
                    },
                    {
                        value: "Orange County, NY",
                        text: "Orange"
                    },
                    {
                        value: "Orleans County, NY",
                        text: "Orleans"
                    },
                    {
                        value: "Oswego County, NY",
                        text: "Oswego"
                    },
                    {
                        value: "Otsego County, NY",
                        text: "Otsego"
                    },
                    {
                        value: "Putnam County, NY",
                        text: "Putnam"
                    },
                    {
                        value: "Queens County, NY",
                        text: "Queens"
                    },
                    {
                        value: "Rensselaer County, NY",
                        text: "Rensselaer"
                    },
                    {
                        value: "Richmond (Staten Island) County, NY",
                        text: "Richmond (Staten Island)"
                    },
                    {
                        value: "Rockland County, NY",
                        text: "Rockland"
                    },
                    {
                        value: "Saint Lawrence County, NY",
                        text: "Saint Lawrence"
                    },
                    {
                        value: "Saratoga County, NY",
                        text: "Saratoga"
                    },
                    {
                        value: "Schenectady County, NY",
                        text: "Schenectady"
                    },
                    {
                        value: "Schoharie County, NY",
                        text: "Schoharie"
                    },
                    {
                        value: "Schuyler County, NY",
                        text: "Schuyler"
                    },
                    {
                        value: "Seneca County, NY",
                        text: "Seneca"
                    },
                    {
                        value: "Steuben County, NY",
                        text: "Steuben"
                    },
                    {
                        value: "Suffolk County, NY",
                        text: "Suffolk"
                    },
                    {
                        value: "Sullivan County, NY",
                        text: "Sullivan"
                    },
                    {
                        value: "Tioga County, NY",
                        text: "Tioga"
                    },
                    {
                        value: "Tompkins County, NY",
                        text: "Tompkins"
                    },
                    {
                        value: "Ulster County, NY",
                        text: "Ulster"
                    },
                    {
                        value: "Warren County, NY",
                        text: "Warren"
                    },
                    {
                        value: "Washington County, NY",
                        text: "Washington"
                    },
                    {
                        value: "Wayne County, NY",
                        text: "Wayne"
                    },
                    {
                        value: "Westchester County, NY",
                        text: "Westchester"
                    },
                    {
                        value: "Wyoming County, NY",
                        text: "Wyoming"
                    },
                    {
                        value: "Yates County, NY",
                        text: "Yates"
                    }
                ]
            }
        },
        id: 0 //put an id here for questions that have special properties
    },
    {
        questionText: "Please enter your job or position title.*",
        answer: {
            type: AnswerTypes.Inputbox,
            key: "displayRole"
        }
    },
    {
        questionText:
            "Which of the following describe your roles?* (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.RoleDescriptions,
            key: "roles"
        }
    },
    {
        questionText: "What age youth do you work with?* (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.AgeGroups,
            key: "ageRanges"
        }
    },
    {
        questionText:
            "What types of program delivery models do you use?* (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options:
                PractitionerInformation.ProgramDeliveryModels,
            key: "deliveryModes"
        }
    },
    {
        questionText:
            "What research topics are you interested in?* (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.ResearchTopics,
            key: "researchInterests"
        }
    }
];

export const ResearcherInformation = {
    ResearcherType: [
        "Faculty",
        "Academic Staff",
        "Postdoctoral Fellow",
        "Graduate Student",
        "Undergraduate Student",
        "Other: "
    ],
    ResearchTopics: [
        "Positive Youth Development",
        "Self and Identity",
        "Diversity, Equity, and Inclusion",
        "Education and Learning",
        "STEM education",
        "Health",
        "Civic Engagement",
        "Other: "
    ]
};

export const researcherQAForm = [
    {
        questionText: "Are you located at Cornell?*",
        answer: {
            type: AnswerTypes.Dropdown,
            label: "SELECT",
            options: [
                {
                    value: true,
                    text: "YES"
                },
                {
                    value: false,
                    text: "NO"
                }
            ]
        },
        id: 0, //put an id here for questions that have special properties
    },
    {
        questionText: "Which of the following best describes you?*",
        answer: {
            type: AnswerTypes.Radiobutton,
            options: ResearcherInformation.ResearcherType,
            key: "displayRole"
        }
    },
    {
        questionText: "What research topics do you study?* (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: ResearcherInformation.ResearchTopics,
            key: "researchInterests"
        }
    },
    {
        questionText: "In 1-2 sentences, please describe your research interests.*",
        answer: {
            type: AnswerTypes.Textbox,
            key: "researchDescription"
        }
    }
];

export const optionalQAForm = [
    {
        questionText: "What research needs do you see in your programs? (optional)",
        answer: {
            type: AnswerTypes.Textbox,
            key: "researchNeeds"
        }
    },
    {
        questionText: "What evaluation needs do you see in your programs? (optional)",
        answer: {
            type: AnswerTypes.Textbox,
            key: "evaluationNeeds"
        }
    }
];
