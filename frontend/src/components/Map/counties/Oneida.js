import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Oneida extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162 176">
                <title>Oneida</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="17 29 70 45 152 1 159 65 150 72 145 72 143 83 161 89 129 130 135 169 132 170 126 170 126 174 87 175 87 157 67 157 67 133 56 133 56 129 28 102 3 106 7 70 1 64 17 29" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}
