import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Allegany extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114.89 124">
                <title>Allegany</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="109 123 1 123 1 1 92 1 91 11 113.89 12.81 109 123" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}