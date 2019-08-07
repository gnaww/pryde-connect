import React, { Component } from 'react';
import Hamilton from '../images/counties/Hamilton.svg';
import Essex from '../images/counties/Essex.svg';
import StLawrence from '../images/counties/St. Lawrence.svg';
import Franklin from '../images/counties/Franklin.svg';
import Clinton from '../images/counties/Clinton.svg';
import Warren from '../images/counties/Warren.svg';
import Washington from '../images/counties/Washington.svg';
import GoogleMapReact from 'google-map-react';
import County from './Map/County';

const counties = [
    {
        countyName: "Clinton",
        countyImg: Clinton,
        width: 30,
        lat: 44.9932,
        lng: -74.0273,
    },
    {
        countyName: "Franklin",
        countyImg: Franklin,
        width: 35,
        lat: 45,
        lng: -74.7055,
    },
    {
        countyName: "St. Lawrence",
        countyImg: StLawrence,
        width: 58,
        lat: 45.0149,
        lng: -75.7953,
    },
    {
        countyName: "Essex",
        countyImg: Essex,
        width: 43,
        lat: 44.621,
        lng: -74.3318,
    },
    {
        countyName: "Hamilton",
        countyImg: Hamilton,
        width: 30,
        lat: 44.2792,
        lng: -74.7461,
    },
    {
        countyName: "Warren",
        countyImg: Warren,
        width: 33,
        lat: 44.0296,
        lng: -74.2188,
    },
    {
        countyName: "Washington",
        countyImg: Washington,
        width: 19,
        lat: 43.7896,
        lng: -73.7073,
    },
]

class MapContainer extends Component {
    render() {
        const defaultProps = {
            center: {
                lat: 44.9932,
                lng: -74.0273
            },
            zoom: 6
        }
        const style = {
            width: '75%',
            height: '30%',
            marginBottom: '15px'
        }
        return (
            <div style={style}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    options={
                        {
                            minZoom: 6,
                            maxZoom: 6
                        }
                    }
                >
                    {
                        counties.map((c, index) => {
                            return <County key={index} imgSrc={c.countyImg} altText={c.countyName} widthInPx={c.width} lat={c.lat} lng={c.lng} />
                        })
                    }
                </GoogleMapReact>
            </div>
        );
    }
}

export default MapContainer;