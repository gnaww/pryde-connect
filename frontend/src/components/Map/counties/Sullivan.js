import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Sullivan extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150.51 138" onClick={this.props.onClick}>

                <title>Sullivan</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="74 123 126 123 136 108 149.51 102.59 144 90 110 65 133 36 70 1 1 40 6 47 13 48 13 52 8 55 9 58 15 59 17 71 12 76 17 78 19 93 12 98 31 128 42 128 50 137 65 137 74 137 74 123" style={{ fill: `${this.props.color}` }} className={styles.county} />
                    </g>
                </g>
            </svg>
        )
    }
}