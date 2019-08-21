import React from 'react';

export default class Saratoga extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115 146">
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
                    <title>Saratoga</title>
                    <g id="Layer_2" data-name="Layer 2"
                    ><g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="54 1 1 8 15 96 15 101 29 106 39 114 52 114 54 127 69 145 77 143 84 136 92 145 100 138 92 114 102 106 104.8 106 114 79 112 60 109 23 100 22 94 24 90 28 85 29 77 42 72 33 65 34 64 21 54 1" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}