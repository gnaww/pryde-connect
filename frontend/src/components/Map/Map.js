import React, { Component } from 'react';
import County from './CountyButton';
import { Counties } from './Counties';
import queryString from 'query-string';


class MapContainer extends Component {
    render() {
        const style = {
            width: '100%',
            height: '580px',
            marginBottom: '15px',
            position: 'relative'
        }
        const parsedURL = queryString.parse(this.props.values, { arrayFormat: "comma" });
        let counties = parsedURL.location;
        if (counties === undefined) {
            counties = [];
        } else if (typeof counties === "string") {
            counties = [counties];
        }
        return (
            <div style={style}>
                {
                    Counties.map((c, index) => {
                        {
                            let clicked = counties.includes(c.countyName);
                            return (<County
                                key={index}
                                StateSvg={c.countyImg}
                                altText={c.countyName}
                                widthInPx={c.width}
                                heightInPx={c.height}
                                top={c.top}
                                left={c.left}
                                clicked={clicked}
                                color={clicked ? "white" : "orange"}
                                handleCountyClicked={this.props.handleChange}
                            />)
                        }
                    })
                }
            </div>
        );
    }
}

export default MapContainer;