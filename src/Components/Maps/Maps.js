import React, { Fragment, useEffect, useState } from "react";

//components
import CumulativeMap from "./CumulativeMap/CumulativeMap";
import ActiveMap from "./ActiveMap/ActiveMap";
import IncidentRate from "./IncidentRate/IncidentRate";

import "./Maps.scss";

const Maps = ({ classes, provincesData, setMapExpand, mapExpand, expandIcon, shrinkIcon, isTablet, isMobile, isMap, setIsMap }) => {

    const [isHover, setIsHover] = useState(false);

    //check if data has been asinged to countries
    if (!provincesData[0]) {
        return "Loading..."
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
    let { cumulativeStyle, activeStyle, incidentRateStyle } = {};
    const onStyle = { borderBottom: "3px solid #d9e4f4", backgroundColor: "#295897" };
    cumulativeStyle = isMap === "cumulative" ?
        onStyle :
        {}
    activeStyle = isMap === "active" ?
        onStyle :
        {}
    incidentRateStyle = isMap === "incidentRate" ?
        onStyle :
        {}

    return (
        <Fragment>
            {/* Desktop */}
            <div
                className={`map-container${isTablet || isMobile ? "-hide" : ""}`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {
                    isHover
                        ? !mapExpand
                            ? <div className={"expand-icon"}
                                onClick={() => {
                                    setMapExpand(true)
                                    setIsMap("")
                                    setTimeout(() => { setIsMap("cumulative") })
                                }}>
                                {expandIcon}
                            </div>
                            : <div className={"shrink-icon"} onClick={() => setMapExpand(false)}>{shrinkIcon}</div>
                        : null
                }
                {
                    isMap === "cumulative"
                        ? <CumulativeMap mapExpand={mapExpand} classes={classes} noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                        : isMap === "active"
                            ? <ActiveMap noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                            : isMap === "incidentRate"
                                ? <IncidentRate noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                                : null
                }

            </div>
            <div className={`button-toggler-wrapper${mapExpand ? "-expand" : isTablet || isMobile ? "-hide" : ""}`}>
                <div style={cumulativeStyle} className={`button-toggler`} onClick={() => setIsMap("cumulative")}>Cumulative Cases</div>
                <div style={activeStyle} className={`button-toggler`} onClick={() => setIsMap("active")}>Active Cases</div>
                <div style={incidentRateStyle} className={`button-toggler`} onClick={() => setIsMap("incidentRate")}>Incident Rate</div>
            </div>

            {/* Tablet */}
            <div className={`map-container${isTablet ? "-tablet-version" : isMobile ? "-hide" : "-tablet"}`}>
                {
                    isHover
                        ? !mapExpand
                            ? <div className={"expand-icon"}
                                onClick={() => {
                                    setMapExpand(true)
                                    setIsMap("")
                                    setTimeout(() => { setIsMap("cumulative") })
                                }}>
                                {expandIcon}
                            </div>
                            : <div className={"shrink-icon"} onClick={() => setMapExpand(false)}>{shrinkIcon}</div>
                        : null
                }
                {
                    isMap === "cumulative"
                        ? <CumulativeMap mapExpand={mapExpand} classes={classes} noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                        : isMap === "active"
                            ? <ActiveMap noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                            : isMap === "incidentRate"
                                ? <IncidentRate noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                                : null
                }

            </div>
            <div className={`button-toggler-wrapper${isTablet ? "-tablet-version" : isMobile ? "-hide" : "-tablet"}`}>
                <div style={cumulativeStyle} className={`button-toggler`} onClick={() => setIsMap("cumulative")}>Cumulative Cases</div>
                <div style={activeStyle} className={`button-toggler`} onClick={() => setIsMap("active")}>Active Cases</div>
                <div style={incidentRateStyle} className={`button-toggler`} onClick={() => setIsMap("incidentRate")}>Incident Rate</div>
            </div>

            {/* Mobile */}
            <div className={`map-container${isMobile ? "-mobile-version" : isTablet ? "-hide" : "-mobile"}`}>
                {
                    isHover
                        ? !mapExpand
                            ? <div className={"expand-icon"}
                                onClick={() => {
                                    setMapExpand(true)
                                    setIsMap("")
                                    setTimeout(() => { setIsMap("cumulative") })
                                }}>
                                {expandIcon}
                            </div>
                            : <div className={"shrink-icon"} onClick={() => setMapExpand(false)}>{shrinkIcon}</div>
                        : null
                }
                {
                    isMap === "cumulative"
                        ? <CumulativeMap mapExpand={mapExpand} classes={classes} noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                        : isMap === "active"
                            ? <ActiveMap noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                            : isMap === "incidentRate"
                                ? <IncidentRate noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                                : null
                }

            </div>
        </Fragment>
    )
}



export default Maps;