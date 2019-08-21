import React from 'react';

export default class Wyoming extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.92 83">
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
                    <title>Wyoming</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <polygon class="cls-1" points="105.92 2.5 1 1 1 21 5 25 5 77 5 82 85 82 85 68 103 47 105.92 2.5" />
                        </g>
                    </g>
                </a>
            </svg>
        )
    }
}