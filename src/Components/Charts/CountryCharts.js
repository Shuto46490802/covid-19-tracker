import React, { useState, useEffect, Fragment } from "react";

import { Bar, Line } from 'react-chartjs-2';

import Loader from 'react-loader-spinner';

import "./GlobalTodayCharts.scss"

const CountryCharts = ({ countriesYearlyData: { latest_data, timeline }, arrowLeft, arrowRight, option, classes, globalDailyChartExpand, isTablet, isMobile }) => {

    const [isChart, setIsChart] = useState("infected");
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

    if (isLoad || !timeline || !latest_data) {
        return (
            <div className={`loader-country-chart-wrapper${classes[3]}`}>
                <div className={"loader"}>
                    {loader}
                </div>
                <div className={"loading"}>
                    Loading ...
                </div>
            </div>
        )
    };

    const modifiedTimeLine = timeline.map((data) => data).reverse();
    //infected chart
    const infectedLineChart = (
        latest_data.length !== 0
            ? <Line
                data={{
                    labels: modifiedTimeLine.map(({ date }) => date),
                    datasets: [
                        {
                            data: modifiedTimeLine.map(({ confirmed }) => confirmed),
                            label: "Infected",
                            fill: true,
                            lineTension: 0.4,
                            borderColor: "rgba(222, 53, 76, 1)",
                            backgroundColor: "rgba(222, 53, 76, 0.4)",
                            pointRadius: 1,
                            pointBorderColor: "rgba(222, 53, 76, 1)",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(222, 53, 76, 1)",
                            pointHoverBorderColor: "rgba(222, 53, 76, 1)"
                        }]
                }}
                options={option}
            />
            : null
    );

    const deathsLineChart = (
        latest_data.length !== 0
            ? <Line
                data={{
                    labels: modifiedTimeLine.map(({ date }) => date),
                    datasets: [
                        {
                            data: modifiedTimeLine.map(({ deaths }) => deaths),
                            label: "Deaths",
                            fill: true,
                            lineTension: 0.4,
                            borderColor: "rgba(92, 95, 88, 1)",
                            backgroundColor: "rgba(92, 95, 88, 0.4)",
                            pointRadius: 1,
                            pointBorderColor: "rgba(92, 95, 88, 1)",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(92, 95, 88, 1)",
                            pointHoverBorderColor: "rgba(92, 95, 88, 1)"
                        }]
                }}
                options={option}
            />
            : null
    );

    const recoveredLineChart = (
        latest_data.length !== 0
            ? <Line
                data={{
                    labels: modifiedTimeLine.map(({ date }) => date),
                    datasets: [
                        {
                            data: modifiedTimeLine.map(({ recovered }) => recovered),
                            label: "Recovered",
                            fill: true,
                            lineTension: 0.4,
                            borderColor: "rgba(0, 255, 0, 1)",
                            backgroundColor: "rgba(0, 255, 0, 0.4)",
                            pointRadius: 1,
                            pointBorderColor: "rgba(0, 255, 0, 1)",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(0, 255, 0, 1)",
                            pointHoverBorderColor: "rgba(0, 255, 0, 1)"
                        }]
                }}
                options={option}
            />
            : null
    );

    const barChart = (
        latest_data.length !== 0
            ? <Bar
                data={{
                    labels: ["Infected", "Recovered", "Deaths"],
                    datasets: [{
                        data: [latest_data.confirmed, latest_data.recovered, latest_data.deaths],
                        backgroundColor: ["rgba(222, 53, 76, 0.5)", "rgba(0, 255, 0, 0.5)", "rgba(92, 95, 88, 0.5)"]
                    }]
                }}
                options={{
                    maintainAspectRatio: false,
                    legend: { display: false },
                    title: { display: false },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: "white",
                                zeroLineColor: "white"
                            },
                            ticks: {
                                maxTicksLimit: 12,
                                fontColor: "white"
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                color: "white",
                                zeroLineColor: "white"
                            },
                            ticks: {
                                fontColor: "white",
                                maxTicksLimit: 8,
                                callback: function numFormatter(num) {
                                    if (num > 999 && num < 1000000) {
                                        return (num / 1000).toFixed(1) + 'K';
                                    } else if (num >= 1000000) {
                                        return (num / 1000000).toFixed(1) + 'M';
                                    } else if (num < 900) {
                                        return num;
                                    }

                                }
                            }
                        }
                        ]
                    }
                }}
            />
            : null
    );

    const toggleToRight = () => {
        if (isChart === "infected") {
            setIsChart("deaths")
        } else if (isChart === "deaths") {
            setIsChart("recovered")
        } else if (isChart === "recovered") {
            setIsChart("infected")
        }
    };
    const toggleToLeft = () => {
        if (isChart === "infected") {
            setIsChart("recovered")
        } else if (isChart === "recovered") {
            setIsChart("deaths")
        } else if (isChart === "deaths") {
            setIsChart("infected")
        }
    };

    //toggle map togglers border bottom
    let { infectedStyle, deathsStyle, recoveredStyle } = {};
    const onStyle = { borderBottom: "3px solid white", backgroundColor: "#474747" };
    const offStyle = { backgroundColor: "#777" };;
    infectedStyle = isChart === "infected" ?
        onStyle :
        offStyle
    deathsStyle = isChart === "deaths" ?
        onStyle :
        offStyle
    recoveredStyle = isChart === "recovered" ?
        onStyle :
        offStyle

    return (
        <Fragment>
            <div className={`chart-container${isTablet || isMobile ? "-hide" : ""}`}>
                <div className={`chart-wrapper${globalDailyChartExpand ? "-" + classes[3] : ""}`}>
                    <p className={`chart-header`} >
                        Daily Infected/Deaths/Recovered by Country
                    </p>
                    <div className={`chart`}>
                        {
                            isChart === "infected"
                                ? infectedLineChart
                                : isChart === "deaths"
                                    ? deathsLineChart
                                    : isChart === "recovered"
                                        ? recoveredLineChart
                                        : null
                        }
                    </div>
                    {
                        !globalDailyChartExpand
                            ? <div className={"arrow-toggler"}>
                                <span className={"arrow-icon"} onClick={() => toggleToLeft()}>{arrowLeft}</span>
                                <span className={"toggler-text"}>
                                    {
                                        isChart === "infected"
                                            ? "Infected"
                                            : isChart === "deaths"
                                                ? "Deaths"
                                                : isChart === "recovered"
                                                    ? "Recovered"
                                                    : null
                                    }
                                </span>
                                <span className={"arrow-icon"} onClick={() => toggleToRight()}>{arrowRight}</span>
                            </div>
                            : null
                    }
                </div>
                <div className={"border"} />
                <div className={`chart-wrapper${globalDailyChartExpand ? "-" + classes[3] : ""}`}>
                    <p className={`chart-header`}>
                        Latest Infected/Deaths/Recovered by Country
                        </p>
                    <div className={`chart bar-chart`} >
                        {barChart}
                    </div>
                    {
                        !globalDailyChartExpand
                            ? <div className={"arrow-toggler"} />
                            : null
                    }
                </div>
            </div>
            {
                globalDailyChartExpand
                    ? <div className={`button-toggler-wrapper-expand`}>
                        <div style={infectedStyle} className={"button-toggler"} onClick={() => setIsChart("infected")}>Infected</div>
                        <div style={deathsStyle} className={"button-toggler"} onClick={() => setIsChart("deaths")}>Deaths</div>
                        <div style={recoveredStyle} className={"button-toggler"} onClick={() => setIsChart("recovered")}>Recovered</div>
                    </div>
                    : null
            }

            {/* tablet */}
            <div className={`chart-container${isTablet ? "-tablet-version" : isMobile ? "-mobile-version" : "-tablet"}`}>
                <div className={`chart-wrapper`}>
                    <p className={`chart-header`} >
                        Daily Infected/Deaths/Recovered by Country
                    </p>
                    <div className={`chart`}>
                        {
                            isChart === "infected"
                                ? infectedLineChart
                                : isChart === "deaths"
                                    ? deathsLineChart
                                    : isChart === "recovered"
                                        ? recoveredLineChart
                                        : null
                        }
                    </div>
                </div>
                <div className={"border"} />
                <div className={`chart-wrapper`}>
                    <p className={`chart-header`}>
                        Latest Infected/Deaths/Recovered by Country
                        </p>
                    <div className={`chart bar-chart`} >
                        {barChart}
                    </div>
                </div>
            </div>
            <div className={`button-toggler-wrapper${isTablet ? "-tablet-version" : isMobile ? "-mobile-version" : "-tablet"}`}>
                <div style={infectedStyle} className={"button-toggler"} onClick={() => setIsChart("infected")}>Infected</div>
                <div style={deathsStyle} className={"button-toggler"} onClick={() => setIsChart("deaths")}>Deaths</div>
                <div style={recoveredStyle} className={"button-toggler"} onClick={() => setIsChart("recovered")}>Recovered</div>
            </div>
        </Fragment>
    )
}

export default CountryCharts