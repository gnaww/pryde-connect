import React from 'react';

export default class County extends React.Component {
    handleOnClick = () => {
        let { clicked, altText, onClick } = this.props;
        onClick({
            target: {
                name: "location",
                value: altText,
                checked: clicked
            }
        });
    }

    render() {
        let { StateSvg, widthInPx, top, left, clicked } = this.props;
        return (
            <div
                style={{
                    position: 'absolute',
                    width: `${widthInPx}px`,
                    top: `${top}px`,
                    left: `${left}px`,
                }}
            >
                <StateSvg onClick={this.handleOnClick} color={clicked ? "orange" : "white"} />
            </div >
        );
    }
}