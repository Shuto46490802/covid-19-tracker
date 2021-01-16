import React, { useEffect, useState } from "react";

//components
import CamulativeMap from "./CamulativeMap/CamulativeMap";
import ActiveMap from "./ActiveMap/ActiveMap";
import IncidentRate from "./IncidentRate/IncidentRate";

import "./Maps.css";

const Maps = ({ classes, provincesData, setMapExpand, mapExpand, expandIcon, shrinkIcon }) => {

    const [isMap, setIsMap] = useState("calmulative");
    const [isHover, setIsHover] = useState(false);

    //check if data has been asinged to countries
    if (!provincesData[0]) {
        return "Loading"
    };

    //data from country without province
    const noProvince = provincesData
        .filter((data) => data.length === 1)
        .map((data) => data[0])
        .filter((data) => data)
        .filter(({ lat, confirmed }) => lat !== null && confirmed > 50000);

    //data from countries with provinces
    const provinces = provincesData
        .filter((data) => data.length > 1)
        .map((data) => data
            .filter(({ lat, confirmed, country }) => lat !== null && country !== "US" && confirmed > 10000));
    //data from US    
    const usProvinces = provincesData
        .filter((data) => data.length > 1)
        .map((data) => data
            .filter(({ lat, confirmed, country }) => lat !== null && country === "US" && confirmed > 50000));

    //format number with separator 
    const formatNumber = inputNumber => {
        let formetedNumber = (Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let splitArray = formetedNumber.split('.');
        if (splitArray.length > 1) {
            formetedNumber = splitArray[0];
        }
        return (formetedNumber);
    };

    //toggle map togglers border bottom
    let { calmulativeStyle, activeStyle, incidentRateStyle } = {};
    const onStyle = { borderBottom: "3px solid white", backgroundColor: "#240090" };
    calmulativeStyle = isMap === "calmulative" ?
        onStyle :
        {}
    activeStyle = isMap === "active" ?
        onStyle :
        {}
    incidentRateStyle = isMap === "incidentRate" ?
        onStyle :
        {}

    return (
        <div>
            <div
                className={`${classes[3]}`}
                id="maps-toggler"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={mapExpand ? { width: "1410px", height: "735px", marginLeft: ".6em" } : { width: "740px", height: "420px" }}
            >
                <div className={"expand-shrink-icon-wrapper"} >
                    {
                        isHover
                            ? !mapExpand
                                ? <div style={{ top: "-6px", right: "-5px" }} onClick={() => setMapExpand(!mapExpand)} className={"expand-shrink-icon"}>{expandIcon}</div>
                                : <div style={{ top: "-6px", right: "-5px" }} onClick={() => setMapExpand(!mapExpand)} className={"expand-shrink-icon"}>{shrinkIcon}</div>
                            : null
                    }
                </div>
                <div id="maps-wrapper">
                    {
                        isMap === "calmulative"
                            ? <CamulativeMap mapExpand={mapExpand} classes={classes} noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                            : isMap === "active"
                                ? <ActiveMap noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                                : isMap === "incidentRate"
                                    ? <IncidentRate noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                                    : null
                    }
                </div>
                <div style={mapExpand ? { marginLeft: "1em" } : { marginLeft: ".2em" }} id="map-toggler">
                    <div className={"toggler"} style={calmulativeStyle} onClick={() => { setIsMap("calmulative") }}> Calmulative Cases </div>
                    <div className={"toggler"} style={activeStyle} onClick={() => { setIsMap("active") }} >Active Cases</div>
                    <div className={"toggler"} style={incidentRateStyle} onClick={() => { setIsMap("incidentRate") }} > Incident Rate </div>
                </div>
            </div >
        </div >
    )
}



export default Maps;