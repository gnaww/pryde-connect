import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Greene extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 87">

                <title>Greene</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="121.82 80.01 104 67 96 72 91 86 46 83 1 61 22 28 28 23 36 23 39 25 50 25 57 21 55 15 149 1 149 12 145 22 149 40 132 60 133 66 126 68 121.82 80.01" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg >
        )
    }
}