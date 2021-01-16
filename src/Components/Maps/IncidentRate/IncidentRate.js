import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import L from "leaflet";

const IncidentRate = (props) => {

    const toggleIconSize = (incidentRate) => {
        let iconSize = [];

        if (incidentRate > 10000) {
            iconSize = [20, 20]
        } else if (incidentRate > 8000) {
            iconSize = [15, 15]
        } else if (incidentRate > 5000) {
            iconSize = [10, 10]
        } else {
            iconSize = [5, 5]
        }
        return new L.Icon({
            iconUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Yellow_icon.svg/1200px-Yellow_icon.svg.png",
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
                        icon={toggleIconSize(data.incidentRate)}
                    >
                        <Popup>
                            <h3>{data.key}</h3>
                            <p>Incident rate: {Math.floor(data.incidentRate)} per 100,000people</p>
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
                            icon={toggleIconSize(data.incidentRate)}
                        >
                            <Popup position={[data.lat, data.long]}>
                                <h3>{data.key}</h3>
                                <p>Incident rate: {Math.floor(data.incidentRate)} per 100,000 people</p>
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
                            icon={toggleIconSize(data.incidentRate)}
                        >
                            <Popup position={[data.lat, data.long]}>
                                <h3>{data.key}</h3>
                                <p>Incident rate: {Math.floor(data.incidentRate)} per 100,000people</p>
                            </Popup>
                        </Marker>
                    )
                )
            }
        </MapContainer>
    )
}

export default IncidentRate;