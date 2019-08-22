import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Genesee extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109 65">
                <title>Genesee</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="1 62.06 1 1 108 1 99 23 108 24 108 36 103 47 102 64 1 62.06" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg >
        )
    }
}
