import React, { useState, useEffect, Fragment } from "react";

import { Line } from 'react-chartjs-2';

import Loader from 'react-loader-spinner';

import "./Charts.scss"


const GlobalCharts = ({ globalData, arrowLeft, arrowRight, option, classes, globalChartExpand, setGlobalChartExpand, expandIcon, shrinkIcon }) => {

  const [isChart, setIsChart] = useState("infected");
  const [isHover, setIsHover] = useState(false);
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

  const modifiedData = globalData
    .filter(({ date }) => date !== "2020-08-17")
    .reverse();

  const infectedLineChart = (
    modifiedData.length !== 0
      ? <Line
        data={{
          labels: modifiedData.map(({ date }) => date),
          datasets: [
            {
              data: modifiedData.map(({ confirmed }) => confirmed),
              fill: true,
              lineTension: 0.1,
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
    modifiedData.length !== 0
      ? <Line
        data={{
          labels: modifiedData.map(({ date }) => date),
          datasets: [
            {
              data: modifiedData.map(({ deaths }) => deaths),
              fill: true,
              lineTension: 0.1,
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
    modifiedData.length !== 0
      ? <Line
        data={{
          labels: modifiedData.map(({ date }) => date),
          datasets: [
            {
              data: modifiedData.map(({ recovered }) => recovered),
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
  todayStyle = isChart === "recovered" ?
    onStyle :
    {}

  return (
    <Fragment>
      <div className={"global-chart-container"}>
        <div className={"chart-wrapper"}>
          <p className={"chart-header"}>Daily Infected/Deaths/Recovered by Country</p>
          <div
            className={"chart"}
            style={globalChartExpand ? { height: "70vh" } : {}}
          >
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
          <div className={"arrow-toggler"}>
            <span className={"arrow-icon"} onClick={() => toggleToLeft()}>{arrowLeft}</span>
            <span className={"card-toggler-text"}>
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
        </div>
      </div>
    </Fragment>
  )
};

export default GlobalCharts;