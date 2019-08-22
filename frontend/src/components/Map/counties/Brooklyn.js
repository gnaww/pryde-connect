import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Brooklyn extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 41" onClick={this.props.onClick}>

                <title>Queens</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="11 40 8 35 1 30 3 22 7 17 7 12 19 1 30 12 34 15 39 22 32 25 29 25 31 32 31 38 25 34 17 39 11 40" style={{ fill: `${this.props.color}` }} className={styles.county} />
                    </g>
                </g>
            </svg >)
    }
}