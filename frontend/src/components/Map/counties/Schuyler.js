import React from 'react';

export default class Schuyler extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97 74">
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
                    <title>Schuyler</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="81 1 42 1 42 19 25 19 24 13 1 16 3 61 4 65 28 63 72 58 72 71 84 70 88 73 92 72 96 62 81 62 81 1" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}