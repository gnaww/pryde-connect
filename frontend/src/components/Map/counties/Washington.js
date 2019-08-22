import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Washington extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 203">
                <title>Washington</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="79 64 73 202 54 202 44 197 39 202 5 202 14 175 9 119 1 71 22 41 29 36 36 19 34 7 41 1 53 1 58 8 55 19 43 39 44 45 43 49 49 57 53 43 65 42 68 53 79 64" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}
