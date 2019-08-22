import React from 'react';

export default class Dutchess extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 151" onClick={this.props.onClick}>
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
                <title>Dutchess</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon class="cls-1" points="1 150 12 138 89 129 98 8 93 8 90 23 54 18 21 1 12 1 5 35 10 46 8 118 1 124 1 150" />
                    </g>
                </g>
            </svg >
        )
    }
}