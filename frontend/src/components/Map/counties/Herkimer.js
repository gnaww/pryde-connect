import React from 'react';

export default class Herkimer extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 295" onClick={this.props.onClick}>
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
                <title>Herkimer</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon class="cls-1" points="12 1 31 11 74 7 90 140 70 176 100 188 102 215 94 227 90 227 92 244 97 246 92 289 68 279 68 294 60 294 26 277 18 288 4 288 4 283 7 282 1 243 33 202 15 196 17 185 22 185 31 178 12 1" />
                    </g>
                </g>
            </svg>
        )
    }
}