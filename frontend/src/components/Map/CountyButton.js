import React from 'react';

export default class County extends React.Component {
    handleOnClick = () => {
        let { clicked, altText, handleCountyClicked } = this.props;

        handleCountyClicked({
            target: {
                name: "location",
                value: altText,
                checked: !clicked
            }
        });
    }

    render() {
        let { StateSvg, widthInPx, top, left, clicked } = this.props;
        return (
            <div
                style={{
                    position: 'absolute',
                    width: widthInPx,
                    top: top,
                    left: left,
                }}
            >
                <StateSvg onClick={this.handleOnClick} color={clicked ? "orange" : "white"} />
            </div >
        );
    }
}
