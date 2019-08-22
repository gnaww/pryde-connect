import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Clinton extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133 73">

                <title>Fulton</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="132 72 122.15 10.08 107 10 107 18 88 18 88 12 47 15 11 1 13 28 5 40 1 41 3 57 8 59 48 72 132 72" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg >
        )
    }
}