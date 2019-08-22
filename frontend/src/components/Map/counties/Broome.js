
import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Broome extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147.64 99.08" onClick={this.props.onClick}>
                
                <title>Broome</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="146.64 98.08 4 98.08 1 55 8 54 7 33 1 18 1 1 49 1 53 27 55 41 95 40 95 54 136 54 136 87 146.64 98.08" style={{ fill: `${this.props.color}` }} className={styles.county} />
                    </g>
                </g>
            </svg>
        )
    }
}