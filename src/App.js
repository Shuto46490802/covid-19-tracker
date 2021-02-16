import React, { useState, useEffect, Fragment } from "react";

//Components 
import CountryPicker from "./Components/CountryPicker/CountryPicker";
import GlobalCharts from "./Components/Charts/GlobalCharts";
import CountryCharts from "./Components/Charts/CountryCharts";
import GlobalTodayCharts from "./Components/Charts/GlobalTodayCharts";
import Maps from "./Components/Maps/Maps";
import InfectedCard from "./Components/Cards/InfectedCard/InfectedCard";
import DeathsRecoveredCard from "./Components/Cards/DeathsRecoveredCard/DeathsRecoveredCard";
import ActiveIncidentRateCard from "./Components/Cards/ActiveIncidentRateCard/ActiveIncidentRateCard";
import InfoPanel from "./Components/InfoPanel/InfoPanel";
import PopupNavBars from "./Components/PopupNavBars/PopupNavBars";
import MobileButtonToggler from "./Components/MobileButtonToggler/MobileButtonToggler";

import "./css/App.scss";

import { fetchProvinceData, fetchCountriesData, fetchGlobaldata, fetchCountriesYearlyData } from "./api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { faCompressArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';



import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const arrowLeft = < FontAwesomeIcon icon={faCaretLeft} />
const arrowRight = < FontAwesomeIcon icon={faCaretRight} />
const expandIcon = < FontAwesomeIcon icon={faExpandArrowsAlt} />
const shrinkIcon = < FontAwesomeIcon icon={faCompressArrowsAlt} />
const dropdown = < FontAwesomeIcon icon={faSortDown} />


const App = () => {

    //Fetch API Datas
    const [globalData, setGlobaldata] = useState({})
    const [country, setCountry] = useState("select a country");
    const [countriesData, setCountriesData] = useState({});
    const [provincesData, setProvincesData] = useState();
    const [countriesYearlyData, setCountriesYearlyData] = useState({});

    //Expand or Hide
    const [infectedCardExpand, setInfectedCardExpand] = useState(false);
    const [deathsdCardExpand, setDeathsCardExpand] = useState(false);
    const [activeCardExpand, setActiveCardExpand] = useState(false);
    const [mapExpand, setMapExpand] = useState(false);
    const [dataPanelExpand, setDataPanelExpand] = useState(false);
    const [globalDailyChartExpand, setGlobalDailyChartExpand] = useState(false);
    const [globalChartExpand, setGlobalChartExpand] = useState(false);

    //Hover Expand and Shrink Icons
    const [isPanelHover, setIsPanelHover] = useState(false);
    const [isTodayChartHover, setIsTodayChartHover] = useState(false);

    //Toggle Map 
    const [isMap, setIsMap] = useState("cumulative");

    //Toggle Cards
    const [isInfectedCard, setIsInfectedCard] = useState("admin0");
    const [isDeathsRecoveredCard, setIsDeathsRecoveredCard] = useState("deaths");
    const [isActiveIncidentCard, setIsActiveIncidentCard] = useState("active");

    //Toggle Charts
    const [isGlobalChart, setIsGlobalChart] = useState("infected");
    const [isGlobalTodayChart, setGlobalTodayChart] = useState("infected");
    const [isCountryChart, setIsCountryChart] = useState("infected");

    //Tablet or Mobile Version
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    //Toggle Mobile Items
    const [mobileItem, setMobileItem] = useState("totals")

    //Toggle Item within Mobile Items
    const [isGlobal, setIsGlobal] = useState("infected");
    const [isChart, setIsChart] = useState("globalChart");

    //Loader
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
                    fontSize: 10
                }
            }],
            yAxes: [{
                ticks: {
                    maxTicksLimit: 8,
                    callback: function numFormatter(num) {
                        if (num > 999 && num < 1000000) {
                            return Math.floor((num / 1000).toFixed(1)) + 'K';
                        } else if (num >= 10000000) {
                            return Math.floor((num / 1000000).toFixed(1)) + 'M';
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
            ? ["expand", "hide", "hide", "hide", "hide", "hide", "hide"]
            : dataPanelExpand
                ? ["hide", "expand", "hide", "hide", "hide", "hide", "hide"]
                : mapExpand
                    ? ["hide", "hide", "expand", "hide", "hide", "hide", "hide"]
                    : globalDailyChartExpand
                        ? ["hide", "hide", "hide", "expand", "hide", "hide", "hide"]
                        : deathsdCardExpand
                            ? ["hide", "hide", "hide", "hide", "expand", "hide", "hide"]
                            : activeCardExpand
                                ? ["hide", "hide", "hide", "hide", "hide", "expand", "hide"]
                                : globalChartExpand
                                    ? ["hide", "hide", "hide", "hide", "hide", "hide", "expand"]
                                    : ["", "", "", "", "", "", ""];

    const columnClasses =
        infectedCardExpand || dataPanelExpand
            ? ["expand", "hide", "hide"]
            : mapExpand || globalDailyChartExpand
                ? ["hide", "expand", "hide"]
                : deathsdCardExpand || activeCardExpand || globalChartExpand
                    ? ["hide", "hide", "expand"]
                    : ["", "", ""];

    return (
        <div className={`app${isTablet ? "-tablet-version" : isMobile ? "-mobile-version" : ""}`} >
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
                    <p className={"nav-text"}>Global Map</p>
                    <p className={"nav-text"}>Country Map</p>
                    <div id="popup-nav-bars">
                        <PopupNavBars
                            isTablet={isTablet}
                            setIsTablet={setIsTablet}
                            isMobile={isMobile}
                            setIsMobile={setIsMobile}
                            setIsMap={setIsMap}
                            setInfectedCardExpand={setInfectedCardExpand}
                            setDeathsCardExpand={setDeathsCardExpand}
                            setActiveCardExpand={setActiveCardExpand}
                            setMapExpand={setMapExpand}
                            setDataPanelExpand={setDataPanelExpand}
                            setGlobalDailyChartExpand={setGlobalDailyChartExpand}
                            setGlobalChartExpand={setGlobalChartExpand}
                            dropdown={dropdown}
                        />
                    </div>
                </div>
            </header>

            <div className={`desktop${isTablet || isMobile ? "-hide" : ""}`} >
                <div
                    className={`column${columnClasses[0]} column1`}
                >
                    <div
                        id={"infected-card"}
                        className={classes[0]}
                    >
                        <InfectedCard
                            countriesData={countriesData}
                            globalData={globalData}
                            provincesData={provincesData}
                            arrowLeft={arrowLeft}
                            arrowRight={arrowRight}
                            infectedCardExpand={infectedCardExpand}
                            setInfectedCardExpand={setInfectedCardExpand}
                            expandIcon={expandIcon}
                            shrinkIcon={shrinkIcon}
                            formatNumber={formatNumber}
                            classes={classes}
                            isTablet={isTablet}
                            isMobile={isMobile}
                            isInfectedCard={isInfectedCard}
                            setIsInfectedCard={setIsInfectedCard}
                        />
                    </div>
                    <div
                        id="info-panel"
                        className={classes[1]}
                        onMouseEnter={() => setIsPanelHover(true)}
                        onMouseLeave={() => setIsPanelHover(false)}
                    >
                        {
                            isPanelHover
                                ? !dataPanelExpand
                                    ? <div className={"expand-icon"} onClick={() => { setDataPanelExpand(true) }}>{expandIcon}</div>
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
                            isTablet={isTablet}
                            isMobile={isMobile}
                        />
                    </div>
                </div>
                <div className={`column${columnClasses[1]} column2`}>
                    <div
                        id="map"
                        className={classes[2]}
                    >
                        <Maps
                            classes={classes}
                            provincesData={provincesData}
                            setMapExpand={setMapExpand}
                            mapExpand={mapExpand}
                            expandIcon={expandIcon}
                            shrinkIcon={shrinkIcon}
                            isTablet={isTablet}
                            isMobile={isMobile}
                            isMap={isMap}
                            setIsMap={setIsMap}
                        />
                    </div>
                    <div
                        id="country-picker-chart"
                        className={classes[3]}
                        onMouseEnter={() => setIsTodayChartHover(true)}
                        onMouseLeave={() => setIsTodayChartHover(false)}
                    >
                        {
                            isTodayChartHover
                                ? !globalDailyChartExpand
                                    ? <div className={"expand-icon"} onClick={() => setGlobalDailyChartExpand(true)}>{expandIcon}</div>
                                    : <div className={"shrink-icon"} onClick={() => setGlobalDailyChartExpand(false)}>{shrinkIcon}</div>
                                : null
                        }
                        <div id="country-picker">
                            <CountryPicker
                                classes={classes}
                                toggleCountry={toggleCountry}
                                globalDailyChartExpand={globalDailyChartExpand}
                                isTablet={isTablet}
                                isMobile={isMobile}
                                country={country}
                            />
                        </div>
                        <div id="country-chart">
                            {
                                country === "select a country"
                                    ? <GlobalTodayCharts
                                        globalData={globalData}
                                        arrowRight={arrowRight}
                                        arrowLeft={arrowLeft}
                                        option={option}
                                        classes={classes}
                                        globalDailyChartExpand={globalDailyChartExpand}
                                        isTablet={isTablet}
                                        isMobile={isMobile}
                                    />
                                    : <CountryCharts
                                        countriesYearlyData={countriesYearlyData}
                                        arrowLeft={arrowLeft}
                                        arrowRight={arrowRight}
                                        option={option}
                                        classes={classes}
                                        globalDailyChartExpand={globalDailyChartExpand}
                                        isTablet={isTablet}
                                        isMobile={isMobile}
                                        isCountryChart={isCountryChart}
                                        setIsCountryChart={setIsCountryChart}
                                    />
                            }
                        </div>
                    </div>
                </div>
                <div className={`column${columnClasses[2]} column3`}>
                    <div className={`row${globalChartExpand ? "-hide" : ""}`} >
                        <div
                            id="deaths-recovered-card"
                            className={classes[4]}
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
                                isTablet={isTablet}
                                isMobile={isMobile}
                                isDeathsRecoveredCard={isDeathsRecoveredCard}
                                setIsDeathsRecoveredCard={setIsDeathsRecoveredCard}
                            />
                        </div>
                        <div
                            id="active-incident-card"
                            className={classes[5]}
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
                                isTablet={isTablet}
                                isMobile={isMobile}
                                isActiveIncidentCard={isActiveIncidentCard}
                                setIsActiveIncidentCard={setIsActiveIncidentCard}
                            />
                        </div>
                    </div>
                    <div
                        id="global-chart"
                        className={classes[6]}
                    >
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
                            isTablet={isTablet}
                            isMobile={isMobile}
                            isGlobalChart={isGlobalChart}
                            setIsGlobalChart={setIsGlobalChart}
                        />
                    </div>
                </div>
            </div>

            {/* Tablet */}
            <div className={`tablet${isTablet ? "-version" : isMobile ? "-hide" : "-responsive"}`}>
                <div className={"tablet-item"} id="map-tablet">
                    <Maps
                        classes={classes}
                        provincesData={provincesData}
                        setMapExpand={setMapExpand}
                        mapExpand={mapExpand}
                        expandIcon={expandIcon}
                        shrinkIcon={shrinkIcon}
                        isMap={isMap}
                        setIsMap={setIsMap}
                        isTablet={isTablet}
                        isMobile={isMobile}
                    />
                </div>
                <div className={"tablet-item"} id={"infected-card-tablet"}>
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
                        isTablet={isTablet}
                        isMobile={isMobile}
                        isInfectedCard={isInfectedCard}
                        setIsInfectedCard={setIsInfectedCard}
                    />
                </div>
                <div className={"deaths-active-card tablet-item"}>
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
                        isTablet={isTablet}
                        isMobile={isMobile}
                        isDeathsRecoveredCard={isDeathsRecoveredCard}
                        setIsDeathsRecoveredCard={setIsDeathsRecoveredCard}
                    />
                </div>
                <div className={"deaths-active-card tablet-item"}>
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
                        isTablet={isTablet}
                        isMobile={isMobile}
                        isActiveIncidentCard={isActiveIncidentCard}
                        setIsActiveIncidentCard={setIsActiveIncidentCard}
                    />
                </div>
                <div id="country-picker-chart" className={"tablet-item"}>
                    <div id="country-picker">
                        <CountryPicker
                            classes={classes}
                            toggleCountry={toggleCountry}
                            isTablet={isTablet}
                            isMobile={isMobile}
                            country={country}
                        />
                    </div>
                    <div id="country-chart">
                        {
                            country === "select a country"
                                ? <GlobalTodayCharts
                                    globalData={globalData}
                                    arrowRight={arrowRight}
                                    arrowLeft={arrowLeft}
                                    option={option}
                                    classes={classes}
                                    globalDailyChartExpand={globalDailyChartExpand}
                                    isTablet={isTablet}
                                    isMobile={isMobile}
                                    isCountryChart={isCountryChart}
                                    setIsCountryChart={setIsCountryChart}
                                />
                                : <CountryCharts
                                    countriesYearlyData={countriesYearlyData}
                                    arrowLeft={arrowLeft}
                                    arrowRight={arrowRight}
                                    option={option}
                                    classes={classes}
                                    globalDailyChartExpand={globalDailyChartExpand}
                                    isTablet={isTablet}
                                    isMobile={isMobile}
                                    isCountryChart={isCountryChart}
                                    setIsCountryChart={setIsCountryChart}
                                />
                        }
                    </div>
                </div>
                <div id="global-chart" className={"tablet-item"}>
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
                        isTablet={isTablet}
                        isMobile={isMobile}
                        isGlobalChart={isGlobalChart}
                        setIsGlobalChart={setIsGlobalChart}
                    />
                </div>
                <div id="info-panel" className={"tablet-item"}>
                    <InfoPanel
                        globalData={globalData}
                        countriesData={countriesData}
                        provincesData={provincesData}
                        formatNumber={formatNumber}
                        isTablet={isTablet}
                        isMobile={isMobile}
                    />
                </div>
            </div>

            {/* Mobile */}
            <div className={`mobile${isMobile ? "-version" : isTablet ? "-hide" : "-responsive"}`}>
                <div className={"mobile-item"}>
                    {
                        mobileItem === "totals"
                            ? <InfoPanel
                                globalData={globalData}
                                countriesData={countriesData}
                                provincesData={provincesData}
                                formatNumber={formatNumber}
                                isTablet={isTablet}
                                isMobile={isMobile}
                            />
                            : mobileItem === "map"
                                ? <Maps
                                    classes={classes}
                                    provincesData={provincesData}
                                    setMapExpand={setMapExpand}
                                    mapExpand={mapExpand}
                                    expandIcon={expandIcon}
                                    shrinkIcon={shrinkIcon}
                                    isMap={isMap}
                                    setIsMap={setIsMap}
                                    isTablet={isTablet}
                                    isMobile={isMobile}
                                />
                                : mobileItem === "global"
                                    ? isGlobal === "infected"
                                        ? <InfectedCard
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
                                            isTablet={isTablet}
                                            isMobile={isMobile}
                                            isInfectedCard={isInfectedCard}
                                            setIsInfectedCard={setIsInfectedCard}
                                        />
                                        : isGlobal === "deathsRecovered"
                                            ? <DeathsRecoveredCard
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
                                                isTablet={isTablet}
                                                isMobile={isMobile}
                                                isDeathsRecoveredCard={isDeathsRecoveredCard}
                                                setIsDeathsRecoveredCard={setIsDeathsRecoveredCard}
                                            />
                                            : isGlobal === "activeIncidentRate"
                                                ? <ActiveIncidentRateCard
                                                    provincesData={provincesData}
                                                    classes={classes}
                                                    arrowLeft={arrowLeft}
                                                    arrowRight={arrowRight}
                                                    activeCardExpand={activeCardExpand}
                                                    setActiveCardExpand={setActiveCardExpand}
                                                    expandIcon={expandIcon}
                                                    shrinkIcon={shrinkIcon}
                                                    formatNumber={formatNumber}
                                                    isTablet={isTablet}
                                                    isMobile={isMobile}
                                                    isActiveIncidentCard={isActiveIncidentCard}
                                                    setIsActiveIncidentCard={setIsActiveIncidentCard}
                                                />
                                                : null
                                    : mobileItem === "countries"
                                        ? <Fragment>
                                            <div className={"country-picker"}>
                                                <CountryPicker
                                                    classes={classes}
                                                    toggleCountry={toggleCountry}
                                                    isTablet={isTablet}
                                                    isMobile={isMobile}
                                                />
                                            </div>
                                            <div className={"country-charts"}>
                                                <CountryCharts
                                                    countriesYearlyData={countriesYearlyData}
                                                    arrowLeft={arrowLeft}
                                                    arrowRight={arrowRight}
                                                    option={option}
                                                    classes={classes}
                                                    globalDailyChartExpand={globalDailyChartExpand}
                                                    isTablet={isTablet}
                                                    isMobile={isMobile}
                                                    isCountryChart={isCountryChart}
                                                    setIsCountryChart={setIsCountryChart}
                                                />
                                            </div>
                                        </Fragment>
                                        : mobileItem === "charts"
                                            ? isChart === "globalChart"
                                                ? <GlobalCharts
                                                    globalData={globalData}
                                                    arrowLeft={arrowLeft}
                                                    arrowRight={arrowRight}
                                                    option={option}
                                                    classes={classes}
                                                    globalChartExpand={globalChartExpand}
                                                    setGlobalChartExpand={setGlobalChartExpand}
                                                    expandIcon={expandIcon}
                                                    shrinkIcon={shrinkIcon}
                                                    isTablet={isTablet}
                                                    isMobile={isMobile}
                                                    isGlobalChart={isGlobalChart}
                                                    setIsGlobalChart={setIsGlobalChart}
                                                />
                                                : isChart === "dailyChart"
                                                    ? <GlobalTodayCharts
                                                        globalData={globalData}
                                                        arrowRight={arrowRight}
                                                        arrowLeft={arrowLeft}
                                                        option={option}
                                                        classes={classes}
                                                        globalDailyChartExpand={globalDailyChartExpand}
                                                        isTablet={isTablet}
                                                        isMobile={isMobile}
                                                        isGlobalTodayChart={isGlobalTodayChart}
                                                    />
                                                    : null
                                            : null
                    }
                </div>
                <MobileButtonToggler
                    setMobileItem={setMobileItem}
                    setIsMap={setIsMap}
                    mobileItem={mobileItem}
                    dropdown={dropdown}
                    setIsGlobal={setIsGlobal}
                    setIsChart={setIsChart}
                    arrowLeft={arrowLeft}
                    setIsInfectedCard={setIsInfectedCard}
                    setIsDeathsRecoveredCard={setIsDeathsRecoveredCard}
                    setIsActiveIncidentCard={setIsActiveIncidentCard}
                    setIsGlobalChart={setIsGlobalChart}
                    setGlobalTodayChart={setGlobalTodayChart}
                    setIsCountryChart={setIsCountryChart}
                />
            </div>
        </div>
    )
};

export default App;