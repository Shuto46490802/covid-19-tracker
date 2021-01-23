import React, { useState, useEffect, Fragment } from "react";

import { Bar } from 'react-chartjs-2';

import Loader from 'react-loader-spinner';

import "./Charts.scss"

const GlobalTodayCharts = ({ globalData, arrowRight, arrowLeft, option, classes, globalDailyChartExpand }) => {

    const [isInfectedActiveChart, setIsInfectedActiveChart] = useState("infected");
    const [isDeathsRecoveredChart, setIsDeathsRecoveredChart] = useState("deaths");
    const [isLoad, setIsLoad] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoad(false)
        }, 1000)
    })

    if (!globalData[0]) {
        return "Loading..."
    }

    const loader = <Loader
        type="Oval"
        color="#3500D3"
        height={50}
        width={50}
        timeout={1000}
    />

    if (isLoad) {
        return (
            <div className={"loader-country-chart-wrapper"}>
                <div className={"loader"}>
                    {loader}
                </div>
                <div className={"loading"}>
                    Loading ...
                </div>
            </div>
        )
    };

    const modifiedData = globalData.map((data) => data).reverse().filter(({ newConfirmed }) => newConfirmed < 3000000);

    const toggleInfectedActiveChart = () => {
        if (isInfectedActiveChart === "infected") {
            setIsInfectedActiveChart("active")
        } else {
            setIsInfectedActiveChart("infected")
        }
    };

    const toggleDeathsRecoveredChart = () => {
        if (isDeathsRecoveredChart === "deaths") {
            setIsDeathsRecoveredChart("recovered")
        } else {
            setIsDeathsRecoveredChart("deaths")
        }
    };

    const infectedBarChart = (
        modifiedData.length !== 0
            ? <Bar
                data={{
                    labels: modifiedData.map(({ date }) => date),
                    datasets: [{
                        data: modifiedData.map(({ newConfirmed }) => newConfirmed),
                        backgroundColor: "red"
                    }]
                }}
                options={option}
            />
            : null
    );

    const activeBarChart = (
        modifiedData.length !== 0
            ? <Bar
                data={{
                    labels: modifiedData.map(({ date }) => date),
                    datasets: [{
                        data: modifiedData.map(({ active }) => active),
                        backgroundColor: "rgba(241, 178, 74, 1)"
                    }]
                }}
                options={option}
            />
            : null
    );

    const recoveredBarChart = (
        modifiedData.length !== 0
            ? <Bar
                data={{
                    labels: modifiedData.map(({ date }) => date),
                    datasets: [{
                        data: modifiedData.map(({ newRecovered }) => newRecovered),
                        backgroundColor: "#4D774E"
                    }]
                }}
                options={option}
            />
            : null
    );

    const deathsBarChart = (
        modifiedData.length !== 0
            ? <Bar
                data={{
                    labels: modifiedData.map(({ date }) => date),
                    datasets: [{
                        data: modifiedData.map(({ newDeaths }) => newDeaths),
                        backgroundColor: "#999"
                    }]
                }}
                options={option}
            />
            : null
    );

    //toggle map togglers border bottom
    let { infectedStyle, activeStyle } = {};
    const onStyle = { borderBottom: "3px solid white", backgroundColor: "#240090" };
    infectedStyle = isInfectedActiveChart === "infected" ?
        onStyle :
        {}
    activeStyle = isInfectedActiveChart === "active" ?
        onStyle :
        {}

    let { deathsStyle, recoveredStyle } = {};
    deathsStyle = isDeathsRecoveredChart === "deaths" ?
        onStyle :
        {}
    recoveredStyle = isDeathsRecoveredChart === "recovered" ?
        onStyle :
        {}

    return (
        <Fragment>
            <div className={"chart-container"}>
                <div className={"chart-wrapper"}>
                    <p className={"chart-header"}>Global Daily Infected/Active Cases</p>
                    <div
                        className={"chart"}
                        style={globalDailyChartExpand ? { height: "70vh" } : {}}
                    >
                        {
                            isInfectedActiveChart === "infected"
                                ? infectedBarChart
                                : activeBarChart
                        }
                    </div>
                    <div className={"arrow-toggler"}>
                        <span className={"arrow-icon"} onClick={() => toggleInfectedActiveChart()}>{arrowLeft}</span>
                        <span className={"card-toggler-text"}>
                            {
                                isInfectedActiveChart === "infected"
                                    ? "Daily Infected Cases"
                                    : "Daily Active Cases"

                            }
                        </span>
                        <span className={"arrow-icon"} onClick={() => toggleInfectedActiveChart()}>{arrowRight}</span>
                    </div>
                </div>
                <div
                    className={"border"}
                    style={globalDailyChartExpand ? { height: "75vh" } : {}}
                />
                <div className={"chart-wrapper"}>
                    <p className={"chart-header"}>Global Daily Deaths/Recovered</p>
                    <div
                        className={"chart"}
                        style={globalDailyChartExpand ? { height: "70vh" } : {}}
                    >
                        {
                            isDeathsRecoveredChart === "deaths"
                                ? deathsBarChart
                                : recoveredBarChart
                        }
                    </div>
                    <div className={"arrow-toggler"}>
                        <span className={"arrow-icon"} onClick={() => toggleDeathsRecoveredChart()}>{arrowLeft}</span>
                        <span className={"card-toggler-text"}>
                            {
                                isDeathsRecoveredChart === "deaths"
                                    ? "Daily Deaths"
                                    : "Daily Recovered"
                            }
                        </span>
                        <span className={"arrow-icon"} onClick={() => toggleDeathsRecoveredChart()}>{arrowRight}</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default GlobalTodayCharts;