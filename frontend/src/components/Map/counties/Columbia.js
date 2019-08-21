import React from 'react';

export default class Columbia extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114 124">
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
                    <title>Columbia</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="1 101 10 101 43 118 78 123 82 108 83 95 113 1 32 11 32 22 28 32 32 50 15 70 16 76 9 78 1 101" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}