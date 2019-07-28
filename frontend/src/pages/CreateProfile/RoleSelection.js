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
        imgStyle: styles.researcherImg,
        clicked: styles.researcherClicked
    },
    {
        text: "4-H Educator, other Cornell Cooperative Extension (CCE) Role, or other primarily practice-focused role.",
        value: ROLE_TYPE.practitioner,
        img: practitioner,
        imgStyle: styles.practitionerImg,
        clicked: styles.practitionerClicked
    }
];

class RoleSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "",
            clicked: null
        };
        this.errors = false;
    }

    componentDidUpdate(prevProps, _prevState) {
        if (this.props.clickedNext) {
            this.errors = this.state.role === "";
            this.props.onSubmitData(this.state, this.state.role === "");
        }

        if (prevProps.savedData !== this.props.savedData) {
            this.setState(this.props.savedData);
        }
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
        }
    }

    handleSelectRole = (index, role) => {
        this.setState({ role: role, clicked: index });
    }

    handleIsValidationErrorChange = flag => {
        this.errors = flag;
    }

    render() {
        return (
            <>
                <p className={styles.disclaimer}>Choosing either option does <b><i>not</i></b> restrict you from any of PRYDE Research Connect's features!</p>
                <div className={styles.rolePage}>
                    {
                        roleOptions.map((role, index) => {
                            return (
                                <div key={index} className={styles.roleCardWrapper}>
                                    <div className={this.state.clicked === index ? role.clicked : styles.roleCard} onClick={() => this.handleSelectRole(index, role.value)}>
                                        <img
                                            className={role.imgStyle}
                                            src={role.img}
                                            alt="Choose a role."
                                        />
                                    </div>
                                    <p className={styles.roleText}>{role.text}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    {this.errors && (<p className={styles.errorMsg}>You must pick a role.</p>)}
                </div>
            </>
        )
    }
}

export default RoleSelection;
