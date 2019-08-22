import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Medison extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 109">

                <title>Madison</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="18 108 14 23 2 21 7 16 1 1 20 7 45 3 73 30 73 34 84 34 84 58 104 58 104 76 143 75.39 143 90 132.13 104.07 18 108" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>)
    }
}