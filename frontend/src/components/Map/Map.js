import React, { Component } from 'react';
import County from './CountyButton';
import { Counties } from './Counties';
import styles from '../../styles/Map.module.css';


class Map extends Component {
    render() {
        let counties = this.props.values;

        if (counties === undefined) {
            counties = [];
        } else if (typeof counties === "string") {
            counties = [counties];
        }

        return (
            <div className={styles.mapContainer}>
                {
                    Counties.map((c, index) => (
                        <County
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
                    ))
                }
            </div>
        );
    }
}

export default Map;
