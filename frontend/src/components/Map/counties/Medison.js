import React from 'react';

export default class Medison extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 109">
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
                    <title>Medison</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="18 108 14 23 2 21 7 16 1 1 20 7 45 3 73 30 73 34 84 34 84 58 104 58 104 76 143 75.39 143 90 132.13 104.07 18 108" />
                        </g>
                    </g>
                </a>
            </svg>)
    }
}