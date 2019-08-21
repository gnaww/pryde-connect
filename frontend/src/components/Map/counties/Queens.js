import React from 'react';

export default class Queens extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 40">
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
                    <title>Queens</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="20 5 25 1 33 3 43 9 48 15 40 23 42 33 36 39 28 35 21 36 16 29 12 26 1 15 7 3 17 4 20 5" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}