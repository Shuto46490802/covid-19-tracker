import React, { useState, useEffect } from "react";

import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from "../api";

import "../css/Charts.css"


const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {

  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    }
    fetchAPI();
  }, []);

  if (!confirmed) {
    return "Loading..."
  };

  const globalLineChart = (
    dailyData.length !== 0
      ? <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              fill: true,
              lineTension: 0.1,
              borderColor: "rgba(0, 0, 255, 1)",
              backgroundColor: "rgba(154, 154, 228, 0.4)",
              pointRadius: 1,
              pointBorderColor: "rgba(0, 0, 255, 1)",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(0, 0, 255, 1)",
              pointHoverBorderColor: "rgba(0, 0, 255, 1)"
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              fill: true,
              lineTension: 0.1,
              borderColor: "rgba(255, 0, 0, 1)",
              backgroundColor: "rgba(228, 154, 154, 0.4)",
              pointRadius: 1,
              pointBorderColor: "rgba(255, 0, 0, 1)",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
              pointHoverBorderColor: "rgba(255, 0, 0, 1)"
            }]
        }}
      />
      : null
  );

  const barChart = (
    confirmed.length !== 0
      ? <Bar
        data={{
          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [{
            data: [confirmed.value, recovered.value, deaths.value],
            backgroundColor: ["rgba(0, 0, 255, 0.5)", "rgba(0, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)"]
          }]
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` }
        }}
      />
      : null
  );

  return (
    <div className="chart">
      {
        country && country !== "Global"
          ? barChart
          : globalLineChart
      }
    </div>
  )
};

export default Charts;