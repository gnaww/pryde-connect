import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Delaware extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194 154">
                <title>Delaware</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="56 153 48 149 34 151 29 135 24 130 16 123 6 114 1 108 1 46 13 44 18 48 34 33 41 33 47 33 56 28 69 19 78 19 78 13 84 17 91 6 97 11 112 1 129 1 139 1 158 24 193 38 172 71 190 80 181 84 172 84 125 114 56 153" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg >
        )
    }
}
