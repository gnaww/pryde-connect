import React from 'react';

function County({ imgSrc, altText, widthInPx }) {
    return (
        <div style={{
            width: `${widthInPx}px`,
            height: 'auto'
        }}>
            <img src={imgSrc} alt={altText} />
        </div>
    );
}

export default County;