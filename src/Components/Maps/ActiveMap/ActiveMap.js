import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import L from "leaflet";

const ActiveMap = (props) => {

    const toggleIconSize = (active) => {
        let iconSize = [];

        if (active > 500000) {
            iconSize = [20, 20]
        } else if (active > 300000) {
            iconSize = [15, 15]
        } else if (active > 100000) {
            iconSize = [10, 10]
        } else {
            iconSize = [5, 5]
        }
        return new L.Icon({
            iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Location_dot_orange.svg/1024px-Location_dot_orange.svg.png",
            iconSize: iconSize
        });
    };

    return (
        <MapContainer center={[28.45835, 10.07813]} zoom={1} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                props.noProvince.map((data, i) =>
                    <Marker
                        key={i}
                        position={[data.lat, data.long]}
                        icon={toggleIconSize(data.confirmed)}
                    >
                        <Popup>
                            <h3>{data.key}</h3>
                            <p>Cases: <strong>{props.formatNumber(data.confirmed)}</strong></p>
                            <p>Recovered: <strong>{props.formatNumber(data.recovered)}</strong></p>
                            <p>Deaths: <strong>{props.formatNumber(data.deaths)}</strong></p>
                            <p>Active: <strong>{props.formatNumber(data.active)}</strong></p>
                        </Popup>
                    </Marker>
                )
            }
            {
                props.provinces.map((data) =>
                    data.map((data, i) =>
                        <Marker
                            key={i}
                            position={[data.lat, data.long]}
                            icon={toggleIconSize(data.confirmed)}
                        >
                            <Popup position={[data.lat, data.long]}>
                                <h3>{data.key}</h3>
                                <p>Cases: <strong>{props.formatNumber(data.confirmed)}</strong></p>
                                <p>Recovered: <strong>{props.formatNumber(data.recovered)}</strong></p>
                                <p>Deaths: <strong>{props.formatNumber(data.deaths)}</strong></p>
                                <p>Active: <strong>{props.formatNumber(data.active)}</strong></p>
                            </Popup>
                        </Marker>
                    )
                )
            }
            {
                props.usProvinces.map((data) =>
                    data.map((data, i) =>
                        <Marker
                            key={i}
                            position={[data.lat, data.long]}
                            icon={toggleIconSize(data.confirmed)}
                        >
                            <Popup position={[data.lat, data.long]}>
                                <h3>{data.key}</h3>
                                <p>Cases: <strong>{props.formatNumber(data.confirmed)}</strong></p>
                                <p>Recovered: <strong>{props.formatNumber(data.recovered)}</strong></p>
                                <p>Deaths: <strong>{props.formatNumber(data.deaths)}</strong></p>
                                <p>Active: <strong>{props.formatNumber(data.active)}</strong></p>
                            </Popup>
                        </Marker>
                    )
                )
            }
        </MapContainer>
    )
}

export default ActiveMap;