import React, { Component } from 'react';
import phone from 'phone';
import normalizeUrl from 'normalize-url';
import styles from '../../styles/CreateProfile.module.css';
import BasicInfo from './BasicInfo';
import RoleSelection from './RoleSelection';
import PractitionerQuestions from './PractitionerQuestions';
import ResearcherQuestions from './ResearcherQuestions';
import OptionalQuestions from './OptionalQuestions';
import UploadProPic from './UploadProPic';
import ReviewFinish from './ReviewFinish';
import { ROLE_TYPE } from './FormContent';
import api from '../../services/api';

const NAVBAR_HEIGHT = 110;
let pages = [
    {
        subtitle: "Welcome! Please complete the following questions.",
        content: BasicInfo
    },
    {
        subtitle: "Which of the following best describes you?",
        content: RoleSelection
    },
    {
        subtitle: "Great! Please complete the following questions.",
        content: PractitionerQuestions
    },
    {
        subtitle: "Almost there! The following questions are optional.",
        content: OptionalQuestions
    },
    {
        subtitle: "Finally, upload a profile picture.*",
        content: UploadProPic
    },
    {
        subtitle: "You can edit your answers to these questions at anytime through your profile page.",
        content: ReviewFinish
    }
];
let editPages = [
    {
        subtitle: "Edit your contact information.",
        content: BasicInfo
    },
    {
        subtitle: "Edit your role selection.",
        content: RoleSelection
    },
    {
        subtitle: "Edit your answers to the following questions.",
        content: PractitionerQuestions
    },
    {
        subtitle: "Edit your answers to the following optional questions.",
        content: OptionalQuestions
    },
    {
        subtitle: "Change your profile picture (optional)",
        content: UploadProPic
    },
    {
        subtitle: "You can edit your answers to these questions at anytime through your profile page.",
        content: ReviewFinish
    }
];

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            pageData: this.props.editing ? editPages.map(() => null) : pages.map(() => null),
            clickedNext: false,
            clickedBack: false,
            readyToSubmit: false
        };
    }

    handleBack = event => {
        event.preventDefault();

        // skip research needs and evaluation needs question if user is researcher
        if (this.state.page === 4 && this.state.pageData[1].role === "Researcher") {
            this.setState({ page: 2 });
        } else {
            this.setState({ page: this.state.page - 1 });
        }
        window.scrollTo(0, NAVBAR_HEIGHT);
    }

    handleNext = event => {
        event.preventDefault();
        this.setState({ clickedNext: true });
        window.scrollTo(0, NAVBAR_HEIGHT);
    }

    handleOnSubmitData = (data, errors) => {
        if (!errors) {
            let nextPage = this.state.page + 1;

            if (this.state.page === 1) {
                if (this.props.editing) {
                    editPages[nextPage].content = data.role === ROLE_TYPE.researcher ? ResearcherQuestions : PractitionerQuestions;
                } else {
                    pages[nextPage].content = data.role === ROLE_TYPE.researcher ? ResearcherQuestions : PractitionerQuestions;
                }
            }

            // skip research needs and evaluation needs question if user is researcher
            if (this.state.page === 2 && this.state.pageData[1].role === "Researcher") {
                nextPage += 1;
            }

            let pageDataCopy = Array.from(this.state.pageData);
            pageDataCopy[this.state.page] = data;
            this.setState({ pageData: pageDataCopy, page: nextPage });
        }
        this.setState({ clickedNext: false });
    }

    readyToSubmit = () => {
        this.setState({ readyToSubmit: true });
    }

    // builds user object from this.state.pageData to POST to the API
    createProfile = data => {
        let user = {};
        const formatArray = arr => {
            return (
                arr.filter(elt => elt.checked)
                    .map(elt => elt.other ? elt.other : elt.value)
            );
        };

        // Basic Info
        user.email = data[0].email;
        user.first_name = data[0].first_name;
        user.last_name = data[0].last_name;
        user.password1 = data[0].password;
        user.password2 = data[0].confirmPassword;
        user.phone = data[0].phone ? phone(data[0].phone)[0] : "";
        user.website = data[0].website ? normalizeUrl(data[0].website) : "";

        // Role Selection
        user.role = data[1].role === "Practitioner" ? 1 : 2;

        // Practitioner / Researcher Questions
        user.affiliation = data[2].affiliation;
        user.displayRole = data[2].displayRole.other ? data[2].displayRole.other : data[2].displayRole.option;
        user.locatedAtCCE = data[2].locatedAtCCE === undefined ? false : data[2].locatedAtCCE;
        user.locatedAtCornell = data[2].locatedAtCornell === undefined ? false : data[2].locatedAtCornell;
        user.location = data[2].location;
        user.researchDescription = data[2].researchDescription ? data[2].researchDescription : "";
        user.ageRanges = data[2].ageRanges ? formatArray(data[2].ageRanges) : [];
        user.deliveryModes = data[2].deliveryModes ? formatArray(data[2].deliveryModes) : [];
        user.researchInterests = data[2].researchInterests ? formatArray(data[2].researchInterests) : [];
        user.roles = data[2].roles ? formatArray(data[2].roles) : [];

        // Optional Questions
        user.researchNeeds = data[3] === null ? "" : data[3].researchNeeds;
        user.evaluationNeeds = data[3] === null ? "" : data[3].evaluationNeeds;

        // TODO: add profile picture to users
        // user.profilePicture = data[4].profilePicture;

        // TODO: add error handling for if registering/updating user fails
        if (this.props.editing === true) {
            delete user.password1;
            delete user.password2;
            api.updateUser(user)
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                    console.log(err.response.data);
                });
        } else {
            api.register(user)
                .then(response => {
                    localStorage.setItem("pryde_key", response.data.key);
                })
                .catch(err => {
                    console.log(err);
                    console.log(err.response.data);
                });
        }
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.state.readyToSubmit) {
            this.createProfile(this.state.pageData);
        }
    }

    componentDidMount() {
        if (this.props.editProfileData) {
            this.setState({ pageData: this.props.editProfileData });
        }
    }

    render() {
        const { editing } = this.props;
        const PageContent = editing ? editPages[this.state.page].content : pages[this.state.page].content;
        let title;
        if (editing) {
            title = this.state.page === editPages.length - 1 ? "Your profile was successfully updated." : "Edit your profile"
        } else {
            title = this.state.page === pages.length - 1 ? "Thank you! Your profile was successfully created." : "Create a profile"
        }
        const NUM_PAGES = editing ? editPages.length : pages.length;
        const pageContentProps = {
            savedData: this.state.pageData[this.state.page],
            clickedNext: this.state.clickedNext,
            onSubmitData: this.handleOnSubmitData,
            readyToSubmit: this.readyToSubmit,
            editing: editing
        };

        return (
            <div className={styles.root} >
                <h1 className={styles.createProfile}>{title}</h1>
                <h2 className={styles.subtitle}>{editing ? editPages[this.state.page].subtitle : pages[this.state.page].subtitle}</h2>
                <PageContent {...pageContentProps} />
                <div className={styles.buttons}>
                    {
                        (this.state.page > 0 && this.state.page < NUM_PAGES - 1) &&
                        (<input className={styles.backButton} type="submit" value="BACK" onClick={this.handleBack} />)
                    }
                    {
                        this.state.page < NUM_PAGES - 2 &&
                        (<input className={styles.nextButton} type="submit" value="NEXT" onClick={this.handleNext} />)
                    }
                    {
                        this.state.page === NUM_PAGES - 2 &&
                        (<input className={styles.nextButton} type="submit" value="FINISH" onClick={this.handleNext} />)
                    }
                </div>
            </div>
        );
    }
}

export default CreateProfile;
