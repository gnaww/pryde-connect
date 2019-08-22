import React from 'react';

export default class Clinton extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 137.83" onClick={this.props.onClick}>
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
                <title>
                    Clinton
                    </title>
                <g id="Layer_2-2" data-name="Layer 2">
                    <path d="M132,1,1,3,22,136.83,87,129l7-7,9,1,7-7v-5l24-4-7-6-2-12,5-12s-3-12-2-12,6-10,6-10V46l-7-6,6-20Z" className="cls-1" />
                </g>
            </svg >
        )
    }
}
