import React from 'react';

export default class Franklin extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157 210.73" onClick={this.props.onClick}>
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
                <title>Franklin</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon class="cls-1" points="135 1 15 1 1 3 1 11 18 12 40 193 37.52 209.73 86 204 122 202 113 140 156 135 135 1" />
                    </g>
                </g>
            </svg>
        )
    }
}