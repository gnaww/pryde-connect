import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Chemung extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 72" onClick={this.props.onClick}>

                <title>Chemung</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="78 71 2 71 1 6 45 1 45 14 57 13 61 16 65 15 68.86 5.48 85 6 85 31 81 44 81 53 78 71" style={{ fill: `${this.props.color}` }} className={styles.county} />
                    </g>
                </g>
            </svg>
        )
    }
}