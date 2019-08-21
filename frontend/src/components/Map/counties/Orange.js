import React from 'react';

export default class Orange extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158 118">
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
                    <title>Orange</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="102 117 14 67 5 55 1 48 1 34 53 34 63 19 83 11 99 1 99 9 123 13 123 5 138 11 138 15 157 15 150 22 150 48 157 57 157 67 150 74 102 117" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}