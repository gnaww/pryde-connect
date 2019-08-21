import React from 'react';

export default class Warren extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152 139">
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
                    <title>Warren</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="12 104 1 20 33.11 15.93 151 1 145 7 147 19 140 36 133 41 112 71 120 119 112 118 105 120 101 124 96 125 88 138 83 129 76 130 75 117 65 97 12 104" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}