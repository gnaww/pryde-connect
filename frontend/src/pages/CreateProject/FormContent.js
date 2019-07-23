import { AnswerTypes } from '../../components/QAComponents';
import { PractitionerInformation } from '../CreateProfile/FormContent';

export const ProjectInformation = {
    Status: [
        {
            value: 1,
            text: "Completed"
        },
        {
            value: 2,
            text: "In Progress"
        },
        {
            value: 3,
            text: "Not Started"
        }
    ]
}

const additionalQA = {
    questionText: "Is there any additional information you would like to include?",
    answer: {
        type: AnswerTypes.MultipleAnswers
    },
    answers: [
        {
            questionText: "",
            answer: {
                type: AnswerTypes.Inputbox,
                placeholder: "Enter text here",
                key: "additionalInformation",
                label: "Additional description or text:"
            }
        },
        {
            questionText: "",
            answer: {
                type: AnswerTypes.Inputbox,
                placeholder: "Enter text here",
                key: "website",
                label: "Website or other link:"
            }
        },
        {
            questionText: "",
            answer: {
                type: AnswerTypes.Button,
                value: "UPLOAD FILE",
                key: "additionalFiles",
                label: "Images, PDF, or other file attachments"
            }
        }
    ]
};

export const projectQAForm = [
    {
        questionText: "What is the name of your study?*",
        answer: {
            type: AnswerTypes.Inputbox,
            placeholder: "Type your answer here",
            key: "name"
        }
    },
    {
        questionText: "Name any other collaborators your study",
        answer: {
            type: AnswerTypes.Inputbox,
            placeholder: "Type your answer here",
            key: "collaborators"
        }
    },
    {
        questionText:
            "What is the status of this study?*",
        answer: {
            type: AnswerTypes.Dropdown,
            label: "SELECT",
            options: ProjectInformation.Status
        },
    },
    {
        questionText:
            "What research topics does your study cover?* (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.ResearchTopics,
            key: "researchTopics"
        }
    },
    {
        questionText:
            "What age youth are eligible?*",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.ResearchTopics,
            key: "ageRanges"
        }
    },
    {
        questionText: "What is the goal of your study?*",
        answer: {
            type: AnswerTypes.Inputbox,
            placeholder: "Type your answer here",
            key: "summary"
        }
    },
    {
        questionText: "What is the expected timeline for your study?*",
        answer: {
            type: AnswerTypes.Inputbox,
            placeholder: "Type your answer here",
            key: "timeline"
        }
    },
    {
        questionText: "How long is each participant involved in your study?*",
        answer: {
            type: AnswerTypes.Inputbox,
            placeholder: "Type your answer here",
            key: "commitmentLength"
        }
    },
    {
        questionText: "Are there any benefits or incentives for programs or educators who become involved with your study?*",
        answer: {
            type: AnswerTypes.Inputbox,
            placeholder: "Type your answer here",
            key: "incentivesForProgram"
        }
    },
    {
        questionText: "Are there any benefits or incentives for participants who complete your study?*",
        answer: {
            type: AnswerTypes.Inputbox,
            placeholder: "Type your answer here",
            key: "incentivesForParticipants"
        }
    },
    {
        questionText: "What types of program delivery models would be good for your study?* (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.ProgramDeliveryModels,
            key: "deliveryModels"
        }
    },
    additionalQA
];

export const KeyTypes = {
    String: "string",
    Enum: "enum",
    Array: "array"
};

export const pairs = [
    {
        key: "name",
        type: KeyTypes.String
    },
    {
        key: "collaborators",
        type: KeyTypes.String
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
        key: "incentivesForProgram",
        type: KeyTypes.String
    },
    {
        key: "incentivesForParticipants",
        type: KeyTypes.String
    },
    {
        key: "deliveryModels",
        type: KeyTypes.Array
    }
];