import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Montgomery extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.31 64" onClick={this.props.onClick}>

                <title>Montgomery</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="130.31 19 130.31 14 46.31 14 6.31 1 1 44.45 11.31 49 21.31 49 57.31 63 96.31 59 130.31 36 130.31 19" style={{ fill: `${this.props.color}` }} className={styles.county} />
                    </g>
                </g>
            </svg>
        )
    }
}