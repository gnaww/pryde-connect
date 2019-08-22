import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Queens extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 40">

                <title>Queens</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="20 5 25 1 33 3 43 9 48 15 40 23 42 33 36 39 28 35 21 36 16 29 12 26 1 15 7 3 17 4 20 5" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}