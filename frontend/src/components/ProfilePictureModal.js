import React, { Component } from 'react';
import styles from '../styles/ProfilePictureModal.module.css';

class ProfilePictureModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPreview: false
        };
        this.profilePicInput = React.createRef();
    }

    handleClick = event => {
        if (!this.node.contains(event.target)) {
            this.props.handleClose();
        }
    }

    handleInputChange = event => {
        this.setState({ showPreview: true });
        const preview = document.getElementById('preview');
        preview.src = URL.createObjectURL(event.target.files[0]);
    }

    handleSubmit = event => {
        event.preventDefault();
        alert(
            `Selected file - ${
            this.profilePicInput.current.files[0].name
            }`
        );
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    render() {
        const classes = this.props.visible ? `${styles.modal} ${styles.visible}` : `${styles.modal} ${styles.hidden}`;

        return (
            <div className={classes}>
                <section className={styles.content} ref={node => this.node = node}>
                    <h1>Upload a new profile picture</h1>
                    <input type="file" ref={this.profilePicInput} accept="image/*" onChange={this.handleInputChange} />
                    <img id="preview" alt="Upload preview" className={this.state.showPreview ? styles.visible : styles.hidden } />
                    <div>
                        <button className={styles.cancelButton} onClick={this.props.handleClose}>CANCEL</button>
                        <button className={styles.saveButton} onClick={this.handleSubmit}>SAVE</button>
                    </div>
                </section>
            </div>
        );
    }
}

export default ProfilePictureModal;
