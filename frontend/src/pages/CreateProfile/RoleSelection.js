import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import Validator from 'react-forms-validator';
import researcher from '../../images/researcher.svg';
import practioner from '../../images/practioner.svg';
import { roleTypes } from './Options'

const roleOptions = [
    {
        text:  "Cornell faculty, academic staff, graduate or undergraduate student, or other primarily research-focused role.",
        value: roleTypes.researcher,
        img: researcher,
        unclicked: styles.researcherImg,
        clicked: styles.researcherImgClicked
    },
    {
        text: "4-H Educator, other Cornell Cooperative Extension (CCE) Role, or other primarily practice-focused role.",
        value: roleTypes.practioner,
        img: practioner,
        unclicked: styles.practionerImg,
        clicked: styles.practionerImgClicked
    }

];

class RoleSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleType: ""
        };
        this.clicked = null;
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.props.clickedNext) {
            this.props.onSubmitData(this.state, this.state.roleType === "");
        }
        return null;
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
            this.errors = false;
        }
    }

    handleSelectRole = (index, role) => {
        this.clicked = index;
        this.setState({ roleType: role });
    }

    handleIsValidationErrorChange = flag => {
        this.errors = flag;
    }

    render() {
        return (
            <div className={styles.rolePage}>
                {
                    roleOptions.map((role, index) => {
                        return (
                            <div className={styles.roleCard} key={index}>
                                <img 
                                    className={this.clicked === index ? role.clicked : role.unclicked} 
                                    src={role.img} 
                                    onClick={() => this.handleSelectRole(index, role.value)}
                                />
                                <p className={styles.roleText}>{role.text}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default RoleSelection;