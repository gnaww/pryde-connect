import React from 'react';

export default class CountyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "white"
        };
    }

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

    mouseOver = () => {
        this.setState({ color: "#ffc966" });
    }

    mouseOut = () => {
        const { clicked } = this.props;

        if (clicked) {
            this.setState({ color: "orange" });
        } else {
            this.setState({ color: "white" });
        }
    }

    render() {
        const { StateSvg, widthInPx, top, left } = this.props;
        return (
            <div
                style={{
                    position: 'absolute',
                    width: widthInPx,
                    top: top,
                    left: left,
                }}
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
            >
                <StateSvg onClick={this.handleOnClick} color={this.state.color}  />
            </div >
        );
    }
}
