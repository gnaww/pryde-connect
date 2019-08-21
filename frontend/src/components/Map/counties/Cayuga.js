import React from 'react';

export default class Cayuga extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94.32 187">
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
                    <title>Cayuga</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <path class="cls-1" d="M15,186H93.32L92,149,75,131l-17,2-4-17,3-20H49L46,81l7-9V38H27V1L8,22V78L7,95,1,107v14l6,10L3,143v22s11,11,10,11S15,186,15,186Z" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}