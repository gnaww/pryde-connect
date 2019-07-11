import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css'
import BasicInfo from './BasicInfo';
import RoleSelection from './RoleSelection';
import PractionerQuestions from './PractionerQuestions';
import ResearcherQuestions from './ResearcherQuestions';
import OptionalQuestions from './OptionalQuestions';
import UploadProPic from './UploadProPic';
import ReviewFinish from './ReviewFinish';
import { roleTypes } from './Options';

var pages = [
    {
        subtitle: "Welcome! Please complete the following fields.",
        content: BasicInfo
    },
    {
        subtitle: "Which of the following best describes you?",
        content: RoleSelection
    },
    {
        subtitle: "Great! Please complete the following fields.",
        content: PractionerQuestions
    },
    {
        subtitle: "Almost there! The following questions are optional.",
        content: OptionalQuestions
    },
    {
        subtitle: "Finally, upload a profile picture.",
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
            page: 1,
            pageData: pages.map(() => { return null }),
            clickedNext: false,
            clickedBack: false
        }
    }

    handleBack = event => {
        event.preventDefault();
        this.setState({ page: this.state.page - 1 });
    }

    handleNext = event => {
        event.preventDefault();
        this.setState({ clickedNext: true });
    }

    handleFinish = event => {
        event.preventDefault();
    }

    handleOnSubmitData = (data, errors) => {
        if (!errors) {
            var nextPage = this.state.page + 1;
            if(this.state.page === 1){
                pages[nextPage].content = data.roleType === roleTypes.researcher ? ResearcherQuestions : PractionerQuestions;
            }
            var pageDataCopy = Array.from(this.state.pageData);
            pageDataCopy[this.state.page] = data;
            this.setState({ pageData: pageDataCopy });
            this.setState({ page: nextPage });
        }
        this.setState({ clickedNext: false });
    }

    render() {
        var PageContent = pages[this.state.page].content;
        console.log(this.state.pageData);
        return (
            <div className={styles.root} >
                <h1 className={styles.createProfile}>{this.state.page === pages.length - 1 ? "Thank you!" : "Create a profile"}</h1>
                <h2 className={styles.subtitle}>{pages[this.state.page].subtitle}</h2>
                <PageContent savedData={this.state.pageData[this.state.page]} clickedNext={this.state.clickedNext} onSubmitData={this.handleOnSubmitData} />
                <div className={styles.buttons}>
                    {
                        this.state.page > 0 && this.state.page < pages.length - 1 &&
                        (<input className={styles.backButton} type="submit" value="BACK" onClick={this.handleBack} />)
                    }
                    {
                        this.state.page < pages.length - 1 ?
                            (<input className={styles.nextButton} type="submit" value="NEXT" onClick={this.handleNext} />) :
                            (<input className={styles.nextButton} type="submit" value="FINISH" onClick={this.handleFinish} />)
                    }

                </div>
            </div>
        );
    }
}

export default CreateProfile;
