import React from 'react';

export default class Yates extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 71">
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
                    <title>Yates</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="1 43.43 1 19 11 1 77 1 81 1 81 8 91 24 91 70 73 70 73 64 50 67 50 61 42 64 43 44 1 43.43" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}