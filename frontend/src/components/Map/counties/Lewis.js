import React from 'react';

export default class Lewis extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 146.11 188">
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
                    <title>Lewis</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="145.11 142.79 63 187 19 174 15 103 1 100 1 78 21 78 51 55 65 54 73 35 59 28 80 1 133 30 145.11 142.79" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}