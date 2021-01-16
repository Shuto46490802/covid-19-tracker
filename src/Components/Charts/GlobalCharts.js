import React, { useState, useEffect, Fragment } from "react";

import { Line } from 'react-chartjs-2';

import Loader from 'react-loader-spinner';

import "./Charts.css"


const GlobalCharts = ({ globalData, arrowLeft, arrowRight, option, classes, globalChartExpand, setGlobalChartExpand, expandIcon, shrinkIcon }) => {

  const [isChart, setIsChart] = useState("infected");
  const [isHover, setIsHover] = useState(false);
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
    <div
      className={`${classes[7]}`}
      id="global-chart-wrapper"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={globalChartExpand ? { top: "2em", width: "1390px", height: "730px", marginRight: ".8em" } : { width: "382px", height: "307px" }}
    >
      {
        isLoad
          ? <div className={"loader-global-chart-wrapper"}>
            <div className={"loader"}>
              {loader}
            </div>
            <div className={"loading"}>
              Loading ...
        </div>
          </div>
          : <Fragment>
            <div className={"expand-shrink-icon-wrapper"}>
        {
          isHover
            ? !globalChartExpand
              ? <div style={{ top: "-6px", right: "-5px" }} onClick={() => setGlobalChartExpand(!globalChartExpand)} className={"expand-shrink-icon"}>{expandIcon}</div>
              : <div style={{ top: "-6px", right: "-5px" }} onClick={() => setGlobalChartExpand(!globalChartExpand)} className={"expand-shrink-icon"}>{shrinkIcon}</div>
            : null
        }
      </div>
      <div className="chart-wrapper-global" >
        <span className={"chart-header"} style={globalChartExpand ? { fontSize: "2em", left: "260px" } : { fontSize: "0.7em" }}>Global Infected Cases/Deaths/Recovered</span>
        <div className={"chart global-chart"} style={globalChartExpand ? { width: "1200px", height: "600px" } : { width: "385px", height: "200px" }} >
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
          !globalChartExpand
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
      {
        globalChartExpand
          ? <div id="card-toggler" style={globalChartExpand ? { bottom: "-19px", left: "15px" } : {}}>
            <div className={"toggler"} style={admin0Style} onClick={() => { setIsChart("infected") }}>Infected</div>
            <div className={"toggler"} style={admin2Style} onClick={() => { setIsChart("deaths") }} >Deaths</div>
            <div className={"toggler"} style={todayStyle} onClick={() => { setIsChart("recovered") }} >Recovered</div>
          </div>
          : null

      }
          </Fragment>
      }
    </div>
  )
};

export default GlobalCharts;