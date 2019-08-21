import React from 'react';

export default class Albany extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111 97">
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
                    <title>
                        Albany
                </title>
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon points="95 82 99 58 95 45 110 26 110 9 102 1 95 8 21 20 17 39 3 59 7 72 1 96 95 82" class="cls-1" />
                    </g>
                </a>
            </svg>
        )
    }
}