import React, { useState, useEffect } from "react";

//Components 
import CountryPicker from "./Components/CountryPicker";
import GlobalCharts from "./Components/Charts/GlobalCharts";
import CountryCharts from "./Components/Charts/CountryCharts";
import GlobalTodayCharts from "./Components/Charts/GlobalTodayCharts";
import Maps from "./Components/Maps/Maps";
import InfectedCard from "./Components/Cards/InfectedCard/InfectedCard";
import DeathsRecoveredCard from "./Components/Cards/DeathsRecoveredCard/DeathsRecoveredCard";
import ActiveIncidentRateCard from "./Components/Cards/ActiveIncidentRateCard/ActiveIncidentRateCard";
import InfoPanel from "./Components/InfoPanel"

import "./css/App.scss";

import { fetchProvinceData, fetchCountriesData, fetchGlobaldata, fetchCountriesYearlyData } from "./api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faTumblrSquare } from '@fortawesome/free-brands-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { faCompressArrowsAlt } from '@fortawesome/free-solid-svg-icons';

import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const github = < FontAwesomeIcon icon={faGithubSquare} />
const twitter = < FontAwesomeIcon icon={faTwitterSquare} />
const tumblr = < FontAwesomeIcon icon={faTumblrSquare} />
const arrowLeft = < FontAwesomeIcon icon={faCaretLeft} />
const arrowRight = < FontAwesomeIcon icon={faCaretRight} />
const expandIcon = < FontAwesomeIcon icon={faExpandArrowsAlt} />
const shrinkIcon = < FontAwesomeIcon icon={faCompressArrowsAlt} />

const App = () => {

    const [globalData, setGlobaldata] = useState({})
    const [country, setCountry] = useState("select a country");
    const [countriesData, setCountriesData] = useState({});
    const [provincesData, setProvincesData] = useState();
    const [countriesYearlyData, setCountriesYearlyData] = useState({});

    const [infectedCardExpand, setInfectedCardExpand] = useState(false);
    const [deathsdCardExpand, setDeathsCardExpand] = useState(false);
    const [activeCardExpand, setActiveCardExpand] = useState(false);
    const [mapExpand, setMapExpand] = useState(false);
    const [dataPanelExpand, setDataPanelExpand] = useState(false);
    const [globalDailyChartExpand, setGlobalDailyChartExpand] = useState(false);
    const [globalChartExpand, setGlobalChartExpand] = useState(false);
    const [countryChartExpand, setCountryChartExpand] = useState(false);

    const [isPanelHover, setIsPanelHover] = useState(false);
    const [isTodayChartHover, setIsTodayChartHover] = useState(false);
    const [isGlobalChartHover, setIsGlobalChartHover] = useState(false);

    const [isLoad, setIsLoad] = useState(true)

    useEffect(() => {
        const fetchAPI = async () => {
            setProvincesData(await fetchProvinceData());
            setCountriesData(await fetchCountriesData());
            setGlobaldata(await fetchGlobaldata());
        }
        fetchAPI();
    }, [setCountriesData]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoad(false)
        }, 2000)
    })

    const loader = <Loader
        type="Bars"
        color="#3500D3"
        height={100}
        width={100}
        timeout={2000}
    />

    if (isLoad || !globalData[0]) {
        return (
            <div className={"loader-wrapper"}>
                <div className={"loader"}>
                    {loader}
                </div>
                <div className={"loading"}>
                    Loading ...
                </div>
            </div>
        )
    }

    //country picker
    const toggleCountry = async (country) => {
        setCountry(country);
        setCountriesYearlyData(await fetchCountriesYearlyData(country));
    };

    // separate number with separator
    const formatNumber = inputNumber => {
        let formetedNumber = (Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let splitArray = formetedNumber.split('.');
        if (splitArray.length > 1) {
            formetedNumber = splitArray[0];
        }
        return (formetedNumber);
    };

    //format for chart d
    const option = {
        maintainAspectRatio: false,
        legend: { display: false },
        tooltips: {
            xPadding: 15,
            yPadding: 15,
            yAlign: "bottom",
            callbacks: {
                title: (items, data) => data['labels'][items[0]['index']],
                label: (item, data) => formatNumber(data['datasets'][0]['data'][item['index']])
            }
        },
        scales: {
            xAxes: [{
                type: "time",
                gridLines: {
                    color: "#f5f5f5",
                    zeroLineColor: "#f5f5f5"
                },
                ticks: {
                    maxTicksLimit: 6,
                    fontColor: "#f5f5f5",
                }
            }],
            yAxes: [{
                ticks: {
                    maxTicksLimit: 8,
                    callback: function numFormatter(num) {
                        if (num > 999 && num < 1000000) {
                            return (num / 1000).toFixed(1) + 'K';
                        } else if (num >= 1000000) {
                            return (num / 1000000).toFixed(1) + 'M';
                        } else if (num < 900) {
                            return num;
                        }
                    },
                    fontColor: "#f5f5f5",
                },
                gridLines: {
                    color: "#f5f5f5",
                    zeroLineColor: "#f5f5f5"
                }
            }]
        }
    };

    //toggle expand and hide
    const classes =
        infectedCardExpand
            ? ["expand", "hide", "hide", "hide", "hide", "hide", "hide", "hide"]
            : deathsdCardExpand
                ? ["hide", "expand", "hide", "hide", "hide", "hide", "hide", "hide"]
                : activeCardExpand
                    ? ["hide", "hide", "expand", "hide", "hide", "hide", "hide", "hide"]
                    : mapExpand
                        ? ["hide", "hide", "hide", "expand", "hide", "hide", "hide", "hide"]
                        : dataPanelExpand
                            ? ["hide", "hide", "hide", "hide", "expand", "hide", "hide", "hide"]
                            : globalDailyChartExpand
                                ? ["hide", "hide", "hide", "hide", "hide", "expand", "hide", "hide"]
                                : globalChartExpand
                                    ? ["hide", "hide", "hide", "hide", "hide", "hide", "expand", "hide"]
                                    : countryChartExpand
                                        ? ["hide", "hide", "hide", "hide", "hide", "hide", "hide", "expand"]
                                        : [];

    return (
        <div id="app">
            <header>
                <img src="https://www.tiabc.ca/wp-content/uploads/home/COVID%E2%80%9419.png" alt="covid-19 logo" />
                <div id="header-title">
                    <h1>World COVID-19 Dashboard</h1>
                    <span id="header-border"></span>
                    <div id="header-footer">
                        <span>Desinged and Coded</span>
                        <span>by Shuto.S</span>
                    </div>
                </div>
                <div id="nav">
                    <div>
                        <a src="https://github.com/Shuto46490802" target="_blank">{github}</a>
                    </div>
                    <div>
                        <a src="https://twitter.com/" target="_blank" >{twitter}</a>
                    </div>
                    <div>
                        <a src="https://www.tumblr.com/" target="_blank" >{tumblr}</a>
                    </div>
                </div>
            </header>
            <main id="laptop">
                <div className={"row"}>
                    <div
                        id={"infected-card"}
                        className={classes[0]}
                        style={infectedCardExpand ? { width: "100%", height: "93vh" } : {}}
                    >
                        <InfectedCard
                            countriesData={countriesData}
                            globalData={globalData}
                            provincesData={provincesData}
                            arrowLeft={arrowLeft}
                            arrowRight={arrowRight}
                            infectedCardExpand={infectedCardExpand}
                            expandIcon={expandIcon}
                            shrinkIcon={shrinkIcon}
                            setInfectedCardExpand={setInfectedCardExpand}
                            formatNumber={formatNumber}
                        />
                    </div>
                    <div
                        id="map"
                        className={classes[3]}
                        style={mapExpand ? { width: "98%", height: "89vh" } : { width: "770px",  }}
                    >
                        <Maps
                            classes={classes}
                            provincesData={provincesData}
                            setMapExpand={setMapExpand}
                            mapExpand={mapExpand}
                            expandIcon={expandIcon}
                            shrinkIcon={shrinkIcon}
                        />
                    </div>
                    <div
                        className={`deaths-active-card ${classes[1]}`}
                        style={deathsdCardExpand ? { width: "100%", height: "93vh" } : {}}
                    >
                        <DeathsRecoveredCard
                            countriesData={countriesData}
                            globalData={globalData}
                            classes={classes}
                            arrowLeft={arrowLeft}
                            arrowRight={arrowRight}
                            deathsdCardExpand={deathsdCardExpand}
                            setDeathsCardExpand={setDeathsCardExpand}
                            expandIcon={expandIcon}
                            shrinkIcon={shrinkIcon}
                            formatNumber={formatNumber}
                        />
                    </div>
                    <div
                        className={`deaths-active-card ${classes[2]}`}
                        style={activeCardExpand ? { width: "100%", height: "93vh" } : {}}
                    >
                        <ActiveIncidentRateCard
                            provincesData={provincesData}
                            classes={classes}
                            arrowLeft={arrowLeft}
                            arrowRight={arrowRight}
                            activeCardExpand={activeCardExpand}
                            setActiveCardExpand={setActiveCardExpand}
                            expandIcon={expandIcon}
                            shrinkIcon={shrinkIcon}
                            formatNumber={formatNumber}
                        />
                    </div>
                </div>
                <div className={"row"}>
                    <div
                        id="info-panel"
                        className={classes[4]}
                        onMouseEnter={() => setIsPanelHover(true)}
                        onMouseLeave={() => setIsPanelHover(false)}
                        style={dataPanelExpand ? { width: "95%", height: "91vh" } : {}}
                    >
                        {
                            isPanelHover
                                ? !dataPanelExpand
                                    ? <div className={"expand-icon"} onClick={() => setDataPanelExpand(true)}>{expandIcon}</div>
                                    : <div className={"shrink-icon"} onClick={() => setDataPanelExpand(false)}>{shrinkIcon}</div>
                                : null
                        }
                        <InfoPanel
                            globalData={globalData}
                            countriesData={countriesData}
                            provincesData={provincesData}
                            formatNumber={formatNumber}
                            classes={classes}
                            dataPanelExpand={dataPanelExpand}
                        />
                    </div>
                    <div
                        id="country-picker-chart"
                        className={classes[5]}
                        onMouseEnter={() => setIsTodayChartHover(true)}
                        onMouseLeave={() => setIsTodayChartHover(false)}
                        style={globalDailyChartExpand ? { width: "95%", height: "89vh", top: "30px" } : {}}
                    >
                        {
                            isTodayChartHover
                                ? !globalDailyChartExpand
                                    ? <div className={"expand-icon"} onClick={() => setGlobalDailyChartExpand(true)}>{expandIcon}</div>
                                    : <div className={"shrink-icon"} onClick={() => setGlobalDailyChartExpand(false)}>{shrinkIcon}</div>
                                : null
                        }
                        <CountryPicker
                            classes={classes}
                            toggleCountry={toggleCountry}
                        />
                        {
                            country === "select a country"
                                ? <GlobalTodayCharts
                                    globalData={globalData}
                                    arrowRight={arrowRight}
                                    arrowLeft={arrowLeft}
                                    option={option}
                                    classes={classes}
                                    globalDailyChartExpand={globalDailyChartExpand}
                                />
                                : <CountryCharts
                                    countriesYearlyData={countriesYearlyData}
                                    arrowLeft={arrowLeft}
                                    arrowRight={arrowRight}
                                    option={option}
                                    classes={classes}
                                    globalDailyChartExpand={globalDailyChartExpand}
                                />
                        }
                    </div>
                    <div
                        id="global-chart"
                        className={classes[6]}
                        onMouseEnter={() => setIsGlobalChartHover(true)}
                        onMouseLeave={() => setIsGlobalChartHover(false)}
                        style={globalChartExpand ? { width: "95%", height: "89vh", top: "30px" } : {}}
                    >
                        {
                            isGlobalChartHover
                                ? !globalChartExpand
                                    ? <div className={"expand-icon"} onClick={() => setGlobalChartExpand(true)}>{expandIcon}</div>
                                    : <div className={"shrink-icon"} onClick={() => setGlobalChartExpand(false)}>{shrinkIcon}</div>
                                : null
                        }
                        <GlobalCharts
                            globalData={globalData}
                            arrowLeft={arrowLeft}
                            arrowRight={arrowRight}
                            option={option}
                            classes={classes}
                            globalChartExpand={globalChartExpand}
                            setGlobalChartExpand={setGlobalChartExpand}
                            expandIcon={expandIcon}
                            shrinkIcon={shrinkIcon}
                        />
                    </div>
                </div>
            </main>

            <main id="mobile">
                <div id="map-mobile">
                    <Maps
                        classes={classes}
                        provincesData={provincesData}
                        setMapExpand={setMapExpand}
                        mapExpand={mapExpand}
                        expandIcon={expandIcon}
                        shrinkIcon={shrinkIcon}
                    />
                </div>
                <div id={"infected-card-mobile"}>
                    <InfectedCard
                        countriesData={countriesData}
                        globalData={globalData}
                        provincesData={provincesData}
                        arrowLeft={arrowLeft}
                        arrowRight={arrowRight}
                        infectedCardExpand={infectedCardExpand}
                        expandIcon={expandIcon}
                        shrinkIcon={shrinkIcon}
                        setInfectedCardExpand={setInfectedCardExpand}
                        formatNumber={formatNumber}
                    />
                </div>
                <div className={"deaths-active-card-mobile"}>
                    <DeathsRecoveredCard
                        countriesData={countriesData}
                        globalData={globalData}
                        classes={classes}
                        arrowLeft={arrowLeft}
                        arrowRight={arrowRight}
                        deathsdCardExpand={deathsdCardExpand}
                        setDeathsCardExpand={setDeathsCardExpand}
                        expandIcon={expandIcon}
                        shrinkIcon={shrinkIcon}
                        formatNumber={formatNumber}
                    />
                </div>
                <div className={"deaths-active-card-mobile"}>
                    <ActiveIncidentRateCard
                        provincesData={provincesData}
                        classes={classes}
                        arrowLeft={arrowLeft}
                        arrowRight={arrowRight}
                        activeCardExpand={activeCardExpand}
                        setActiveCardExpand={setActiveCardExpand}
                        expandIcon={expandIcon}
                        shrinkIcon={shrinkIcon}
                        formatNumber={formatNumber}
                    />
                </div>
                <div id="country-picker-chart-mobile">
                    <CountryPicker
                        classes={classes}
                        toggleCountry={toggleCountry}
                    />
                    {
                        country === "select a country"
                            ? <GlobalTodayCharts
                                globalData={globalData}
                                arrowRight={arrowRight}
                                arrowLeft={arrowLeft}
                                option={option}
                                classes={classes}
                                globalDailyChartExpand={globalDailyChartExpand}
                            />
                            : <CountryCharts
                                countriesYearlyData={countriesYearlyData}
                                arrowLeft={arrowLeft}
                                arrowRight={arrowRight}
                                option={option}
                                classes={classes}
                                globalDailyChartExpand={globalDailyChartExpand}
                            />
                    }
                </div>
                <div id="global-chart-mobile">
                    <GlobalCharts
                        globalData={globalData}
                        arrowLeft={arrowLeft}
                        arrowRight={arrowRight}
                        option={option}
                        classes={classes}
                        globalChartExpand={globalChartExpand}
                        setGlobalChartExpand={setGlobalChartExpand}
                        expandIcon={expandIcon}
                        shrinkIcon={shrinkIcon}
                    />
                </div>
                <div id="info-panel-mobile">
                    <InfoPanel
                        globalData={globalData}
                        countriesData={countriesData}
                        provincesData={provincesData}
                        formatNumber={formatNumber}
                    />
                </div>
            </main>
        </div>
    )
};

export default App;