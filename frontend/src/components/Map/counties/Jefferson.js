import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Jefferson extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198 170">

                <title>Jefferson</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <path style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} d="M121,1l76,40L176,68l14,7-8,19-14,1-30,23H118v22l14,3,1.2,21.22L85,160l1,9-34-2-7-30-14-9,7-9,9-1v5l2,2,4-5,11-3-1-12,10-6,6-2-1-6-4,1-11,8-6,1-8-3,2-4,5-4,8-1,2-7-4,3H58l4-8-9,1H50l-1-3-4,2-7,2-1,6,1,4,8-3,4-1L45,96s-4,4-5,4-7,1-7,1l5-5-1-5-6-1-2-4,3-6-2-3-4-1H22V72l-5-4L30,57l2-1-5-4,3-5h6l1,6L52,43l18-6,14-6,3-6-9-2V16l9-3,10-1,4-1,3-4,5-1,5,2,3-1Z" /><polygon class="cls-1" points="75 23 67 34 58 33 58 27 75 23" /><polygon class="cls-1" points="20 84 15 84 12 83 16 81 23 79 23 82 20 84" />
                        <path style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} d="M14,111a43.31,43.31,0,0,0-1,5c0,1-7,3-7,3l-5-2,6-5Z" />
                        <polygon style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} points="20 120 23 114 32 111 30 114 28 120 20 120" />
                    </g>
                </g>
            </svg>
        )
    }
}