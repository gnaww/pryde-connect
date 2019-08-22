import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Otsego extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155 142" onClick={this.props.onClick}>
                
                <title>Otsego</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="1 139 5 126 5 122 11 117 10 111 6 101 6 93 18 81 18 67 18 48 35 26 35 7 41 7 41 12 55 12 63 1 97 19 105 18 105 3 139 18 149 18 147 35 154 67 139 94 112 94 97 104 91 99 84 110 77 106 77 112 69 112 47 126 34 126 18 141 13 137 1 139" style={{ fill: `${this.props.color}` }} className={styles.county} />
                    </g>
                </g>
            </svg>)
    }
}