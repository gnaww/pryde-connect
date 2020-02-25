import { AnswerTypes } from '../../components/QAComponents';
import Animal from '../../images/research_icons/animal.png';
import Agriculture from '../../images/research_icons/agriculture.png';
import Career from '../../images/research_icons/career.png';
import Civic from '../../images/research_icons/civic.png';
import Diversity from '../../images/research_icons/diversity.png';
import Education from '../../images/research_icons/education.png';
import Energy from '../../images/research_icons/energy.png';
import Environment from '../../images/research_icons/environment.png';
import Family from '../../images/research_icons/family.png';
import Gardening from '../../images/research_icons/gardening.png';
import Health from '../../images/research_icons/health.png';
import IntergenerationalEngagement from '../../images/research_icons/intergenerational_engagement.png';
import LifeSkills from '../../images/research_icons/life_skills.png';
import Media from '../../images/research_icons/media.png';
import Motivation from '../../images/research_icons/motivation.png';
import Nutrition from '../../images/research_icons/nutrition.png';
import OutdoorEducation from '../../images/research_icons/outdoor_education.png';
import Parenting from '../../images/research_icons/parenting.png';
import Peer from '../../images/research_icons/peer.png';
import Policy from '../../images/research_icons/policy.png';
import Positive from '../../images/research_icons/positive.png';
import Program from '../../images/research_icons/program.png';
import Risk from '../../images/research_icons/risk.png';
import Self from '../../images/research_icons/self.png';
import Stem from '../../images/research_icons/stem.png';
import VolunteerEngagement from '../../images/research_icons/volunteer_engagement.png';
import Youth from '../../images/research_icons/youth.png';
import Other from '../../images/research_icons/other.png';

export const ROLE_TYPE = {
    practitioner: "Practitioner",
    researcher: "Researcher"
};

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
        "Early childhood (6-8 years)",
        "Middle childhood (9-11 years)",
        "Young teens (12-14 years)",
        "Teenagers (15-17 years)",
        "Young adults (18-24 years)",
        "Adults (25-65 years)",
        "Seniors (65+ years)"
    ],
    ProgramDeliveryModes: [
        "Afterschool programs",
        "Camps",
        "Clubs",
        "In-school Programming",
        "Summer Youth Employment Opportunities",
        "Special Interest/Short Term",
        "Fair/Events",
        "Other: "
    ],
    ResearchTopics: [
        {
            image: Animal,
            label: "Animal Science"
        },
        {
            image: Agriculture,
            label: "Agriculture"
        },
        {
            image: Career,
            label: "Career Readiness"
        },
        {
            image: Civic,
            label: "Civic Engagement"
        },
        {
            image: Diversity,
            label: "Diversity Equity & Inclusion"
        },
        {
            image: Education,
            label: "Education & Learning"
        },
        {
            image: Energy,
            label: "Energy"
        },
        {
            image: Environment,
            label: "Environment & Sustainability"
        },
        {
            image: Family,
            label: "Families"
        },
        {
            image: Gardening,
            label: "Gardening & Horticulture"
        },
        {
            image: Health,
            label: "Health & Wellness"
        },
        {
            image: IntergenerationalEngagement,
            label: "Intergenerational Engagement"
        },
        {
            image: LifeSkills,
            label: "Life Skills"
        },
        {
            image: Media,
            label: "Media & Technology"
        },
        {
            image: Motivation,
            label: "Motivation"
        },
        {
            image: Nutrition,
            label: "Nutrition"
        },
        {
            image: OutdoorEducation,
            label: "Outdoor Education"
        },
        {
            image: Parenting,
            label: "Parenting"
        },
        {
            image: Peer,
            label: "Peer Relationships"
        },
        {
            image: Positive,
            label: "Positive Youth Development"
        },
        {
            image: Policy,
            label: "Policy Analysis"
        },
        {
            image: Program,
            label: "Program Evaluation"
        },
        {
            image: Risk,
            label: "Risk Behavior"
        },
        {
            image: Self,
            label: "Self & Identity"
        },
        {
            image: Stem,
            label: "Science Technology Engineering & Math (STEM)"
        },
        {
            image: VolunteerEngagement,
            label: "Volunteer Engagement"
        },
        {
            image: Youth,
            label: "Youth/Adult Relationships"
        },
        {
            image: Other,
            label: "Other"
        }
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
                    value: "true",
                    text: "YES"
                },
                {
                    value: "false",
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
            key: "displayRole",
            placeholder: "Ex: 4-H Educator"
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
            "What types of program delivery modes do you use?* (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options:
                PractitionerInformation.ProgramDeliveryModes,
            key: "deliveryModes"
        }
    },
    {
        questionText:
            "What research topics are you interested in?* (check all that apply)",
        answer: {
            type: AnswerTypes.ResearchTopics,
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
                    value: "true",
                    text: "YES"
                },
                {
                    value: "false",
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
            type: AnswerTypes.ResearchTopics,
            options: PractitionerInformation.ResearchTopics,
            key: "researchInterests"
        }
    },
    {
        questionText: "What age youth do you typically work with in your research projects?* (check all that apply)",
        answer: {
            type: AnswerTypes.Checkbox,
            options: PractitionerInformation.AgeGroups,
            key: "ageRanges"
        }
    },
    {
        questionText: "In 1-2 sentences, please describe your research interests. (optional)",
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
