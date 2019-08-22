import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Wayne extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132 74" onClick={this.props.onClick}>

                <title>Wayne</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="130 73 48 73 47 68 1 68 1 12 36 11 55 9 66 13 74 13 86 23 88 27 85 13 92 7 104 7 107 14 107 7 124 1 131 1 130 73" style={{ fill: `${this.props.color}` }} className={styles.county} />
                    </g>
                </g>
            </svg>
        )
    }
}