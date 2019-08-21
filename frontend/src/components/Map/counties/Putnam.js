import React from 'react';

export default class Putnam extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 52.5">
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
                    <title>Putnam</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="1 22 8 31 8 41 1 48 4.5 51.5 11 48 87 37 89 1 12 10 1 22" />
                        </g>
                    </g>
                </a>
            </svg>)
    }
}