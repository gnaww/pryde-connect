import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Hamilton extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 213">
                <title>Hamilton</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="5 14 115 1 119 38 105 48 127 75 142 68 146 75 159 78 159 90 127 94 142 204 127 204 127 212 108 212 108 206 67 209 31 195 1 183 21 147 5 14" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}
