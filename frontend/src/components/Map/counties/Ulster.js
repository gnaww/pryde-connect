import React from 'react';

export default class Ulster extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 141">
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
                    <title>Ulster</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="65.62 3.62 57 8 48 8 1 38 64 73 41 102 75 127 81 140 103 127 103 135 127 140 127 131 142 137 142 140 161 140 163 70 158 59 165 25 169 14 151 1 143 6 138 20 93 17 65.62 3.62" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}