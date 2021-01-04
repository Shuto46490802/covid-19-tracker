import React, { useState, useEffect } from "react";

//Components 
import Cards from "./Components/Card";
import CountryPicker from "./Components/CountryPicker";
import Charts from "./Components/Charts";
import Maps from "./Components/Maps/Maps";

import "./css/App.css";

import { fetchData } from "./api";

const icon = <img src="https://img.icons8.com/dusk/100/000000/coronavirus.png" />;

const App = () => {

  const [data, setData] = useState({});
  const [country, setCountry] = useState("");
  const [isMap, setIsMap] = useState("calmulative");

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData());
    }
    fetchAPI();
  }, []);

  const toggleCountry = async (country) => {
    setData(await fetchData(country));
    setCountry(country);
  };

  return (
    <div id="app-wrapper" >
      <div id="header">
        <h1>C</h1>
        <span id="icon">
          {icon}
        </span>
        <h1>VID-19</h1>
      </div>
      <div id="maps-wrapper">
        <Maps isMap={isMap} />
        <div id="map-toggler">
          <div className={"toggler"} onClick={() => { setIsMap("calmulative")}}>Calmulative Cases</div>
          <div className={"toggler"} onClick={() => {setIsMap("active")}}>Active Cases</div>
        </div>
      </div>
      <Cards data={data} />
      <CountryPicker toggleCountry={toggleCountry} />
      <Charts data={data} country={country} />
    </div>
  )
};

export default App;