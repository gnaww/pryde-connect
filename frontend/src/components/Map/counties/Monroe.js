import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Monroe extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 123 101">
                <title>Monroe</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="1 1 12 1 38 8 52 8 63 18 87 33 106 26 122 23 122 79 101 79 101 100 49 100 57 92 19 91 19 79 10 78 19 56 1 56 1 1" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}
