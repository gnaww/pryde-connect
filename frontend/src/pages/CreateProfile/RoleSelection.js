import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import researcher from '../../images/researcher.svg';
import practitioner from '../../images/practitioner.svg';
import { ROLE_TYPE } from './FormContent';

const roleOptions = [
    {
        text: "Cornell faculty, academic staff, graduate or undergraduate student, or other primarily research-focused role.",
        value: ROLE_TYPE.researcher,
        img: researcher,
        unclicked: styles.researcherImg,
        clicked: styles.researcherImgClicked
    },
    {
        text: "4-H Educator, other Cornell Cooperative Extension (CCE) Role, or other primarily practice-focused role.",
        value: ROLE_TYPE.practitioner,
        img: practitioner,
        unclicked: styles.practitionerImg,
        clicked: styles.practitionerImgClicked
    }
];

class RoleSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleType: "",
            clicked: null
        };
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.props.clickedNext) {
            this.props.onSubmitData(this.state, this.state.roleType === "");
        }
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
        }
    }

    handleSelectRole = (index, role) => {
        this.setState({ roleType: role, clicked: index });
    }

    handleIsValidationErrorChange = flag => {
        this.errors = flag;
    }

    render() {
        return (
            <>
                <p className={styles.disclaimer}>Choosing either option will <b><i>not</i></b> restrict you from any of PRYDE Research Connect's features!</p>
                <div className={styles.rolePage}>
                    {
                        roleOptions.map((role, index) => {
                            return (
                                <div className={styles.roleCard} key={index}>
                                    <img
                                        className={this.state.clicked === index ? role.clicked : role.unclicked}
                                        src={role.img}
                                        onClick={() => this.handleSelectRole(index, role.value)}
                                        alt="Choose a role."
                                    />
                                    <p className={styles.roleText}>{role.text}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

export default RoleSelection;
