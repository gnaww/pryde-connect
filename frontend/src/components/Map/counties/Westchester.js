import React from 'react';

export default class Westchester extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 117">
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
                    <title>Westchester</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="2 16 8 12 84 1 84 20 97 37 50 63 57 80 62 82 61 96 51 99 38 116 12 105 16 89 16 53 1 29 7 21 2 16" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}