import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Cortland extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 86">

                <title>Cortland</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="31 85 4 85 1 1 73.86 1 75 14 79 85 31 85" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}