import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class StatenIsland extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 34">

                <title>Staten Island</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="15 1 28 1 42 7 28 24 15 30 6 33 1 31 1 26 10 19 15 1" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg >
        )
    }
}