import React from 'react';

export default class StLawrence extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 257 224">
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
                    <title>St. Lawrence</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="123 33 150 22 162 22 166 13 180 13 191 8 199 1 217 5 217 13 234 14 256 195 254 212 149 223 77 184 1 144 7 142 16 132 9 127 41 93 94 55 95 50 107 46 105 37 117 39 123 33" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}