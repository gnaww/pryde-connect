import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import { isValidEmail, isValidURL, isValidPhoneNumber } from '../../services/validators';

class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
            confirmPassword: '',
            website: '',
        };
        this.firstNameError = false;
        this.lastNameError = false;
        this.emailError = false;
        this.passwordError = false;
        this.confirmPasswordError = false;
        this.phoneNumberError = false;
        this.websiteError = false;
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.props.clickedNext) {
            this.phoneNumberIsInvalid(this.state.phone);
            this.emailIsInvalid(this.state.email);
            this.websiteIsInvalid(this.state.website);
            this.firstNameIsInvalid(this.state.first_name);
            this.lastNameIsInvalid(this.state.last_name);
            this.passwordIsInvalid(this.state.password);
            this.confirmPasswordIsInvalid(this.state.password, this.state.confirmPassword);

            const hasErrors = this.phoneNumberError || this.emailError || this.websiteError || this.firstNameError || this.lastNameError || this.passwordError || this.confirmPasswordError;
            this.props.onSubmitData(this.state, hasErrors);
        }
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
            this.errors = false;
        }
    }

    phoneNumberIsInvalid = phoneNumber => {
        this.phoneNumberError = phoneNumber !== '' && !isValidPhoneNumber(phoneNumber);
    }

    emailIsInvalid = email => {
        this.emailError = !isValidEmail(email);
    }

    websiteIsInvalid = website => {
        this.websiteError = website !== '' && !isValidURL(website);
    }

    firstNameIsInvalid = firstName => {
        this.firstNameError = firstName.trim().length === 0;
    }

    lastNameIsInvalid = lastName => {
        this.lastNameError = lastName.trim().length === 0;
    }

    passwordIsInvalid = password => {
        this.passwordError = password.trim().length < 8;
    }

    confirmPasswordIsInvalid = (password, confirmPassword) => {
        this.confirmPasswordError = confirmPassword !== password;
    }

    handleChange = inputField => event => {
        if (inputField === "phone") {
            this.phoneNumberIsInvalid(event.target.value);
        } else if (inputField === "email") {
            this.emailIsInvalid(event.target.value);
        } else if (inputField === "website") {
            this.websiteIsInvalid(event.target.value);
        } else if (inputField === "first_name") {
            this.firstNameIsInvalid(event.target.value);
        } else if (inputField === "last_name") {
            this.lastNameIsInvalid(event.target.value);
        } else if (inputField === "password") {
            this.passwordIsInvalid(event.target.value);
        } else if (inputField === "confirmPassword") {
            this.confirmPasswordIsInvalid(this.state.password, event.target.value);
        }
        this.setState({ [inputField]: event.target.value });
    }

    render() {
        return (
            <>
            <div className={styles.form}>
                <div className={styles.requiredFields}>
                    <div>
                        <input
                            className={styles.smallTextInput}
                            placeholder="First name*"
                            type="text"
                            value={this.state.first_name}
                            onChange={this.handleChange('first_name')}
                        />
                        <input
                            className={styles.smallTextInput}
                            placeholder="Last name*"
                            type="text"
                            value={this.state.last_name}
                            onChange={this.handleChange('last_name')}
                        />
                    </div>
                    <input
                        className={styles.longTextInput}
                        placeholder="Email address*"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                    />
                    <div>
                        <input
                            className={styles.longTextInput}
                            placeholder="Password*"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                        />
                        <input
                            className={styles.longTextInput}
                            placeholder="Confirm your password*"
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange('confirmPassword')}
                        />
                    </div>
                </div>
                <div className={styles.optionalFields}>
                    <input
                        className={styles.mediumTextInput}
                        placeholder="Phone number (optional)"
                        type="text"
                        value={this.state.phone}
                        onChange={this.handleChange('phone')}
                    />
                    <input
                        className={styles.mediumTextInput}
                        placeholder="Website (optional)"
                        type="text"
                        value={this.state.website}
                        onChange={this.handleChange('website')}
                    />
                </div>
            </div>
            <div className={styles.errorContainer}>
                { this.firstNameError && <span className={styles.errorMsg}>First name is required.</span> }
                { this.lastNameError && <span className={styles.errorMsg}>Last name is required.</span> }
                { this.passwordError && <span className={styles.errorMsg}>Password is required and must be at least 8 characters.</span> }
                { this.confirmPasswordError && <span className={styles.errorMsg}>Passwords do not match.</span> }
                { this.emailError && <span className={styles.errorMsg}>Invalid email.</span> }
                { this.phoneNumberError && <span className={styles.errorMsg}>Invalid phone number.</span> }
                { this.websiteError && <span className={styles.errorMsg}>Invalid website.</span> }
            </div>
            </>
        )
    }
}

export default BasicInfo;
