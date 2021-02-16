import React, { useState, useEffect, Fragment } from "react";

import { Line } from 'react-chartjs-2';

import Loader from 'react-loader-spinner';

import "./GlobalCharts.scss"


const GlobalCharts = ({ globalData, arrowLeft, arrowRight, option, classes, globalChartExpand, setGlobalChartExpand, expandIcon, shrinkIcon, isTablet, isMobile, isGlobalChart, setIsGlobalChart }) => {

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
    if (isGlobalChart === "infected") {
      setIsGlobalChart("deaths")
    } else if (isGlobalChart === "deaths") {
      setIsGlobalChart("recovered")
    } else if (isGlobalChart === "recovered") {
      setIsGlobalChart("infected")
    }
  };
  const toggleToLeft = () => {
    if (isGlobalChart === "infected") {
      setIsGlobalChart("recovered")
    } else if (isGlobalChart === "recovered") {
      setIsGlobalChart("deaths")
    } else if (isGlobalChart === "deaths") {
      setIsGlobalChart("infected")
    }
  };

  //toggle map togglers border bottom
  let { infectedStyle, deathsStyle, recoveredStyle } = {};
  const onStyle = { borderBottom: "3px solid white", backgroundColor: "#474747" };
  const offStyle = { backgroundColor: "#777" }
  infectedStyle = isGlobalChart === "infected" ?
    onStyle :
    offStyle
  deathsStyle = isGlobalChart === "deaths" ?
    onStyle :
    offStyle
  recoveredStyle = isGlobalChart === "recovered" ?
    onStyle :
    offStyle

  return (
    <Fragment>
      {/* Desktop */}
      <div
        className={`global-chart-container${globalChartExpand ? "-expand" : isTablet || isMobile ? "-hide" : ""}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {
          isHover
            ? !globalChartExpand
              ? <div className={"expand-icon"} onClick={() => setGlobalChartExpand(true)}>{expandIcon}</div>
              : <div className={"shrink-icon"} onClick={() => setGlobalChartExpand(false)}>{shrinkIcon}</div>
            : null
        }
        <div className={`chart-wrapper`}>
          <p className={`chart-header`} >
            Gloabl Infected/Deaths/Recovered
            </p>
          <div className={`chart`}>
            {
              isGlobalChart === "infected"
                ? infectedLineChart
                : isGlobalChart === "deaths"
                  ? deathsLineChart
                  : isGlobalChart === "recovered"
                    ? recoveredLineChart
                    : null
            }
          </div>
          {
            !globalChartExpand
              ? <div className={"arrow-toggler"}>
                <div className={"arrow-icon"} onClick={() => toggleToLeft()}>{arrowLeft}</div>
                <div className={"toggler-text"}>
                  {
                    isGlobalChart === "infected"
                      ? "Infected"
                      : isGlobalChart === "deaths"
                        ? "Deaths"
                        : isGlobalChart === "recovered"
                          ? "Recovered"
                          : null
                  }
                </div>
                <div className={"arrow-icon"} onClick={() => toggleToRight()}>{arrowRight}</div>
              </div>
              : null
          }
        </div>
      </div>
      {
        globalChartExpand
          ? <div className={`button-toggler-wrapper-expand`}>
            <div style={infectedStyle} className={"button-toggler"} onClick={() => setIsGlobalChart("infected")}>Infected</div>
            <div style={deathsStyle} className={"button-toggler"} onClick={() => setIsGlobalChart("deaths")}>Deaths</div>
            <div style={recoveredStyle} className={"button-toggler"} onClick={() => setIsGlobalChart("recovered")}>Recovered</div>
          </div>
          : null
      }

      {/* Tablet */}
      <div
        className={`global-chart-container${isTablet ? "-tablet-version" : isMobile ? "-hide" : "-tablet"}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className={`chart-wrapper`}>
          <p className={`chart-header`} >
            Gloabl Daily Infected/Deaths/Recovered
          </p>
          <div className={`chart`}>
            {
              isGlobalChart === "infected"
                ? infectedLineChart
                : isGlobalChart === "deaths"
                  ? deathsLineChart
                  : isGlobalChart === "recovered"
                    ? recoveredLineChart
                    : null
            }
          </div>
        </div>
      </div>
      <div className={`button-toggler-wrapper${isTablet ? "-tablet-version" : isMobile ? "-hide" : "-tablet"}`}>
        <div style={infectedStyle} className={"button-toggler"} onClick={() => setIsGlobalChart("infected")}>Infected</div>
        <div style={deathsStyle} className={"button-toggler"} onClick={() => setIsGlobalChart("deaths")}>Deaths</div>
        <div style={recoveredStyle} className={"button-toggler"} onClick={() => setIsGlobalChart("recovered")}>Recovered</div>
      </div>

      {/* Mobile */}
      <div
        className={`global-chart-container${isMobile ? "-mobile-version" : isTablet ? "-hide" : "-mobile"}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className={`chart-wrapper`}>
          <p className={`chart-header`} >
            Gloabl Daily Infected/Deaths/Recovered
            </p>
          <div className={`chart`}>
            {
              isGlobalChart === "infected"
                ? infectedLineChart
                : isGlobalChart === "deaths"
                  ? deathsLineChart
                  : isGlobalChart === "recovered"
                    ? recoveredLineChart
                    : null
            }
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default GlobalCharts;