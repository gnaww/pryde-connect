import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import Validator from 'react-forms-validator';

const roleTypes = {
    practioner: "practioners",
    researcher: "researcher"
}

const roleOptions = [
    {
        text: "4-H Educator",
        value: roleTypes.practioner
    },
    {
        text: "Other CCE role",
        value: roleTypes.practioner
    },
    {
        text: "Other primarily practice-focused role",
        value: roleTypes.practioner
    },
    {
        text: "Cornell faculty or academic staff",
        value: roleTypes.researcher
    },
    {
        text: "Cornell graduate or undergraduate student",
        value: roleTypes.researcher
    },
    {
        text: "Other primarily research-focused role",
        value: roleTypes.researcher
    },

];

class RoleSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedIndex: null,
            roleType: ""
        };
        this.errors = true;
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.props.clickedNext) {
            this.props.onSubmitData(this.state, this.errors);
        }
        return null;
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
            this.errors = false;
        }
    }

    handleSelectRole = event => {
        var role = roleOptions[event.target.value].value;
        this.setState({ checkedIndex: event.target.value, roleType: role });
    }

    handleIsValidationErrorChange = flag => {
        this.errors = flag;
    }

    render() {
        return (
            <div className={styles.form}>
                {
                    roleOptions.map((role, index) => {
                        return (
                            <div className={styles.selection} key={index}>
                                <input
                                    className={styles.radio}
                                    name="role"
                                    type="radio"
                                    value={index}
                                    checked={index == this.state.checkedIndex}
                                    onChange={this.handleSelectRole}
                                />
                                <label className={styles.label}>{role.text}</label>
                            </div>
                        )
                    })
                }
                <Validator
                    isValidationError={this.handleIsValidationErrorChange}
                    isFormSubmitted={this.props.clickedNext}
                    reference={{ roleType: this.state.roleType }}
                    validationRules={{ minLength: 1 }}
                    validationMessages={{ minLength: "Role is required." }}
                />
            </div>
        )
    }
}

export default RoleSelection;