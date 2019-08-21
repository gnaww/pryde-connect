import React from 'react';

export default class Schoharie extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109 115">
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
                    <title>Schoharie</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="55 114 61 109 69 109 72 111 83 111 90 107 88 101 94 77 90 64 104 44 108 25 101 29 87 29 78 20 83 18 86 11 47 15 11 1 9 18 16 50 1 77 20 100 55 114" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}