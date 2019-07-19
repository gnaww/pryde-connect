import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';


class UploadProPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filePreview: null,
            profilePicture: null
        };
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.props.clickedNext) {
            this.props.onSubmitData(this.state, this.state.profilePicture === null);
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
                <label className={styles.imageUpload} for="propic">SELECT A FILE TO UPLOAD</label>
                <input className={styles.propic} onChange={this.setProfilePicture} type="file" id="propic" accept="image/*" />
                {
                    this.state.filePreview !== null && <img className={styles.uploadedImage} alt={"ERROR"} src={this.state.filePreview} />
                }
            </div>
        );
    }
}

export default UploadProPic;
