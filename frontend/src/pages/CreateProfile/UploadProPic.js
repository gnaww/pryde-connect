import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import styles from '../../styles/CreateProfile.module.css';


class UploadProPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filePreview: null,
            profilePicture: null
        };
        this.errors = false;
        this.recaptchaRef = React.createRef();
    }

    componentDidUpdate(prevProps, _prevState) {
        if (this.props.clickedNext) {
            this.errors = this.state.profilePicture === null;
            if (this.state.profilePicture === null) {
                this.props.onSubmitData(this.state, this.state.profilePicture === null);
            } else {
                this.props.onSubmitData(this.state, false);
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

        const input = document.getElementById("propic");
        input.addEventListener('change', this.onSelectFile, false);
    }

    componentWillUnmount() {
        const input = document.getElementById("propic");
        input.removeEventListener('change', this.onSelectFile, false);
    }

    onSelectFile = () => {
        const input = document.getElementById("propic");
        this.setState({ profilePicture: input.files[0] })
    }

    setProfilePicture = event => {
        let proPic = URL.createObjectURL(event.target.files[0]);
        this.setState({ filePreview: proPic })
    }

    onRECAPTCHAChange = token => {
        if (token === null) {
            alert("Your RECAPTCHA verification has expired, please check the checkbox again.")
        } else {
            console.log(token);
        }
    }

    render() {
        return (
            <div>
                <label className={styles.imageUpload} htmlFor="propic">SELECT A FILE TO UPLOAD</label>
                <input className={styles.propic} onChange={this.setProfilePicture} type="file" id="propic" accept="image/*" />
                {
                    this.state.filePreview !== null && <img className={styles.uploadedImage} alt={"ERROR"} src={this.state.filePreview} />
                }
                {this.errors && <p className={styles.errorMsg}>You must upload a profile picture.</p>}
                {
                    !this.props.editing &&
                    <ReCAPTCHA
                        ref={this.recaptchaRef}
                        sitekey="6LeIRbEUAAAAABxKY8FWkytAMAGdW0EhcPphoT4Q"
                        onChange={this.onRECAPTCHAChange}
                        onErrored={() => {
                            this.recaptchaRef.current.reset();
                            alert("An error occurred while verifying your RECAPTCHA challenge.");
                        }}
                    />
                }
            </div>
        );
    }
}

export default UploadProPic;
