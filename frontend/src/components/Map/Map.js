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
        let counties = Array.from(this.props.values === undefined ? [] : this.props.values);
        return (
            <div style={style}>
                {
                    Counties.map((c, index) => {
                        {
                            let clicked = counties.includes(c.altText);
                            let color = clicked ? "orange" : "white";
                            return (<County
                                key={index}
                                StateSvg={c.countyImg}
                                altText={c.countyName}
                                widthInPx={c.width}
                                heightInPx={c.height}
                                top={c.top}
                                left={c.left}
                                clicked={clicked}
                                onClick={this.props.onClick}
                            />)
                        }
                    })
                }
            </div>
        );
    }
}

export default MapContainer;