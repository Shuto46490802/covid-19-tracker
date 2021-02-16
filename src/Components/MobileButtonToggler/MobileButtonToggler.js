import React, { useState, Fragment } from "react";

import "./MobileButtonToggler.scss"

const MobileButtonToggler = ({ setMobileItem, setIsMap, mobileItem, dropdown, setIsGlobal, setIsChart, arrowLeft, setIsInfectedCard, setIsDeathsRecoveredCard, setIsActiveIncidentCard, setIsGlobalChart, setGlobalTodayChart, setIsCountryChart }) => {

    //Toggle popup
    const [mapPopup, setMapPopup] = useState(false);
    const [globalPopup, setGlobalPopup] = useState(false);
    const [chartsPopup, setChartsPopup] = useState(false);

    //Toggle popup sub-items

    //Cards
    const [infectedPopup, setInfectedPopup] = useState(false);
    const [deathsRecoveredPopup, setDeathsRecoveredPopup] = useState(false);
    const [activeIncidentPopup, setActiveIncidentPopup] = useState(false);

    // Global Chart
    const [globalChartsPopup, setGlobalChartsPopup] = useState(false);

    //Daily Chart
    const [dailyChartsPopup, setDailyChartsPopup] = useState(false);

    //Country Chart
    const [countryChartsPopup, setCountryChartsPopup] = useState(false);

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

    //Popup items style
    let { infectedStyle, deathsRecoveredStyle, activeIncidentStyle, gloalChartsStyle, dailyChartsStyle } = {};
    const activeStyle = { backgroundColor: "#555" };
    infectedStyle = infectedPopup ? activeStyle : {} ;
    deathsRecoveredStyle = deathsRecoveredPopup ? activeStyle : {} ;
    activeIncidentStyle = activeIncidentPopup ? activeStyle : {} ;
    gloalChartsStyle = globalChartsPopup ? activeStyle : {} ;
    dailyChartsStyle = dailyChartsPopup ? activeStyle : {} ;


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
                        setCountryChartsPopup(false)
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
                        ? <div className={"popup-container"}>
                            <div className={"popup-items"}>
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
                        </div>
                        : null
                }
                <div
                    className={"button-toggler"}
                    onClick={() => {
                        setMobileItem("map")
                        setGlobalPopup(false)
                        setChartsPopup(false)
                        setCountryChartsPopup(false)
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
                                    style={infectedStyle}
                                    onClick={() => {
                                        setIsGlobal("infected")
                                        setInfectedPopup(!infectedPopup)
                                        setDeathsRecoveredPopup(false)
                                        setActiveIncidentPopup(false)
                                    }}>
                                    <div>Infected Cases</div>
                                    <div className={`arrow-icon${infectedPopup ? "-active" : ""}`}>{arrowLeft}</div>
                                </div>
                                <div
                                    className={"popup-item"}
                                    style={deathsRecoveredStyle}
                                    onClick={() => {
                                        setIsGlobal("deathsRecovered")
                                        setDeathsRecoveredPopup(!deathsRecoveredPopup)
                                        setInfectedPopup(false)
                                        setActiveIncidentPopup(false)
                                    }}>
                                    <div>Deaths/Recovered</div>
                                    <div className={`arrow-icon${deathsRecoveredPopup ? "-active" : ""}`}>{arrowLeft}</div>
                                </div>
                                <div
                                    className={"popup-item"}
                                    style={activeIncidentStyle}
                                    onClick={() => {
                                        setIsGlobal("activeIncidentRate")
                                        setActiveIncidentPopup(!activeIncidentPopup)
                                        setInfectedPopup(false)
                                        setDeathsRecoveredPopup(false)
                                    }}>
                                    <div>Active Cases/Incident Rate</div>
                                    <div className={`arrow-icon${activeIncidentPopup ? "-active" : ""}`}>{arrowLeft}</div>
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
                        setCountryChartsPopup(false)
                        if (mobileItem === "global") {
                            setGlobalPopup(!globalPopup)
                        }
                    }}
                    style={globalStyle}
                >
                    <div>Global</div>
                    {
                        mobileItem === "global"
                            ? <div className={`mobile-button-icon${globalPopup ? "-active" : ""}`}>
                                {dropdown}
                            </div>
                            : null
                    }
                </div>
            </div>

            {/* Countries */}
            <div className={"button-popup-container"}>
                {
                    countryChartsPopup
                        ? <div className={"popup-container"}>
                            <div className={"popup-items"}>
                                <div
                                    className={"popup-item"}
                                    onClick={() => {
                                        setCountryChartsPopup(!countryChartsPopup)
                                        setIsCountryChart("infected")
                                    }}>
                                    Infected
                                </div>
                                <div
                                    className={"popup-item"}
                                    onClick={() => {
                                        setCountryChartsPopup(!countryChartsPopup)
                                        setIsCountryChart("deaths")
                                    }}>
                                    Deaths
                                </div>
                                <div
                                    className={"popup-item"}
                                    onClick={() => {
                                        setCountryChartsPopup(!countryChartsPopup)
                                        setIsCountryChart("recovered")
                                    }}>
                                    Recovered
                                </div>
                            </div>
                        </div>
                        : null
                }
                <div
                    className={"button-toggler"}
                    onClick={() => {
                        setMobileItem("countries")
                        setMapPopup(false)
                        setGlobalPopup(false)
                        setChartsPopup(false)
                        if (mobileItem === "countries") {
                            setCountryChartsPopup(!countryChartsPopup)
                        }
                    }}
                    style={countriesStyle}
                >
                    Countries
                    {
                        mobileItem === "countries"
                            ? <div className={`mobile-button-icon${countryChartsPopup ? "-active" : ""}`}>
                                {dropdown}
                            </div>
                            : null
                    }
                </div>
            </div>

            {/* Charts */}
            <div className={"button-popup-container"}>
                {
                    chartsPopup
                        ? <div className={"popup-container"}>
                            <div className={"popup-items"}>
                                <div
                                    className={"popup-item"}
                                    style={gloalChartsStyle}
                                    onClick={() => {
                                        setIsChart("globalChart")
                                        setGlobalChartsPopup(!globalChartsPopup)
                                        setDailyChartsPopup(false)
                                    }}>
                                    <div>Global Charts</div>
                                    <div className={`arrow-icon${globalChartsPopup ? "-active" : ""}`}>{arrowLeft}</div>
                                </div>
                                <div
                                    className={"popup-item"}
                                    style={dailyChartsStyle}
                                    onClick={() => {
                                        setIsChart("dailyChart")
                                        setDailyChartsPopup(!dailyChartsPopup)
                                        setGlobalChartsPopup(false)
                                    }}>
                                    <div>Daily Charts</div>
                                    <div className={`arrow-icon${dailyChartsPopup ? "-active" : ""}`}>{arrowLeft}</div>
                                </div>
                            </div>
                            {
                                globalChartsPopup
                                    ? <div className={"popup-sub-items"}>
                                        <div
                                            className={"popup-sub-item"}
                                            onClick={() => {
                                                setChartsPopup(!chartsPopup)
                                                setGlobalChartsPopup(!globalChartsPopup)
                                                setIsGlobalChart("infected")
                                            }}>
                                            Infected Cases
                                        </div>
                                        <div
                                            className={"popup-sub-item"}
                                            onClick={() => {
                                                setChartsPopup(!chartsPopup)
                                                setGlobalChartsPopup(!globalChartsPopup)
                                                setIsGlobalChart("deaths")
                                            }}>
                                            Deaths
                                        </div>
                                        <div
                                            className={"popup-sub-item"}
                                            onClick={() => {
                                                setChartsPopup(!chartsPopup)
                                                setGlobalChartsPopup(!globalChartsPopup)
                                                setIsGlobalChart("recovered")
                                            }}>
                                            Recovered
                                        </div>
                                    </div>
                                    : dailyChartsPopup
                                        ? <div className={"popup-sub-items"}>
                                            <div
                                                className={"popup-sub-item"}
                                                onClick={() => {
                                                    setChartsPopup(!chartsPopup)
                                                    setDailyChartsPopup(!dailyChartsPopup)
                                                    setGlobalTodayChart("infected")
                                                }}>
                                                Infected Cases
                                            </div>
                                            <div
                                                className={"popup-sub-item"}
                                                onClick={() => {
                                                    setChartsPopup(!chartsPopup)
                                                    setDailyChartsPopup(!dailyChartsPopup)
                                                    setGlobalTodayChart("active")
                                                }}>
                                                Active Cases
                                            </div>
                                            <div
                                                className={"popup-sub-item"}
                                                onClick={() => {
                                                    setChartsPopup(!chartsPopup)
                                                    setDailyChartsPopup(!dailyChartsPopup)
                                                    setGlobalTodayChart("deaths")
                                                }}>
                                                Deaths
                                            </div>
                                            <div
                                                className={"popup-sub-item"}
                                                onClick={() => {
                                                    setChartsPopup(!chartsPopup)
                                                    setDailyChartsPopup(!dailyChartsPopup)
                                                    setGlobalTodayChart("recovered")
                                                }}>
                                                Recovered
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
                        setMobileItem("charts")
                        setMapPopup(false)
                        setGlobalPopup(false)
                        setCountryChartsPopup(false)
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