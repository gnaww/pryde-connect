import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Onondaga extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122 116" onClick={this.props.onClick}>
                
                <title>Onondaga</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="47 115 121 115 117 44 104 42 110 37 104 22 66 6 61 1 62 14 56 14 47 7 47 17 41 9 8 9 8 38 1 47 4 62 12 62 9 82 13 99 30 97 47 115" style={{ fill: `${this.props.color}` }} className={styles.county} />
                    </g>
                </g>
            </svg>
        )
    }
}