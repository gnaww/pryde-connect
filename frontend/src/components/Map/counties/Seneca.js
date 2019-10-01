import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Seneca extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 111">
                <title>Seneca</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="7.34 1 7 32 1 38 4 44 4 59 9 59 9 66 19 82 19 110 79 110 63 92 61 82 51 71 51 49 56 37 49 27 49 13 56 1 7.34 1" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}
