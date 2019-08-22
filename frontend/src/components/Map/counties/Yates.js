import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Yates extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 71" onClick={this.props.onClick}>

                <title>Yates</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="1 43.43 1 19 11 1 77 1 81 1 81 8 91 24 91 70 73 70 73 64 50 67 50 61 42 64 43 44 1 43.43" style={{ fill: `${this.props.color}` }} className={styles.county} />
                    </g>
                </g>
            </svg>
        )
    }
}