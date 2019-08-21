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
import { formatArray } from '../../services/util';

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
        subtitle: "Finally, upload a profile picture. (optional)",
        content: UploadProPic
    },
    {
        subtitle: "",
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
        subtitle: "You can edit your answers to these questions again at anytime through your profile page.",
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
            RECAPTCHAToken: null,
            errorSubmitting: false
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

            // Going to confirmation page, so send data to API and handle any errors
            const confirmationPage = this.props.editing ? editPages.length - 1 : pages.length - 1;
            if (nextPage === confirmationPage) {
                let pageDataCopy = Array.from(this.state.pageData);
                pageDataCopy[this.state.page] = data;

                this.setState({ errorSubmitting: false });

                this.createProfile(pageDataCopy)
                    .then(response => {
                        if (response.success) {
                            // successful
                            this.setState({ page: confirmationPage });
                        } else {
                            // failed to create/update profile
                            let pageDataCopy = Array.from(this.state.pageData);
                            pageDataCopy[this.state.page] = data;
                            this.setState({ pageData: pageDataCopy });
                            if (this.props.editing) {
                                alert(response.message ? response.message : "There was an error updating your profile. Please try again and make sure all questions are filled out properly.");
                            } else {
                                this.setState({ errorSubmitting: true, RECAPTCHAToken: null });
                                alert(response.message ? response.message : "There was an error creating your profile. Please try again and make sure all questions are filled out properly.");
                            }
                        }
                    });
            } else {
                let pageDataCopy = Array.from(this.state.pageData);
                pageDataCopy[this.state.page] = data;
                this.setState({ pageData: pageDataCopy, page: nextPage });
            }

        }
        this.setState({ clickedNext: false });
    }

    setRECAPTCHAToken = token => {
        this.setState({ RECAPTCHAToken: token });
    }

    // builds user object from data to POST to the API
    createProfile = async data => {
        let user = {};

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

        if (this.props.editing === true) {
            delete user.password1;
            delete user.password2;
            try {
                let response = await api.updateUser(user);
                return { success: response, message: "" };
            } catch(err) {
                console.log(err);
                console.log(err.response.data);
                return { success: false, message: Object.values(err.response.data)[0] };
            }
        } else {
            user.RECAPTCHAToken = this.state.RECAPTCHAToken;

            try {
                let response = await api.register(user);
                if (data[4].profilePicture) {
                    let profilePictureResponse = await api.uploadProfilePicture(data[4].profilePicture, response.data.key);
                    return { success: profilePictureResponse, message: "" };
                } else {
                    return { success: response.status === 201, message: "" };
                }
            } catch(err) {
                console.log(err);
                console.log(err.response.data);

                // failed isRealUser permission
                if (err.response.data.detail === "Authentication credentials were not provided.") {
                    return { success: false, message: "RECAPTCHA has detected you are a robot." }
                } else {
                    return { success: false, message: Object.values(err.response.data)[0] };
                }
            }
        }
    }

    componentDidMount() {
        document.title = this.props.editing ? "PRYDE Connect | Edit Profile" : "PRYDE Connect | Sign Up";
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
            title = "Create a profile"
        }

        let lastQuestionPage = editing ? editPages.length - 2 : pages.length - 2;
        if (editing === true) {
            if (this.state.pageData[1] && this.state.pageData[1].role === "Researcher") {
                lastQuestionPage = editPages.length - 3;
            } else if (this.state.pageData[1] && this.state.pageData[1].role === "Practitioner") {
                lastQuestionPage = editPages.length - 2;
            }
        }

        const NUM_PAGES = editing ? editPages.length : pages.length;
        const pageContentProps = {
            savedData: this.state.pageData[this.state.page],
            clickedNext: this.state.clickedNext,
            onSubmitData: this.handleOnSubmitData,
            editing: editing,
            setRECAPTCHAToken: this.setRECAPTCHAToken,
            errorSubmitting: this.state.errorSubmitting,
            email: this.state.pageData[0] ? this.state.pageData[0].email : ""
        };

        return (
            <div className={styles.root} >
                {
                    // don't show title/subtitle on confirmation page for sign up
                    !(!editing && this.state.page === pages.length - 1) &&
                    <>
                        <h1 className={styles.createProfile}>{title}</h1>
                        <h2 className={styles.subtitle}>{editing ? editPages[this.state.page].subtitle : pages[this.state.page].subtitle}</h2>
                    </>
                }
                <PageContent {...pageContentProps} />
                <div className={styles.buttons}>
                    {
                        (this.state.page > 0 && this.state.page < NUM_PAGES - 1) &&
                        (<input className={styles.backButton} type="submit" value="BACK" onClick={this.handleBack} />)
                    }
                    {
                        this.state.page < lastQuestionPage &&
                        (<input className={styles.nextButton} type="submit" value="NEXT" onClick={this.handleNext} />)
                    }
                    {
                        this.state.page === lastQuestionPage &&
                        (<input className={styles.nextButton} type="submit" value="FINISH" onClick={this.handleNext} disabled={this.state.RECAPTCHAToken === null && !this.props.editing} />)
                    }
                </div>
            </div>
        );
    }
}

export default CreateProfile;
