import React from 'react';

export default class Bronx extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29" onClick={this.props.onClick}>
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
                <title>Bronx</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_2-2" data-name="Layer 2">
                        <polygon class="cls-1" points="1 27 1 19 3 15 3 1 29 12 25 17 24 20 27 28 19 24 1 27" />
                    </g>
                </g>
            </svg >
        )
    }
}
