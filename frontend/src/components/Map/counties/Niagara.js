import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Niagara extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 119 83">

                <title>Niagara</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="118 1 3 26 4 43 6 56 1 60 2 69 15 71 27 71 35 75 36 82 47 82 51 72 63 71 73 67 89 67 93 71 99 66 109 64 118 69 118 56 118 1" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}