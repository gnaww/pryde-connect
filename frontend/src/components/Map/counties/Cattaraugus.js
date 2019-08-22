import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Cattaraugus extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 148 129" onClick={this.props.onClick}>

                <title>Cattaraugus</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="147 128 1 128 3 1 12 2 33 24 43 24 69 15 74 18 91 9 107 8 118 1 118 6 147 6 147 128" style={{ fill: `${this.props.color}` }} className={styles.county} />
                    </g>
                </g>
            </svg>
        )
    }
}