import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Nassau extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 76" onClick={this.props.onClick}>

                <title>Nassau</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="1.5 31.1 3 20 8 20 10 26 14 26 13 20 6 15 13 11 18 12 22 19 22 7 31 4 41 1 43 9 49 9 52 4 59 9 62 18 62 37 69 57 69 60 45 63 31 67 25 72 20 65 13 70 13 75 4 72 1 69 1 65 6 60 6 49 13 41 8 35 1.5 31.1" style={{ fill: `${this.props.color}` }} className={styles.county} />
                    </g>
                </g>
            </svg >
        )
    }
}