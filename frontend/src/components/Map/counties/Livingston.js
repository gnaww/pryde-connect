import React from 'react';

export default class Livingston extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111 121">
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
                    <title>Livingston</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="1.2 108 1 94 19 73 23 12 28 1 66 2 58 10 97 10 97 30 90 30 89 50 87 53 89 74 110 72 110 94 76 93 77 105 64 105 63 120 40 118 41 108 1.2 108" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}