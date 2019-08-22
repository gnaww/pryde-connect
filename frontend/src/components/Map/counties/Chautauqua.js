import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Chautauqua extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139 133">
                <title>Chautauqua</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="136 132 1 132 1 68 67 31 68 27 103 7 121 2 130 1 133 5 138 5 136 132" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg>
        )
    }
}
