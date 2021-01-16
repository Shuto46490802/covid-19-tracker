import React, { useState, useEffect } from "react";

import { Bar } from 'react-chartjs-2';

import Loader from 'react-loader-spinner';

import "./Charts.css"

const GlobalTodayCharts = ({ globalData, arrowRight, arrowLeft, option, classes, globalDailyChartExpand }) => {

    const [isInfectedActiveChart, setIsInfectedActiveChart] = useState("infected");
    const [isDeathsRecoveredChart, setIsDeathsRecoveredChart] = useState("deaths");
    const [isLoad, setIsLoad] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoad(false)
        }, 1000)
    })

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
        <div className={`${classes[6]}`}>
            <div className={"chart-wrapper"}>
                <div className={"infected-active-chart"}>
                    <span className={"daily-header"} style={globalDailyChartExpand ? { fontSize: "1.5em", left: "100px" } : { fontSize: "0.7em", left : "95px" }}>
                        Global Daily Infected/Active Cases
                    </span>
                    <div className={"chart"} style={globalDailyChartExpand ? { marginRight: "5em", width: "580px", height: "600px" } : { width: "385px", height: "200px" }}>
                        {
                            isInfectedActiveChart === "infected"
                                ? infectedBarChart
                                : activeBarChart
                        }
                    </div>
                    {
                        !globalDailyChartExpand
                            ? <div className="chart-toggler">
                                <div className={"admin-icon"} onClick={() => { toggleInfectedActiveChart() }} >
                                    {arrowLeft}
                                </div>
                                <div >
                                    {
                                        isInfectedActiveChart === "infected"
                                            ? <span className={"card-toggler-name"}>Daily Infected Cases</span>
                                            : <span className={"card-toggler-name"}>Daily Active cases</span>
                                    }
                                </div>
                                <div className={"admin-icon"} onClick={() => { toggleInfectedActiveChart() }} >
                                    {arrowRight}
                                </div>
                            </div>
                            : null
                    }

                </div>
                <div className={"deaths-recovered-chart"}>
                    <span className={"daily-header"} style={globalDailyChartExpand ? { fontSize: "1.5em", left: "120px" } : { fontSize: "0.7em", left : "110px" }}>
                        Global Daily Deaths/Recovered
                    </span>
                    <div className={"chart"} style={globalDailyChartExpand ? { width: "600px", height: "600px" } : { width: "385px", height: "200px" }}>
                        {
                            isDeathsRecoveredChart === "deaths"
                                ? deathsBarChart
                                : recoveredBarChart
                        }
                    </div>
                    {
                        !globalDailyChartExpand
                            ? <div className="chart-toggler">
                                <div className={"admin-icon"} onClick={() => { toggleDeathsRecoveredChart() }} >
                                    {arrowLeft}
                                </div>
                                <div >
                                    {
                                        isDeathsRecoveredChart === "deaths"
                                            ? <span className={"card-toggler-name"}>Daily Deaths</span>
                                            : <span className={"card-toggler-name"}>Daily Recovered</span>
                                    }
                                </div>
                                <div className={"admin-icon"} onClick={() => { toggleDeathsRecoveredChart() }} >
                                    {arrowRight}
                                </div>
                            </div>
                            : null
                    }
                </div>
            </div>
            {
                globalDailyChartExpand
                    ? <div id="card-toggler" style={globalDailyChartExpand ? { bottom: "-19px", left: "15px" } : {}}>
                        <div className={"toggler"} style={infectedStyle} onClick={() => { setIsInfectedActiveChart("infected") }}>Global Daily Infected Cases</div>
                        <div className={"toggler"} style={activeStyle} onClick={() => { setIsInfectedActiveChart("active") }} >Gloabl Daily Active Cases</div>
                    </div>
                    : null
            }
            {
                globalDailyChartExpand
                    ? <div id="card-toggler" style={globalDailyChartExpand ? { bottom: "-19px", left: "730px" } : {}}>
                        <div className={"toggler"} style={deathsStyle} onClick={() => { setIsDeathsRecoveredChart("deaths") }}>Global Daily Deaths</div>
                        <div className={"toggler"} style={recoveredStyle} onClick={() => { setIsDeathsRecoveredChart("recovered") }} >Global Daily Recovered</div>
                    </div>
                    : null
            }
        </div>
    )
};

export default GlobalTodayCharts;