export const AnswerTypes = {
    Dropdown: "dropdown",
    Checkbox: "checkbox",
    Textbox: "textbox",
    Radiobutton: "radiobutton"
}

export const PractitionerInformation = {
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
    YouthProgramTypes: [
        "Animal Science",
        "Civic Engagement",
        "Cooking",
        "STEM",
        "Other: "
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
}

export const practitionerQAForm = [
    {
        questionText: "Are you located within the Cornell Cooperative Extension?",
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
            questionText: "Where are you located in CCE?",
            answer: {
                type: AnswerTypes.Dropdown,
                label: "LIST OF NY COUNTIES",
                options: [
                    {
                        value: "Westchester",
                        text: "Westchester"
                    },
                    {
                        value: "Rockland",
                        text: "Rockland"
                    },
                    {
                        value: "Dutchess",
                        text: "Dutchess"
                    }
                ]
            },
        },
        id: 0, //put an id here for questions that have special properties
    },
    {
        questionText: "Which (if any) of the following describe your roles? (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.RoleDescriptions,
            key: "roleDescriptions"
        }
    },
    {
        questionText: "What age youth do you work with?",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.AgeGroups,
            key: "ageGroups"
        }
    },
    {
        questionText: "What types of program delivery models do you use? (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.ProgramDeliveryModels,
            key: "deliveryTypes"
        }
    },
    {
        questionText: "What research topics are you interested in? (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.ResearchTopics,
            key: "researchTopics"
        }
    }
];
