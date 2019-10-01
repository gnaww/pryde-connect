import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Franklin extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157 210.73">
                <title>Franklin</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="135 1 15 1 1 3 1 11 18 12 40 193 37.52 209.73 86 204 122 202 113 140 156 135 135 1" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}
