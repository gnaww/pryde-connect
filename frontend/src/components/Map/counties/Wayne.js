import React from 'react';

export default class Wayne extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132 74">
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
                    <title>Wayne</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="130 73 48 73 47 68 1 68 1 12 36 11 55 9 66 13 74 13 86 23 88 27 85 13 92 7 104 7 107 14 107 7 124 1 131 1 130 73" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}