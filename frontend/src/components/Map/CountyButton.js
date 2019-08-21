import React from 'react';
import styles from './color.module.css';

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
                    width: `${widthInPx}px`,
                    top: `${top}px`,
                    left: `${left}px`,
                }}
            >
                <StateSvg onClick={this.handleOnClick} className={clicked ? styles.c12 : null} color={"white"} />
            </div >
        );
    }
}