import React from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt'

function County({ imgSrc, altText, widthInPx, top, left, zIdx }) {
    var buttonStyles = {
        fill: 'orange'
    }
    var clicked = false;

    const handleClicked = () => {
        clicked = !clicked;
    }
    return (
        <div style={{
            position: 'absolute',
            width: `${widthInPx}px`,
            top: `${top}px`,
            left: `${left}px`,
            zIndex: `${zIdx}`,
        }}>
            <SvgLoader path={imgSrc}>
                <SvgProxy selector="#Layer_2" fill="orange" />
            </SvgLoader>
        </div>
    );
}

export default County;