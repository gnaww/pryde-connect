import React from 'react';

export default class Ontario extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127 107.11">
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
                    <title>Ontario</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="24.15 106.11 24 84 3 86 1 65 3 62 4 42 11 42 10.66 22 24 22 24 1 91 1 91 6 126 6 126 37 120 43 124 49 124 64 56.61 66.5 48 82 48 106 24.15 106.11" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}