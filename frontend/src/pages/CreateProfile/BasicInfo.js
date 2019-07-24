import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import Validator from 'react-forms-validator';
import phone from 'phone';

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
        this.errors = false;
        this.phoneNumberError = false;
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.props.clickedNext) {
            const hasErrors = this.errors || this.phoneNumberError;
            this.props.onSubmitData(this.state, hasErrors);
        }
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
            this.errors = false;
        }
    }

    handleIsPhoneNumberInvalid = phoneNum => {
        this.phoneNumberError = phoneNum !== '' && phone(phoneNum).length === 0;
    }

    handleChange = inputField => event => {
        if (inputField === "phone") {
            this.handleIsPhoneNumberInvalid(event.target.value);
        }
        this.setState({ [inputField]: event.target.value });
    }

    handleIsValidationErrorChange = flag => {
        this.errors = flag;
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
                <Validator
                    isValidationError={this.handleIsValidationErrorChange}
                    isFormSubmitted={this.props.clickedNext}
                    reference={{ first_name: this.state.first_name }}
                    validationRules={{ required: true }}
                    validationMessages={{ required: "First name is required." }}
                />
                <Validator
                    isValidationError={this.handleIsValidationErrorChange}
                    isFormSubmitted={this.props.clickedNext}
                    reference={{ last_name: this.state.last_name }}
                    validationRules={{ required: true }}
                    validationMessages={{ required: "Last name is required." }}
                />
                <Validator
                    isValidationError={this.handleIsValidationErrorChange}
                    isFormSubmitted={this.props.clickedNext}
                    reference={{ email: this.state.email }}
                    validationRules={{ required: true, email: true }}
                    validationMessages={{ required: "Email address is required.", email: "Invalid email address." }}
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
                    reference={{ website: this.state.website }}
                    validationRules={this.state.website.length === 0 ? { required: false } : { url: true }}
                    validationMessages={this.state.website.length === 0 ? { required: false } : { url: "Not a valid website URL." }}
                />
                {(this.phoneNumberError && this.state.phone !== '') && <span className={styles.errorMsg}>Invalid phone number.</span>}
            </div>
            </>
        )
    }
}

export default BasicInfo;
