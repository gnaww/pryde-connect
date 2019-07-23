import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';


class UploadProPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filePreview: null,
            profilePicture: null
        };
        this.error = false;
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.props.clickedNext) {
            this.error = this.state.profilePicture === null;
            if (this.state.profilePicture === null) {
                this.props.onSubmitData(this.state, this.state.profilePicture === null);
            } else {
                this.props.onSubmitData(this.state, false);
                this.props.readyToSubmit();
            }
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

    render() {
        return (
            <div className={styles.form}>
                <label className={styles.imageUpload} htmlFor="propic">SELECT A FILE TO UPLOAD</label>
                <input className={styles.propic} onChange={this.setProfilePicture} type="file" id="propic" accept="image/*" />
                {
                    this.state.filePreview !== null && <img className={styles.uploadedImage} alt={"ERROR"} src={this.state.filePreview} />
                }
                {this.error && <p className={styles.errorMsg}>You must upload a profile picture.</p>}
            </div>
        );
    }
}

export default UploadProPic;
