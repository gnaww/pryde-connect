import React, { Component } from 'react';
import County from './CountyButton';
import { Counties } from './Counties';


class MapContainer extends Component {
    render() {
        const style = {
            width: '100%',
            height: '580px',
            marginBottom: '15px',
            position: 'relative'
        }
        return (
            <div style={style}>
                {
                    Counties.map((c, index) => {
                        return <County
                            key={index}
                            zIdx={index}
                            imgSrc={c.countyImg}
                            altText={c.countyName}
                            widthInPx={c.width}
                            heightInPx={c.height}
                            top={c.top}
                            left={c.left} />
                    })
                }
            </div>
        );
    }
}

export default MapContainer;