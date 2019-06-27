import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import Validator from 'react-forms-validator';

class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            phoneNumber: '',
            confirmPassword: '',
            website: '',
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

    handleFirstNameChange = event => {
        this.setState({ firstName: event.target.value });
    }

    handleLastNameChange = event => {
        this.setState({ lastName: event.target.value });
    }

    handleEmailAddressChange = event => {
        this.setState({ emailAddress: event.target.value });
    }

    handlePasswordChange = event => {
        this.setState({ password: event.target.value });
    }

    handlePhoneNumberChange = event => {
        this.setState({ phoneNumber: event.target.value });
    }

    handleConfirmPasswordChange = event => {
        this.setState({ confirmPassword: event.target.value });
    }

    handleWebsiteChange = event => {
        this.setState({ website: event.target.value });
    }

    handleIsValidationErrorChange = flag => {
        this.errors = flag;
    }

    render() {
        return (
            <div className={styles.form}>
                <div>
                    <input
                        className={styles.smallTextInput}
                        placeholder="First Name"
                        type="text"
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange}
                    />
                    <input
                        className={styles.smallTextInput}
                        placeholder="Last Name"
                        type="text"
                        value={this.state.lastName}
                        onChange={this.handleLastNameChange}
                    />
                </div>
                <input
                    className={styles.longTextInput}
                    placeholder="Email address"
                    type="text"
                    value={this.state.emailAddress}
                    onChange={this.handleEmailAddressChange}
                />
                <div>
                    <input
                        className={styles.longTextInput}
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    <input
                        className={styles.mediumTextInput}
                        placeholder="Phone number (optional)"
                        type="text"
                        value={this.state.phoneNumber}
                        onChange={this.handlePhoneNumberChange}
                    />
                </div>
                <div>
                    <input
                        className={styles.longTextInput}
                        placeholder="Confirm your password"
                        type="password"
                        value={this.state.confirmPassword}
                        onChange={this.handleConfirmPasswordChange}
                    />
                    <input
                        className={styles.mediumTextInput}
                        placeholder="Website (optional)"
                        type="text"
                        value={this.state.website}
                        onChange={this.handleWebsiteChange}
                    />
                </div>
                <Validator
                    isValidationError={this.handleIsValidationErrorChange}
                    isFormSubmitted={this.props.clickedNext}
                    reference={{ firstName: this.state.firstName }}
                    validationRules={{ required: true }}
                    validationMessages={{ required: "First name is required." }}
                />
                <Validator
                    isValidationError={this.handleIsValidationErrorChange}
                    isFormSubmitted={this.props.clickedNext}
                    reference={{ lastName: this.state.lastName }}
                    validationRules={{ required: true }}
                    validationMessages={{ required: "Last name is required." }}
                />
                <Validator
                    isValidationError={this.handleIsValidationErrorChange}
                    isFormSubmitted={this.props.clickedNext}
                    reference={{ emailAddress: this.state.emailAddress }}
                    validationRules={{ required: true, email: true }}
                    validationMessages={{ required: "Email address is required.", email: "Not a valid email address." }}
                />
                <Validator
                    isValidationError={this.handleIsValidationErrorChange}
                    isFormSubmitted={this.props.clickedNext}
                    reference={{ password: this.state.password }}
                    validationRules={{ required: true, minLength: 8 }}
                    validationMessages={{ required: "Password is required", minLength: "Password not long enough." }}
                />
                <Validator
                    isValidationError={this.handleIsValidationErrorChange}
                    isFormSubmitted={this.props.clickedNext}
                    reference={{ confirmPassword: this.state.confirmPassword }}
                    validationRules={{ required: true, equalTo: this.state.password }}
                    validationMessages={{ required: "Must confirm password.", equalTo: "Passwords do not match." }}
                />
                <Validator
                    isValidationError={this.handleIsValidationErrorChange}
                    isFormSubmitted={this.props.clickedNext}
                    reference={{ phoneNumber: this.state.phoneNumber }}
                    validationRules={this.state.phoneNumber.length === 0 ? { required: false } : { number: true }}
                    validationMessages={this.state.phoneNumber.length === 0 ? { required: false } : { number: "Not a valid phone number." }}
                />
                <Validator
                    isValidationError={this.handleIsValidationErrorChange}
                    isFormSubmitted={this.props.clickedNext}
                    reference={{ website: this.state.website }}
                    validationRules={this.state.website.length === 0 ? { required: false } : { url: true }}
                    validationMessages={this.state.website.length === 0 ? { required: false } : { url: "Not a valid website URL." }}
                />
            </div>
        )
    }
}

export default BasicInfo;