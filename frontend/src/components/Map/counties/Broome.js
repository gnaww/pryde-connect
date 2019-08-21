
import React from 'react';

export default class Broome extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147.64 99.08">
                <a onClick={this.props.onClick}>
                    <defs>
                        <style>{`\
                            .cls-1{\
                                fill: ${this.props.color} ;\
                                stroke:#000;\
                                stroke-linejoin:round;\
                                stroke-width:2px;\
                            }\
                        `}</style>
                    </defs>
                    <title>Broome</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="146.64 98.08 4 98.08 1 55 8 54 7 33 1 18 1 1 49 1 53 27 55 41 95 40 95 54 136 54 136 87 146.64 98.08" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}