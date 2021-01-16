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

import "./css/App.css";

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
    const [updatePanelExpand, setUpdatePanelExpand] = useState(false);
    const [globalDailyChartExpand, setGlobalDailyChartExpand] = useState(false);
    const [globalChartExpand, setGlobalChartExpand] = useState(false);
    const [countryChartExpand, setCountryChartExpand] = useState(false);

    const [isDataHover, setIsDataHover] = useState(false);
    const [isUpdateHover, setIsUpdateHover] = useState(false);
    const [isChartHover, setIsChartHover] = useState(false);

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
        }, 3000)
    })

    const loader = <Loader
        type="Bars"
        color="#3500D3"
        height={100}
        width={100}
        timeout={3000}
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

    // get formatted time for lastUpdate
    const getFormattedDate = () => {
        let lastUpdate = String(new Date(globalData[0].lastUpdate));
        let month = String(lastUpdate.slice(4, 7));
        switch (month) {
            case "Jan":
                month = "1"
                break;
            case "Feb":
                month = "2";
                break;
            case "Mar":
                month = "3";
                break;
            case "Apr":
                month = "4";
                break;
            case "May":
                month = "5";
                break;
            case "Jun":
                month = "6";
                break;
            case "Jul":
                month = "7";
                break;
            case "Aug":
                month = "8";
                break;
            case "Sep":
                month = "9";
                break;
            case "Oct":
                month = "10";
                break;
            case "Nov":
                month = "11";
                break;
            case "Dec":
                month = "12";
                break;
            default:
                month = "";
        };

        let day = String(lastUpdate.slice(8, 10));

        let year = String(lastUpdate.slice(11, 15));

        let hour = lastUpdate.slice(16, 18);
        let ampm = ""
        if (hour > 12) {
            hour -= 12
            ampm = "PM"
        } else {
            ampm = "AM"
        }
        let minute = String(lastUpdate.slice(19, 21))
        return month + "/" + day + "/" + year + "," + hour + ":" + minute + " " + ampm
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

    //format for chart 
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
            ? ["expand", "hide", "hide", "hide", "hide", "hide", "hide", "hide", "hide"]
            : deathsdCardExpand
                ? ["hide", "expand", "hide", "hide", "hide", "hide", "hide", "hide", "hide"]
                : activeCardExpand
                    ? ["hide", "hide", "expand", "hide", "hide", "hide", "hide", "hide", "hide"]
                    : mapExpand
                        ? ["hide", "hide", "hide", "expand", "hide", "hide", "hide", "hide", "hide"]
                        : dataPanelExpand
                            ? ["hide", "hide", "hide", "hide", "expand", "hide", "hide", "hide", "hide"]
                            : updatePanelExpand
                                ? ["hide", "hide", "hide", "hide", "hide", "expand", "hide", "hide", "hide"]
                                : globalDailyChartExpand
                                    ? ["hide", "hide", "hide", "hide", "hide", "hide", "expand", "hide", "hide"]
                                    : globalChartExpand
                                        ? ["hide", "hide", "hide", "hide", "hide", "hide", "hide", "expand", "hide"]
                                        : countryChartExpand
                                            ? ["hide", "hide", "hide", "hide", "hide", "hide", "hide", "hide", "expand"]
                                            : ["a", "a", "a", "a"];

    return (
        <div id="app-wrapper">
            <div id="header" className={"row"}>
                <img id="icon-covid" src="https://www.unmc.edu/_images/check-covid-icon.png" />
                <h1> World COVID-19 Dashbord </h1>
                <p> <span> Desinged and Coded </span> <span>by Shuto.S</span> </p>
                <div id="nav">
                    <a href="https://github.com/Shuto46490802" target="_blank" > {github} </a>
                    <a href="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22We%20must%20believe%20that%20we%20are%20gifted%20for%20something%2C%20and%20that%20this%20thing%2C%20at%20whatever%20cost%2C%20must%20be%20attained.%22%20Marie%20Curie" target="_blank" > {twitter} </a>
                    <a href="https://www.tumblr.com/" target="_blank" > {tumblr} </a>
                </div>
            </div>
            <div id="main">
                <div id="cards-map-wrapper" >
                    <div className={`card-wrapper ${classes[0]}`}>
                        <InfectedCard
                            classes={classes}
                            countriesData={countriesData}
                            globalData={globalData}
                            provincesData={provincesData}
                            formatNumber={formatNumber}
                            arrowLeft={arrowLeft}
                            arrowRight={arrowRight}
                            infectedCardExpand={infectedCardExpand}
                            setInfectedCardExpand={setInfectedCardExpand}
                            expandIcon={expandIcon}
                            shrinkIcon={shrinkIcon}
                        />
                    </div>
                    <div id="maps" className={`${classes[3]}`}>
                        <Maps
                            classes={classes}
                            provincesData={provincesData}
                            setMapExpand={setMapExpand}
                            mapExpand={mapExpand}
                            expandIcon={expandIcon}
                            shrinkIcon={shrinkIcon} />
                    </div>
                    <div className={`card-wrapper ${classes[1]}`}>
                        <DeathsRecoveredCard
                            classes={classes}
                            countriesData={countriesData}
                            globalData={globalData}
                            provincesData={provincesData}
                            arrowLeft={arrowLeft}
                            arrowRight={arrowRight}
                            deathsdCardExpand={deathsdCardExpand}
                            setDeathsCardExpand={setDeathsCardExpand}
                            expandIcon={expandIcon}
                            shrinkIcon={shrinkIcon}
                        />
                    </div>
                    <div className={`card-wrapper ${classes[2]}`}>
                        <ActiveIncidentRateCard
                            classes={classes}
                            provincesData={provincesData}
                            arrowLeft={arrowLeft}
                            arrowRight={arrowRight}
                            activeCardExpand={activeCardExpand}
                            setActiveCardExpand={setActiveCardExpand}
                            expandIcon={expandIcon}
                            shrinkIcon={shrinkIcon}
                        />
                    </div>
                </div>
                <div className={"charts-infos"} >
                    <div id="info-panel">
                        <div
                            className={`row-panel-wrapper ${classes[4]}`}
                            onMouseEnter={() => setIsDataHover(true)}
                            onMouseLeave={() => setIsDataHover(false)}
                            style={dataPanelExpand ? { width: "1400px", height: "738px", marginLeft: ".8em" } : {}}
                        >
                            <div className={"expand-shrink-icon-wrapper"}>
                                {
                                    isDataHover
                                        ? !dataPanelExpand
                                            ? <div style={{ top: "-6px", right: "-5px" }} onClick={() => setDataPanelExpand(!dataPanelExpand)} className={"expand-shrink-icon"}>{expandIcon}</div>
                                            : <div style={{ top: "-6px", right: "-5px" }} onClick={() => setDataPanelExpand(!dataPanelExpand)} className={"expand-shrink-icon"}>{shrinkIcon}</div>
                                        : null
                                }
                            </div>
                            <div className={"row-panel"}>
                                <div style={dataPanelExpand ? { padding: "3.5em .5em 3.5em .5em" } : { padding: "1.6em .2em .8em .3em" }} className={`today-data today-infected-panel`}>
                                    <span style={dataPanelExpand ? { fontSize: "2em" } : { fontSize: ".6em" }}>Today's Global New Cases</span>
                                    <h2 style={dataPanelExpand ? { fontSize: "9em" } : { fontSize: "1.5em" }} className={"infected-num"}>
                                        {formatNumber(globalData[0].newConfirmed)}
                                    </h2>
                                </div>
                                <div style={dataPanelExpand ? { padding: "3.5em .5em 3.5em .5em" } : { padding: "1.6em .2em .8em .3em" }} className={`today-data`}>
                                    <span style={dataPanelExpand ? { fontSize: "2em" } : { fontSize: ".6em" }}>Today's Global Deaths</span>
                                    <h2 style={dataPanelExpand ? { fontSize: "9em" } : { fontSize: "1.5em" }} className={"deaths-num"}>
                                        {formatNumber(globalData[0].newDeaths)}
                                    </h2>
                                </div>
                            </div>
                            <div className={"row-panel"}>
                                <div style={dataPanelExpand ? { padding: "3.5em .5em 3.5em .5em" } : { padding: "1.6em .2em .8em .3em" }} className={`today-data`}>
                                    <span style={dataPanelExpand ? { fontSize: "2em" } : { fontSize: ".6em" }}>Today's Global Recovered</span>
                                    <h2 style={dataPanelExpand ? { fontSize: "9em" } : { fontSize: "1.5em" }} className={"recovered-num"}>
                                        {formatNumber(globalData[0].newRecovered)}
                                    </h2>
                                </div>
                                <div style={dataPanelExpand ? { padding: "3.5em .5em 3.5em .5em" } : { padding: "1.6em .2em .8em .3em" }} className={`today-data num-of-country-panel`}>
                                    <span style={dataPanelExpand ? { fontSize: "2em" } : { fontSize: ".6em" }}>Countries/Provinces</span>
                                    <h2 style={dataPanelExpand ? { fontSize: "9em" } : { fontSize: "1.5em" }}>
                                        {
                                            countriesData
                                                .map(({ latestData }) => latestData)
                                                .filter((data) => data.confirmed > 0).length}/{provincesData.flat().length
                                        }
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`update-panel ${classes[5]}`}
                            onMouseEnter={() => setIsUpdateHover(true)}
                            onMouseLeave={() => setIsUpdateHover(false)}
                            style={updatePanelExpand ? { width: "1390px", height: "715px", marginLeft: ".8em" } : {}}
                        >
                            <div className={"expand-shrink-icon-wrapper"}>
                                {
                                    isUpdateHover
                                        ? !updatePanelExpand
                                            ? <div style={{ top: "-6px", right: "-5px" }} onClick={() => setUpdatePanelExpand(!updatePanelExpand)} className={"expand-shrink-icon"}>{expandIcon}</div>
                                            : <div style={{ top: "-6px", right: "-5px" }} onClick={() => setUpdatePanelExpand(!updatePanelExpand)} className={"expand-shrink-icon"}>{shrinkIcon}</div>
                                        : null
                                }
                            </div>
                            <span style={updatePanelExpand ? { fontSize: "3em", top: "2em" } : { fontSize: ".6em" }} >Last Updated at (M/D/YYYY)</span>
                            <h2 style={updatePanelExpand ? { fontSize: "9em" } : { fontSize: "1.5em" }}>{getFormattedDate()}</h2>
                        </div>
                    </div>
                    <div id="charts" >
                        <div
                            id="country-chart"
                            className={`${classes[6]}`}
                            onMouseEnter={() => setIsChartHover(true)}
                            onMouseLeave={() => setIsChartHover(false)}
                            style={globalDailyChartExpand ? { top: "2em", width: "1390px", height: "725px", marginRight: ".8em" } : { width: "775px", height: "307px" }}
                        >
                            <div className={"expand-shrink-icon-wrapper"}>
                                {
                                    isChartHover
                                        ? !globalDailyChartExpand
                                            ? <div style={{ top: "-6px", right: "-5px" }} onClick={() => setGlobalDailyChartExpand(!globalDailyChartExpand)} className={"expand-shrink-icon"}>{expandIcon}</div>
                                            : <div style={{ top: "-6px", right: "-5px" }} onClick={() => setGlobalDailyChartExpand(!globalDailyChartExpand)} className={"expand-shrink-icon"}>{shrinkIcon}</div>
                                        : null
                                }
                            </div>
                            <CountryPicker
                                id="picker"
                                classes={classes}
                                toggleCountry={toggleCountry} />
                            {
                                country === "select a country"
                                    ? <GlobalTodayCharts
                                        classes={classes}
                                        globalData={globalData}
                                        option={option}
                                        arrowLeft={arrowLeft}
                                        arrowRight={arrowRight}
                                        globalDailyChartExpand={globalDailyChartExpand}
                                        setGlobalDailyChartExpand={setGlobalDailyChartExpand}
                                        expandIcon={expandIcon}
                                        shrinkIcon={shrinkIcon}
                                    />
                                    : <CountryCharts
                                        countriesYearlyData={countriesYearlyData}
                                        classes={classes}
                                        globalData={globalData}
                                        option={option}
                                        country={country}
                                        arrowLeft={arrowLeft}
                                        arrowRight={arrowRight}
                                        globalDailyChartExpand={globalDailyChartExpand}
                                        setGlobalDailyChartExpand={setGlobalDailyChartExpand}
                                        expandIcon={expandIcon}
                                        shrinkIcon={shrinkIcon}
                                    />
                            }
                        </div>
                        <div className={`${classes[7]}`}>
                            <GlobalCharts
                                classes={classes}
                                country={country}
                                option={option}
                                globalData={globalData}
                                arrowLeft={arrowLeft}
                                arrowRight={arrowRight}
                                globalChartExpand={globalChartExpand}
                                setGlobalChartExpand={setGlobalChartExpand}
                                expandIcon={expandIcon}
                                shrinkIcon={shrinkIcon}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default App;