import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Rensselaer extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 118" onClick={this.props.onClick}>
                
                <title>Rensselaer</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="82 107 100 51 94 39 97 27 97 6 78 6 68 1 63 6 26 6 16 14 24 38 16 44 16 61 1 80 5 93 1 117 82 107" style={{ fill: `${this.props.color}` }} className={styles.county} />
                    </g>
                </g>
            </svg>
        )
    }
}