import React from "react";

import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";

import "../css/Card.css";

const Cards = ( {globalData : {confirmed, recovered, deaths, lastUpdate}} ) => {

    if(!confirmed){
        return "Loading ..."
    };

  return(
    <div id="card-wrapper">
      <Grid container spacing={3} justify="center" >
          <Grid item component={Card} xs={10} md={3} className={"card"}>
              <CardContent className="card-content">
                  <Typography color="textSecondary" gutterBottom>Infected</Typography>
                  <Typography variant="h5">
                    <CountUp start={0} end={confirmed.value} duration={2.75} separator={","} />
                  </Typography>
                  <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                  <Typography variant="body2">Number of active cases of COVID-19</Typography>
              </CardContent>
          </Grid>
          <Grid item component={Card} xs={10} md={3} className={"card"}>
              <CardContent>
                  <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                  <Typography variant="h5">
                    <CountUp start={0} end={recovered.value} duration={2.75} separator={","} />
                  </Typography>
                  <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                  <Typography variant="body2">Number of  recoveries from COVID-19</Typography>
              </CardContent>
          </Grid>
          <Grid item component={Card} xs={10} md={3} className={"card"}>
              <CardContent>
                  <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                  <Typography variant="h5">
                    <CountUp start={0} end={deaths.value} duration={2.75} separator={","} />
                  </Typography>
                  <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                  <Typography variant="body2">Number of deths caused by COVID-19</Typography>
              </CardContent>
          </Grid>
      </Grid>
    </div>
  )
};

export default Cards;