import { AnswerTypes } from '../../components/QAComponents';
import { PractitionerInformation } from '../CreateProfile/FormContent';

export const ProjectInformation = {
    Status: [
        {
            value: "1",
            text: "Completed"
        },
        {
            value: "2",
            text: "In Progress"
        },
        {
            value: "3",
            text: "Not Started"
        }
    ]
};

const alternateContactQA = {
    questionText: "Specify contact information (optional: if left blank uses your contact information)",
    answer: {
        type: AnswerTypes.ContactInfo
    }
};

const additionalQA = {
    questionText: "Is there any additional information you would like to include? (optional)",
    answer: {
        type: AnswerTypes.MultipleAnswers
    },
    answers: [
        {
            questionText: "",
            answer: {
                type: AnswerTypes.Textbox,
                placeholder: "Additional descriptions, notes, etc.",
                key: "additionalInformation",
                label: "Additional description or text:"
            }
        },
        {
            questionText: "",
            answer: {
                type: AnswerTypes.Button,
                value: "UPLOAD FILE",
                key: "additionalFiles",
                label: "Images, PDF, or other file attachments (maximum 5)"
            }
        }
    ]
};

export const projectQAForm = [
    {
        questionText: "What is the name of your project?*",
        answer: {
            type: AnswerTypes.Inputbox,
            placeholder: "Type your answer here",
            key: "name"
        }
    },
    alternateContactQA,
    {
        questionText: "Specify project location (optional: if left blank uses your location)",
        answer: {
            type: AnswerTypes.Inputbox,
            placeholder: "Where is your project located?",
            key: "alternateLocation"
        }
    },
    {
        questionText: "Add collaborators to your project (optional):",
        answer: {
            type: AnswerTypes.Collaborator,
            key: "collaborators"
        }
    },
    {
        questionText:
            "What is the status of your project?*",
        answer: {
            type: AnswerTypes.Dropdown,
            label: "SELECT",
            options: ProjectInformation.Status
        },
    },
    {
        questionText:
            "What research topics does your project cover?* (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.ResearchTopics,
            key: "researchTopics"
        }
    },
    {
        questionText:
            "What age youth are eligible to participate in your project?*",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.AgeGroups,
            key: "ageRanges"
        }
    },
    {
        questionText: "What is the goal of your project?*",
        answer: {
            type: AnswerTypes.Textbox,
            placeholder: "Type your answer here",
            key: "summary"
        }
    },
    {
        questionText: "What is the expected timeline for your project?*",
        answer: {
            type: AnswerTypes.Inputbox,
            placeholder: "Type your answer here",
            key: "timeline"
        }
    },
    {
        questionText: "How long will each participant be involved in your project?*",
        answer: {
            type: AnswerTypes.Inputbox,
            placeholder: "Type your answer here",
            key: "commitmentLength"
        }
    },
    {
        questionText: "Are there any benefits or incentives for youth or programs that become involved with your project?*",
        answer: {
            type: AnswerTypes.Inputbox,
            placeholder: "Type your answer here",
            key: "incentives"
        }
    },
    {
        questionText: "What types of program delivery modes would be good for your project?* (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.ProgramDeliveryModes,
            key: "deliveryModes"
        }
    },
    additionalQA
];

export const KeyTypes = {
    String: "string",
    Enum: "enum",
    Array: "array",
    Object: "object",
    Collaborator: "collaborator"
};

export const pairs = [
    {
        key: "name",
        type: KeyTypes.String
    },
    {
        key: "alternateContact",
        type: KeyTypes.Object
    },
    {
        key: "alternateLocation",
        type: KeyTypes.String
    },
    {
        key: "collaborators",
        type: KeyTypes.Collaborator
    },
    {
        key: "status",
        type: KeyTypes.Enum
    },
    {
        key: "researchTopics",
        type: KeyTypes.Array
    },
    {
        key: "ageRanges",
        type: KeyTypes.Array
    },
    {
        key: "summary",
        type: KeyTypes.String
    },
    {
        key: "timeline",
        type: KeyTypes.String
    },
    {
        key: "commitmentLength",
        type: KeyTypes.String
    },
    {
        key: "incentives",
        type: KeyTypes.String
    },
    {
        key: "deliveryModes",
        type: KeyTypes.Array
    }
];
