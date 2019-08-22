import React from 'react';
import styles from '../../../styles/Map.module.css';

export default class Chenango extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116 130">
                <title>Chenango</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="1 5 5 76 11 116 51 115 51 129 92 129 92 100 96 87 96 83 102 78 101 72 97 62 97 54 109 42 109 9 115 1 1 5" style={{ fill: `${this.props.color}` }} className={styles.county} onClick={this.props.onClick} />
                    </g>
                </g>
            </svg >
        )
    }
}
