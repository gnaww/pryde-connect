import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Clinton extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91 86">
                <title>Tompkins</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="1 19 22 19 6 1 84 1 86 48 79 51 75 54 90 61 83 77 79 74 69 74 67 70 55 70 54 85 45 85 44 81 32 81 1 80 1 19" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}