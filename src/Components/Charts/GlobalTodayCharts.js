import React, { useState, useEffect, Fragment } from "react";

import { Bar } from 'react-chartjs-2';

import Loader from 'react-loader-spinner';

import "./GlobalTodayCharts.scss"

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

    if (isLoad || !globalData[0]) {
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
    const onStyle = { borderBottom: "3px solid white", backgroundColor: "#474747" };
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
            {/* laptop */}
            <div className={`chart-container`}>
                <div className={`chart-wrapper${globalDailyChartExpand ? "-" + classes[3] : ""}`}>
                    <p className={`chart-header`}>
                        Global Daily Infected/Active Cases
                    </p>
                    <div
                        className={`chart`}
                    >
                        {
                            isInfectedActiveChart === "infected"
                                ? infectedBarChart
                                : activeBarChart
                        }
                    </div>
                    {
                        !globalDailyChartExpand
                            ? <div className={"arrow-toggler"}>
                                <div className={"arrow-icon"} onClick={() => toggleInfectedActiveChart()}>{arrowLeft}</div>
                                <div className={"card-toggler-text"}>
                                    {
                                        isInfectedActiveChart === "infected"
                                            ? "Daily Infected Cases"
                                            : "Daily Active Cases"

                                    }
                                </div>
                                <div className={"arrow-icon"} onClick={() => toggleInfectedActiveChart()}>{arrowRight}</div>
                            </div>
                            : null
                    }
                </div>
                <div className={"border"} />
                <div className={`chart-wrapper${globalDailyChartExpand ? "-" + classes[3] : ""}`}>
                    <p className={`chart-header`}>
                        Global Daily Deaths/Recovered
                        </p>
                    <div className={`chart`}>
                        {
                            isDeathsRecoveredChart === "deaths"
                                ? deathsBarChart
                                : recoveredBarChart
                        }
                    </div>
                    {
                        !globalDailyChartExpand
                            ? <div className={"arrow-toggler"}>
                                <div className={"arrow-icon"} onClick={() => toggleDeathsRecoveredChart()}>{arrowLeft}</div>
                                <div className={"card-toggler-text"}>
                                    {
                                        isDeathsRecoveredChart === "deaths"
                                            ? "Daily Deaths"
                                            : "Daily Recovered"
                                    }
                                </div>
                                <div className={"arrow-icon"} onClick={() => toggleDeathsRecoveredChart()}>{arrowRight}</div>
                            </div>
                            : null
                    }
                </div>
            </div>
            {
                globalDailyChartExpand
                    ? <div className={"button-toggler-container-expand"}>
                        <div className={"button-toggler-wrapper"}>
                            <div style={infectedStyle} className={"button-toggler"} onClick={() => setIsInfectedActiveChart("infected")}>Infected</div>
                            <div style={activeStyle} className={"button-toggler"} onClick={() => setIsInfectedActiveChart("active")}>Active</div>
                        </div>
                        <div className={"button-toggler-wrapper"}>
                            <div style={deathsStyle} className={"button-toggler"} onClick={() => setIsDeathsRecoveredChart("deaths")}>Deaths</div>
                            <div style={recoveredStyle} className={"button-toggler"} onClick={() => setIsDeathsRecoveredChart("recovered")}>Recovered</div>
                        </div>
                    </div>
                    : null
            }

            {/* tablet */}
            <div className={`chart-container-tablet`}>
                <div className={`chart-wrapper`}>
                    <p className={`chart-header`}>
                        Global Daily Infected/Active Cases
                    </p>
                    <div
                        className={`chart`}
                    >
                        {
                            isInfectedActiveChart === "infected"
                                ? infectedBarChart
                                : activeBarChart
                        }
                    </div>
                    {
                        !globalDailyChartExpand
                            ? <div className={"arrow-toggler"}>
                                <div className={"arrow-icon"} onClick={() => toggleInfectedActiveChart()}>{arrowLeft}</div>
                                <div className={"card-toggler-text"}>
                                    {
                                        isInfectedActiveChart === "infected"
                                            ? "Daily Infected Cases"
                                            : "Daily Active Cases"

                                    }
                                </div>
                                <div className={"arrow-icon"} onClick={() => toggleInfectedActiveChart()}>{arrowRight}</div>
                            </div>
                            : null
                    }
                </div>
                <div className={"border"} />
                <div className={`chart-wrapper`}>
                    <p className={`chart-header`}>
                        Global Daily Deaths/Recovered
                        </p>
                    <div className={`chart`}>
                        {
                            isDeathsRecoveredChart === "deaths"
                                ? deathsBarChart
                                : recoveredBarChart
                        }
                    </div>
                    {
                        !globalDailyChartExpand
                            ? <div className={"arrow-toggler"}>
                                <div className={"arrow-icon"} onClick={() => toggleDeathsRecoveredChart()}>{arrowLeft}</div>
                                <div className={"card-toggler-text"}>
                                    {
                                        isDeathsRecoveredChart === "deaths"
                                            ? "Daily Deaths"
                                            : "Daily Recovered"
                                    }
                                </div>
                                <div className={"arrow-icon"} onClick={() => toggleDeathsRecoveredChart()}>{arrowRight}</div>
                            </div>
                            : null
                    }
                </div>
            </div>

            <div className={"chart-button-toggler-container-tablet"}>
                <div className={"chart-button-toggler-wrapper infected-buttons"}>
                    <div style={infectedStyle} className={"button-toggler"} onClick={() => setIsInfectedActiveChart("infected")}>Infected</div>
                    <div style={activeStyle} className={"button-toggler"} onClick={() => setIsInfectedActiveChart("active")}>Active</div>
                </div>
                <div className={"chart-button-toggler-wrapper deaths-buttons"}>
                    <div style={deathsStyle} className={"button-toggler"} onClick={() => setIsDeathsRecoveredChart("deaths")}>Deaths</div>
                    <div style={recoveredStyle} className={"button-toggler"} onClick={() => setIsDeathsRecoveredChart("recovered")}>Recovered</div>
                </div>
            </div>

        </Fragment>
    )
};

export default GlobalTodayCharts;