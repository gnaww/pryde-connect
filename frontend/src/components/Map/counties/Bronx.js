import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Bronx extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29">

                <title>Bronx</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="1 27 1 19 3 15 3 1 29 12 25 17 24 20 27 28 19 24 1 27" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg >
        )
    }
}
