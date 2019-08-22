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
        let counties = this.props.values;
        if (counties === undefined) {
            counties = [];
        } else if (typeof counties === "string") {
            counties = [counties];
        }
        return (
            <div style={style}>
                {
                    Counties.map((c, index) => {
                        return <County
                            key={index}
                            StateSvg={c.countyImg}
                            altText={c.countyName}
                            widthInPx={c.width}
                            heightInPx={c.height}
                            top={c.top}
                            left={c.left}
                            clicked={counties.includes(c.countyName)}
                            handleCountyClicked={this.props.handleChange}
                        />
                    })
                }
            </div>
        );
    }
}

export default MapContainer;