import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import checkboxStyles from '../../styles/FilterCategory.module.css';
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
            over18: false
        };
        this.firstNameError = false;
        this.lastNameError = false;
        this.emailError = false;
        this.passwordError = false;
        this.confirmPasswordError = false;
        this.phoneNumberError = false;
        this.websiteError = false;
    }

    componentDidUpdate(prevProps, _prevState) {
        if (this.props.clickedNext) {
            this.phoneNumberIsInvalid(this.state.phone);
            this.emailIsInvalid(this.state.email);
            this.websiteIsInvalid(this.state.website);
            this.firstNameIsInvalid(this.state.first_name);
            this.lastNameIsInvalid(this.state.last_name);
            if (!this.props.editing) {
                this.passwordIsInvalid(this.state.password);
                this.confirmPasswordIsInvalid(this.state.password, this.state.confirmPassword);
            }

            if (!this.props.editing && !this.state.over18) {
                alert("You must be at least 18 years old to create a PRYDE Connect profile.");
                this.props.onSubmitData(this.state, true);
            } else {
                const hasErrors = this.phoneNumberError || this.emailError || this.websiteError || this.firstNameError || this.lastNameError || this.passwordError || this.confirmPasswordError;
                this.props.onSubmitData(this.state, hasErrors);
            }
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

    toggleOver18 = () => {
        this.setState(prevState => ({ over18: !prevState.over18}));
    }

    render() {
        const { editing } = this.props;

        return (
            <>
            <p className={styles.disclaimer}>Keep in mind that the contact information you provide will be publicly viewable so that potential partners can contact you.</p>
            <div className={styles.basicInfoForm}>
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
                    {
                        !editing &&
                        <>
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
                        </>
                    }
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
            {
                editing &&
                <>
                    <Link className={styles.link} to="/update">Update your email address</Link>
                    <br />
                    <Link className={styles.link} to="/password">Change your password</Link>
                </>
            }
            {
                !editing &&
                <FormControlLabel
                    control={
                        <Checkbox
                            color="default"
                            className={checkboxStyles.checkbox}
                            checked={this.state.over18}
                            onChange={this.toggleOver18}
                            disableRipple
                        />
                    }
                    classes={{ label: styles.qaOptionText }}
                    label="Are you age 18 or older?"
                />
            }
            <div className={styles.errorContainer}>
                { this.firstNameError && <span className={styles.errorMsg}>First name is required.</span> }
                { this.lastNameError && <span className={styles.errorMsg}>Last name is required.</span> }
                { this.passwordError && <span className={styles.errorMsg}>Password is required and must be at least 8 characters.</span> }
                { this.confirmPasswordError && <span className={styles.errorMsg}>Passwords do not match.</span> }
                { this.emailError && <span className={styles.errorMsg}>Invalid email address.</span> }
                { this.phoneNumberError && <span className={styles.errorMsg}>Invalid phone number.</span> }
                { this.websiteError && <span className={styles.errorMsg}>Invalid website.</span> }
            </div>
            </>
        )
    }
}

export default BasicInfo;
