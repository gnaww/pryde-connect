import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';

class UploadProPic extends Component {
    render() {
        return (
            <div className={styles.form}>
                <div className={styles.uploadHere}>
                    <p className={styles.dragAndDrop}>Drag and drop a file here</p>
                    <p>OR</p>
                    <label className={styles.imageUpload} for="propic">SELECT FILE TO UPLOAD</label>
                    <input className={styles.propic} type="file" id="propic" accept="image/*" />
                </div>
            </div>
        )
    }
}

export default UploadProPic;