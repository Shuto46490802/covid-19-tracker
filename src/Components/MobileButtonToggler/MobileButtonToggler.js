import React, { useState, Fragment } from "react";

import "./MobileButtonToggler.scss"

const MobileButtonToggler = ({ setMobileItem, setIsMap, mobileItem, dropdown, setIsGlobal, setIsChart, arrowLeft, setIsInfectedCard, setIsDeathsRecoveredCard, setIsActiveIncidentCard }) => {

    const [mapPopup, setMapPopup] = useState(false);
    const [globalPopup, setGlobalPopup] = useState(false);
    const [chartsPopup, setChartsPopup] = useState(false);
    const [infectedPopup, setInfectedPopup] = useState(false);
    const [deathsRecoveredPopup, setDeathsRecoveredPopup] = useState(false);
    const [activeIncidentPopup, setActiveIncidentPopup] = useState(false);

    //toggle mobile items
    let {
        totalsStyle,
        mapStyle,
        countriesStyle,
        globalStyle,
        chartsStyle,
    } = {};
    const onStyle = { borderBottom: "3px solid #d9e4f4", backgroundColor: "#295897" };
    totalsStyle = mobileItem === "totals"
        ? onStyle
        : {}
    mapStyle = mobileItem === "map"
        ? onStyle
        : {}
    countriesStyle = mobileItem === "countries"
        ? onStyle
        : {}
    globalStyle = mobileItem === "global"
        ? onStyle
        : {}
    chartsStyle = mobileItem === "charts"
        ? onStyle
        : {}

    return (
        //totals
        <div className={"button-toggler-wrapper-mobile"}>
            <div className={"button-popup-container"}>
                <div
                    className={"button-toggler"}
                    onClick={() => {
                        setMobileItem("totals")
                        setMapPopup(false)
                        setGlobalPopup(false)
                        setChartsPopup(false)
                    }}
                    style={totalsStyle}
                >
                    Totals
                    </div>
            </div>

            {/* Map */}
            <div className={"button-popup-container"}>
                {
                    mapPopup
                        ? <div className={"popup-items"}>
                            <div
                                className={"popup-item"}
                                onClick={() => {
                                    setIsMap("cumulative")
                                    setMapPopup(!mapPopup)
                                }}>
                                Cumulative Cases
                                </div>
                            <div
                                className={"popup-item"}
                                onClick={() => {
                                    setIsMap("active")
                                    setMapPopup(!mapPopup)
                                }}>
                                Active Cases
                                </div>
                            <div
                                className={"popup-item"}
                                onClick={() => {
                                    setIsMap("incidentRate")
                                    setMapPopup(!mapPopup)
                                }}>
                                Incident Rate
                                </div>
                        </div>
                        : null
                }
                <div
                    className={"button-toggler"}
                    onClick={() => {
                        setMobileItem("map")
                        setGlobalPopup(false)
                        setChartsPopup(false)
                        if (mobileItem === "map") {
                            setMapPopup(!mapPopup)
                        }
                    }}
                    style={mapStyle}
                >
                    Map
                        {
                        mobileItem === "map"
                            ? <div className={`mobile-button-icon${mapPopup ? "-active" : ""}`}>
                                {dropdown}
                            </div>
                            : null
                    }
                </div>
            </div>

            {/* Global */}
            <div className={"button-popup-container"}>
                {
                    globalPopup
                        ? <div className={"popup-container"}>
                            <div className={"popup-items"}>
                                <div
                                    className={"popup-item"}
                                    onClick={() => {
                                        setIsGlobal("infected")
                                        setInfectedPopup(!infectedPopup)
                                        setDeathsRecoveredPopup(false)
                                        setActiveIncidentPopup(false)
                                    }}>
                                    <div>Infected Cases</div>
                                    <div className={"arrow-icon"}>{arrowLeft}</div>
                                </div>
                                <div
                                    className={"popup-item"}
                                    onClick={() => {
                                        setIsGlobal("deathsRecovered")
                                        setDeathsRecoveredPopup(!deathsRecoveredPopup)
                                        setInfectedPopup(false)
                                        setActiveIncidentPopup(false)
                                    }}>
                                    <div>Deaths/Recovered</div>
                                    <div className={"arrow-icon"}>{arrowLeft}</div>
                                </div>
                                <div
                                    className={"popup-item"}
                                    onClick={() => {
                                        setIsGlobal("activeIncidentRate")
                                        setActiveIncidentPopup(!activeIncidentPopup)
                                        setInfectedPopup(false)
                                        setDeathsRecoveredPopup(false)
                                    }}>
                                    <div>Active Cases/Incident Rate</div>
                                    <div className={"arrow-icon"}>{arrowLeft}</div>
                                </div>
                            </div>
                            {
                                infectedPopup
                                    ? <div className={"popup-sub-items"}>
                                        <div
                                            className={"popup-sub-item"}
                                            onClick={() => {
                                                setIsInfectedCard("admin0")
                                                setGlobalPopup(!globalPopup)
                                                setInfectedPopup(!infectedPopup)
                                            }}>
                                            Admin 0
                                        </div>
                                        <div
                                            className={"popup-sub-item"}
                                            onClick={() => {
                                                setIsInfectedCard("admin2")
                                                setGlobalPopup(!globalPopup)
                                                setInfectedPopup(!infectedPopup)
                                            }}>
                                            Admin 2
                                        </div>
                                        <div
                                            className={"popup-sub-item"}
                                            onClick={() => {
                                                setIsInfectedCard("today")
                                                setGlobalPopup(!globalPopup)
                                                setInfectedPopup(!infectedPopup)
                                            }}>
                                            Global Today's Cases
                                        </div>
                                    </div>
                                    : deathsRecoveredPopup
                                        ? <div className={"popup-sub-items"}>
                                            <div
                                                className={"popup-sub-item"}
                                                onClick={() => {
                                                    setIsDeathsRecoveredCard("deaths")
                                                    setGlobalPopup(!globalPopup)
                                                    setDeathsRecoveredPopup(!deathsRecoveredPopup)
                                                }}>
                                                Deaths
                                            </div>
                                            <div
                                                className={"popup-sub-item"}
                                                onClick={() => {
                                                    setIsDeathsRecoveredCard("recovered")
                                                    setGlobalPopup(!globalPopup)
                                                    setDeathsRecoveredPopup(!deathsRecoveredPopup)
                                                }}>
                                                Recovered
                                            </div>
                                            <div
                                                className={"popup-sub-item"}
                                                onClick={() => {
                                                    setIsDeathsRecoveredCard("today")
                                                    setGlobalPopup(!globalPopup)
                                                    setDeathsRecoveredPopup(!deathsRecoveredPopup)
                                                }}>
                                                Global Today's Deaths
                                            </div>
                                        </div>
                                        : activeIncidentPopup
                                            ? <div className={"popup-sub-items"}>
                                                <div
                                                    className={"popup-sub-item"}
                                                    onClick={() => {
                                                        setIsActiveIncidentCard("active")
                                                        setGlobalPopup(!globalPopup)
                                                        setActiveIncidentPopup(!activeIncidentPopup)
                                                    }}>
                                                    Active Cases
                                                </div>
                                                <div
                                                    className={"popup-sub-item"}
                                                    onClick={() => {
                                                        setIsActiveIncidentCard("incidentRate")
                                                        setGlobalPopup(!globalPopup)
                                                        setActiveIncidentPopup(!activeIncidentPopup)
                                                    }}>
                                                    Incident Rate
                                                </div>
                                            </div>
                                            : null
                            }
                        </div>
                        : null
                }
                <div
                    className={"button-toggler"}
                    onClick={() => {
                        setMobileItem("global")
                        setMapPopup(false)
                        setChartsPopup(false)
                        if (mobileItem === "global") {
                            setGlobalPopup(!globalPopup)
                        }
                    }}
                    style={globalStyle}
                >
                    <div>Global</div>
                    {
                        mobileItem === "global"
                            ? <div
                                className={`mobile-button-icon${globalPopup ? "-active" : ""}`}
                                onClick={() => { setGlobalPopup(!globalPopup) }}>
                                {dropdown}
                            </div>
                            : null
                    }
                </div>
            </div>

            {/* Countries */}
            <div className={"button-popup-container"}>
                <div
                    className={"button-toggler"}
                    onClick={() => {
                        setMobileItem("countries")
                        setMapPopup(false)
                        setGlobalPopup(false)
                        setChartsPopup(false)
                    }}
                    style={countriesStyle}
                >
                    Countries
                    </div>
            </div>

            {/* Charts */}
            <div className={"button-popup-container"}>
                {
                    chartsPopup
                        ? <div className={"popup-items"}>
                            <div
                                className={"popup-item"}
                                onClick={() => {
                                    setIsChart("globalChart")
                                    setChartsPopup(!chartsPopup)
                                }}>
                                <div>Global Charts</div>
                                <div className={"arrow-icon"}>{arrowLeft}</div>
                            </div>
                            <div
                                className={"popup-item"}
                                onClick={() => {
                                    setIsChart("dailyChart")
                                    setChartsPopup(!chartsPopup)
                                }}>
                                <div>Daily Charts</div>
                                <div className={"arrow-icon"}>{arrowLeft}</div>
                            </div>
                        </div>
                        : null
                }
                <div
                    className={"button-toggler"}
                    onClick={() => {
                        setMobileItem("charts")
                        setMapPopup(false)
                        setGlobalPopup(false)
                        if (mobileItem === "charts") {
                            setChartsPopup(!chartsPopup)
                        }
                    }}
                    style={chartsStyle}
                >
                    Charts
                    {
                        mobileItem === "charts"
                            ? <div className={`mobile-button-icon${chartsPopup ? "-active" : ""}`}>
                                {dropdown}
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
};

export default MobileButtonToggler;