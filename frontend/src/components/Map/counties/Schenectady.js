import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Schenectady extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97.75 60">
                <defs>
                </defs>
                <title>Schenectady</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="1 50 6 48 9 41 42 18 43 1 57 6 67 14 80 14 81 27 96.75 44.34 31 55 24 59 11 59 1 50" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg >
        )
    }
}