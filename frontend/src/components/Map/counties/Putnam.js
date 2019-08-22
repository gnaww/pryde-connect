import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Putnam extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 52.5">

                <title>Putnam</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="1 22 8 31 8 41 1 48 4.5 51.5 11 48 87 37 89 1 12 10 1 22" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}