import React from 'react';

export default class Erie extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134 154">
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
                    <title>Erie</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            <path class="cls-1" d="M133,130l-11,7-16,1-17,9-5-3-26,9H48L27,131l-9-1H13l-3-4-9,1,3-9,9-11,5-1-1-6,5-5c1-1,36-20,36-20L57,61,48,49,45,36l-3-4H36l-5-3-7-6L30,8H42l8,4,1,7H62L66,9,78,8,88,4h16l4,4,6-5,10-2,9,5V54h-4V74l4,4Z" />
                        </g>
                    </g>
                </a>
            </svg >
        )
    }
}