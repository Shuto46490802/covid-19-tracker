import React, { useState, useEffect } from "react";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


import L from "leaflet";

const CamulativeMap = ({ noProvince, formatNumber, usProvinces, provinces, mapExpand }) => {

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
    <MapContainer  center={[23.45835, 10.07813]} zoom={1} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        noProvince.map((data, i) =>
          <Marker
            key={i}
            position={[data.lat, data.long]}
            icon={toggleIconSize(data.confirmed)}
          >
            <Popup>
              <h3>{data.key}</h3>
              <p>Cases: <strong>{formatNumber(data.confirmed)}</strong></p>
              <p>Recovered: <strong>{formatNumber(data.recovered)}</strong></p>
              <p>Deaths: <strong>{formatNumber(data.deaths)}</strong></p>
            </Popup>
          </Marker>
        )
      }
      {
        provinces.map((data) =>
          data.map((data, i) =>
            <Marker
              key={i}
              position={[data.lat, data.long]}
              icon={toggleIconSize(data.confirmed)}
            >
              <Popup position={[data.lat, data.long]}>
                <h3>{data.key}</h3>
                <p>Cases: <strong>{formatNumber(data.confirmed)}</strong></p>
                <p>Recovered: <strong>{formatNumber(data.recovered)}</strong></p>
                <p>Deaths: <strong>{formatNumber(data.deaths)}</strong></p>
              </Popup>
            </Marker>
          )
        )
      }
      {
        usProvinces.map((data) =>
          data.map((data, i) =>
            <Marker
              key={i}
              position={[data.lat, data.long]}
              icon={toggleIconSize(data.confirmed)}
            >
              <Popup position={[data.lat, data.long]}>
                <h3>{data.key}</h3>
                <p>Cases: <strong>{formatNumber(data.confirmed)}</strong></p>
                <p>Recovered: <strong>{formatNumber(data.recovered)}</strong></p>
                <p>Deaths: <strong>{formatNumber(data.deaths)}</strong></p>
              </Popup>
            </Marker>
          )
        )
      }
    </MapContainer>
  )
};



export default CamulativeMap;