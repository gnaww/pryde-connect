import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Manhattan extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 47.24">
                <title>Manhattan</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="21 1 7 24.24 2 34.24 1 41.24 5 46.24 11 36.24 19 26.24 19 22.24 19 14.24 21 10.24 21 1" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}
