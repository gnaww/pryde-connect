import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';

class UploadProPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicture: null
        };
    }

    setProfilePicture = event => {
        var proPic = URL.createObjectURL(event.target.files[0]);
        console.log(proPic);
        this.setState({ profilePicture: proPic })
    }

    render() {
        return (
            <div className={styles.form}>
                <div className={styles.uploadHere}>
                    {
                        this.state.profilePicture === null ? (
                            <>
                                <p className={styles.dragAndDrop}>Drag and drop a file here</p>
                                <p>OR</p>
                                <label className={styles.imageUpload} for="propic">SELECT FILE TO UPLOAD</label>
                                <input className={styles.propic} onChange={this.setProfilePicture} type="file" id="propic" accept="image/*" />
                            </>
                        ) : <img className={styles.uploadedImage} alt={"ERROR"} src={this.state.profilePicture} />
                    }
                </div>
            </div>
        )
    }
}

export default UploadProPic;