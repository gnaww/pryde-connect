import React, { Component } from 'react';
import styles from '../../styles/CreateProfile.module.css';
import DragAndDrop from '../../components/DragAndDrop';


class UploadProPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicture: null
        };
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.props.clickedNext) {
            this.props.onSubmitData(this.state, this.state.profilePicture === null);
        }
        return null;
    }

    componentDidMount() {
        if (this.props.savedData !== null) {
            this.setState(this.props.savedData);
        }
    }

    setProfilePicture = event => {
        var proPic = URL.createObjectURL(event.target.files[0]);
        this.setState({ profilePicture: proPic })
    }

    setProfilePictureDragDrop = files => {
        var proPic = URL.createObjectURL(files[0]);
        this.setState({ profilePicture: proPic });
    };

    render() {
        return (
            <div className={styles.form}>
                <DragAndDrop handleDrop={this.setProfilePictureDragDrop}>
                    <div className={styles.uploadHere}>
                        {
                            this.state.profilePicture === null ? (
                                <>
                                    <p className={styles.dragAndDrop}>Drag and drop a file here</p>
                                    <p>OR</p>
                                </>
                            ) : (<img className={styles.uploadedImage} alt={"ERROR"} src={this.state.profilePicture} />)
                        }
                        <label className={styles.imageUpload} for="propic">SELECT FILE TO UPLOAD</label>
                        <input className={styles.propic} onChange={this.setProfilePicture} type="file" id="propic" accept="image/*" />
                    </div>
                </DragAndDrop>
            </div>
        )
    }
}

export default UploadProPic;