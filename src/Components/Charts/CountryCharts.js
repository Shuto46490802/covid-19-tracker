import React, { useState, useEffect } from "react";

import { Bar, Line } from 'react-chartjs-2';

import Loader from 'react-loader-spinner';

import "./Charts.css"

const CountryCharts = ({ countriesYearlyData: { latest_data, timeline }, arrowLeft, arrowRight, option, classes, globalDailyChartExpand }) => {

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
    let { admin0Style, admin2Style, todayStyle } = {};
    const onStyle = { borderBottom: "3px solid white", backgroundColor: "#240090" };
    admin0Style = isChart === "infected" ?
        onStyle :
        {}
    admin2Style = isChart === "deaths" ?
        onStyle :
        {}
    todayStyle = isChart === "recoverd" ?
        onStyle :
        {}

    return (
        <div className={`${classes[6]}`}>
            <div className={"chart-wrapper country-charts"}>
                <div id="line-chart">
                    <span className={"country-header"} style={globalDailyChartExpand ? { fontSize: "1.5em", left: "-20px" } : { fontSize: "0.7em" }}>
                        Daily Infected Cases/Deaths/Recovered by Country
                </span>
                    <div className={"chart"} style={globalDailyChartExpand ? { marginRight: "5em", width: "580px", height: "600px" } : { width: "385px", height: "200px" }}>
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
                            ? <div className="chart-toggler">
                                <div className={"admin-icon"} onClick={() => { toggleToLeft() }} >
                                    {arrowLeft}
                                </div>
                                <div >
                                    {
                                        isChart === "infected"
                                            ? <span className={"card-toggler-name"}>Infected</span>
                                            : isChart === "deaths"
                                                ? <span className={"card-toggler-name"}>Deaths</span>
                                                : isChart === "recovered"
                                                    ? <span className={"card-toggler-name"}>Recovered</span>
                                                    : null
                                    }
                                </div>
                                <div className={"admin-icon"} onClick={() => { toggleToRight() }} >
                                    {arrowRight}
                                </div>
                            </div>
                            : null
                    }
                </div>
                <div id="bar-chart">
                    <span className={"country-header"} style={globalDailyChartExpand ? { fontSize: "1.5em", left: "-10px" } : { fontSize: "0.7em" }}>
                        Latest Infected Cases/Deaths/Recovered by Country
                    </span>
                    <div className={"chart"} style={globalDailyChartExpand ? { width: "600px", height: "600px" } : { width: "385px", height: "200px" }}>
                        {barChart}
                    </div>
                </div>
            </div>
            {
                globalDailyChartExpand
                    ? <div id="card-toggler" style={globalDailyChartExpand ? { bottom: "-19px", left: "15px" } : {}}>
                        <div className={"toggler"} style={admin0Style} onClick={() => { setIsChart("infected") }}>Infected</div>
                        <div className={"toggler"} style={admin2Style} onClick={() => { setIsChart("deaths") }}>Deaths</div>
                        <div className={"toggler"} style={todayStyle} onClick={() => { setIsChart("recovered") }} >Recovered</div>
                    </div>
                    : null

            }
        </div>
    )
}

export default CountryCharts