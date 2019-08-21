import React from 'react';

export default class Steuben extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 153.5 139">
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
                    <title>Steuben</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <path class="cls-1" d="M152.5,138H1S6,13,7,13h13l-1-12L44.86,2l73.75,1-1,20,8-3v6l2,45,1,4,23.92-2Z" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}