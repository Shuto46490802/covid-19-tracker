import React, { useState, useEffect } from "react";
import "./CamulativeMap.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


import L from "leaflet";

const CamulativeMap = (props) => {

  const toggleIconSize = (confirmed) => {
    let iconSize = [];

    if (confirmed > 700000) {
      iconSize = [20, 20]
    } else if (confirmed > 500000) {
      iconSize = [15, 15]
    } else if (confirmed > 300000) {
      iconSize = [10, 10]
    } else {
      iconSize = [5, 5]
    }
    return new L.Icon({
      iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Red_Circle%28small%29.svg/1024px-Red_Circle%28small%29.svg.png",
      iconSize: iconSize
    });
  };

  return (
    <div id="camulative-map-wrapper">
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
                <h3>{data.country}</h3>
                <p>Cases: <strong>{props.formatNumber(data.confirmed)}</strong></p>
                <p>Recovered: <strong>{props.formatNumber(data.recovered)}</strong></p>
                <p>Deaths: <strong>{props.formatNumber(data.deaths)}</strong></p>
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
                  <h2>{data.province}, {data.country}</h2>
                  <p>Cases: <strong>{props.formatNumber(data.confirmed)}</strong></p>
                  <p>Recovered: <strong>{props.formatNumber(data.recovered)}</strong></p>
                  <p>Deaths: <strong>{props.formatNumber(data.deaths)}</strong></p>
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
                  <h2>{data.province}, {data.country}</h2>
                  <p>Cases: <strong>{props.formatNumber(data.confirmed)}</strong></p>
                  <p>Recovered: <strong>{props.formatNumber(data.recovered)}</strong></p>
                  <p>Deaths: <strong>{props.formatNumber(data.deaths)}</strong></p>
                </Popup>
              </Marker>
            )
          )
        }
      </MapContainer>
    </div>
  )
};

export default CamulativeMap;