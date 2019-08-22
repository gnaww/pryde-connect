import React from 'react';

export default class Brooklyn extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 41" onClick={this.props.onClick}>
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
                        <polygon class="cls-1" points="11 40 8 35 1 30 3 22 7 17 7 12 19 1 30 12 34 15 39 22 32 25 29 25 31 32 31 38 25 34 17 39 11 40" />
                    </g>
                </g>
            </svg >)
    }
}