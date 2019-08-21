import React from 'react';

export default class Allegany extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114.89 124">
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
                    <title>Allegany</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="109 123 1 123 1 1 92 1 91 11 113.89 12.81 109 123" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}