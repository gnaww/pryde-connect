import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import Validator from 'react-forms-validator';

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
        this.errors = true;
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.props.clickedNext) {
            this.props.onSubmitData(this.state, this.errors);
        }
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
            this.errors = false;
        }
    }

    handleChange = inputField => event => {
        this.setState({ [inputField]: event.target.value });
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
                        className={styles.mediumTextInput}
                        placeholder="Phone number (optional)"
                        type="text"
                        value={this.state.phone}
                        onChange={this.handleChange('phone')}
                    />
                </div>
                <div>
                    <input
                        className={styles.longTextInput}
                        placeholder="Confirm your password*"
                        type="password"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange('confirmPassword')}
                    />
                    <input
                        className={styles.mediumTextInput}
                        placeholder="Website (optional)"
                        type="text"
                        value={this.state.website}
                        onChange={this.handleChange('website')}
                    />
                </div>
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
                    reference={{ phone: this.state.phone }}
                    validationRules={this.state.phone.length === 0 ? { required: false } : { number: true }}
                    validationMessages={this.state.phone.length === 0 ? { required: false } : { number: "Not a valid phone number." }}
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
