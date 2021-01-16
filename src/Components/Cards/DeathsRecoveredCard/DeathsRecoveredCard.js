import React, { useState } from "react";
import "./DeathsRecoveredCard.css"

const DeathsRecoveredCard = ({ countriesData, globalData, classes, arrowLeft, arrowRight, deathsdCardExpand, setDeathsCardExpand, expandIcon, shrinkIcon }) => {

    const [deathsRecoveredCard, setDeathsRecoveredCard] = useState("deaths");
    const [isHover, setIsHover] = useState(false);

    //check if countriesData, globalData are asigned
    if (!globalData[0]) {
        return "Loading ..."
    };
    if (!countriesData[0]) {
        return "Loading"
    };

    //modify deaths datas
    const modifiedDeathsData = countriesData
        .map(({ country, latestData, todayData }) => [country, latestData, todayData])
        .sort((a, b) => b[1].deaths - a[1].deaths);

    //modify recovered datas
    const modifiedRecoveredData = countriesData
        .map(({ country, latestData, todayData }) => [country, latestData, todayData])
        .sort((a, b) => b[1].recovered - a[1].recovered);

    //modify today's deaths data and sort
    const modifiedTodayDeathData = countriesData
        .map(({ country, latestData, todayData }) => [country, latestData, todayData])
        .sort((a, b) => b[2].deaths - a[2].deaths);

    const formatNumber = inputNumber => {
        let formetedNumber = (Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let splitArray = formetedNumber.split('.');
        if (splitArray.length > 1) {
            formetedNumber = splitArray[0];
        }
        return (formetedNumber);
    };

    const toggleDeathsRecoveredRight = () => {
        if (deathsRecoveredCard === "deaths") {
            setDeathsRecoveredCard("recovered")
        } else if (deathsRecoveredCard === "recovered") {
            setDeathsRecoveredCard("today")
        } else if (deathsRecoveredCard === "today") {
            setDeathsRecoveredCard("deaths")
        }
    };
    const toggleDeathsRecoveredLeft = () => {
        if (deathsRecoveredCard === "deaths") {
            setDeathsRecoveredCard("today")
        } else if (deathsRecoveredCard === "today") {
            setDeathsRecoveredCard("recovered")
        } else if (deathsRecoveredCard === "recovered") {
            setDeathsRecoveredCard("deaths")
        }
    };

    //toggle map togglers border bottom
    let { admin0Style, admin2Style, todayStyle } = {};
    const onStyle = { borderBottom: "3px solid white", backgroundColor: "#240090" };
    admin0Style = deathsRecoveredCard === "deaths" ?
        onStyle :
        {}
    admin2Style = deathsRecoveredCard === "recovered" ?
        onStyle :
        {}
    todayStyle = deathsRecoveredCard === "today" ?
        onStyle :
        {}

    return (
        <div className={classes[1]}>
            <div
                id="list-deaths-wrapper"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={deathsdCardExpand ? { width: "98%", height: "730px", marginLeft: ".8em" } : { width: "200px", height: "410px" }}
            >
                <div className={"expand-shrink-icon-wrapper"}>
                    {
                        isHover
                            ? !deathsdCardExpand
                                ? <div style={{ top: "-6px", right: "-5px" }} onClick={() => setDeathsCardExpand(!deathsdCardExpand)} className={"expand-shrink-icon"}>{expandIcon}</div>
                                : <div style={{ top: "-6px", right: "-5px" }} onClick={() => setDeathsCardExpand(!deathsdCardExpand)} className={"expand-shrink-icon"}>{shrinkIcon}</div>
                            : null
                    }
                </div>
                <div id="heading">
                    <h4>
                        {
                            deathsRecoveredCard === "deaths"
                                ? "Global Deaths"
                                : deathsRecoveredCard === "recovered"
                                    ? "Global Recovered"
                                    : deathsRecoveredCard === "today"
                                        ? "Global Today's Deaths"
                                        : null
                        }
                    </h4>
                    {
                        deathsRecoveredCard === "deaths"
                            ? <h1 className={"deaths-num num"}>{formatNumber(globalData[0].deaths)}</h1>
                            : deathsRecoveredCard === "recovered"
                                ? <h1 className={"recovered-num num"}>{formatNumber(globalData[0].recovered)}</h1>
                                : deathsRecoveredCard === "today"
                                    ? <h1 className={"deaths-num num"}>{formatNumber(globalData[0].newDeaths)}</h1>
                                    : null
                    }
                </div>
                {
                    deathsRecoveredCard === "deaths"
                        ? <div id="admin0-heading">Deaths by Country</div>
                        : deathsRecoveredCard === "recovered"
                            ? <div id="admin0-heading">Recovered by Country</div>
                            : deathsRecoveredCard === "today"
                                ? <div id="admin0-heading">Today's Deaths by Country</div>
                                : null
                }
                <div id="ul">
                    {
                        deathsRecoveredCard === "deaths"
                            ? modifiedDeathsData.map((data, i) =>
                                <div className={"li"} key={i}><span className={"deaths-num"}>{formatNumber(data[1].deaths)} </span><span>{data[0]}</span></div>
                            )
                            : deathsRecoveredCard === "recovered"
                                ? modifiedRecoveredData.map((data, i) =>
                                    <div className={"li"} key={i}><span className={"recovered-num"}>{formatNumber(data[1].recovered)} </span><span>{data[0]}</span></div>
                                )
                                : deathsRecoveredCard === "today"
                                    ? modifiedTodayDeathData.map((data, i) =>
                                        <div className={"li"} key={i}><span className={"deaths-num"}>{formatNumber(data[2].deaths)} </span><span>{data[0]}</span></div>
                                    )
                                    : null
                    }
                </div>
            </div>
            {
                !deathsdCardExpand
                    ? <div className={"card-toggler"}>
                        <span className={"admin-icon"} onClick={() => { toggleDeathsRecoveredLeft() }}>{arrowLeft}</span>
                        {
                            deathsRecoveredCard === "deaths"
                                ? <span className={"card-toggler-name"}>Global Deaths</span>
                                : deathsRecoveredCard === "recovered"
                                    ? <span className={"card-toggler-name"}>Gloabl Recovered</span>
                                    : deathsRecoveredCard === "today"
                                        ? <span className={"card-toggler-name"}>Today's Deaths</span>
                                        : null
                        }
                        <span className={"admin-icon"} onClick={() => { toggleDeathsRecoveredRight() }}>{arrowRight}</span>
                    </div>
                    : <div id="card-toggler" style={deathsdCardExpand ? { bottom: "-13px", left: "15px" } : {}}>
                        <div className={"toggler"} style={admin0Style} onClick={() => { setDeathsRecoveredCard("deaths") }}>Global Deaths</div>
                        <div className={"toggler"} style={admin2Style} onClick={() => { setDeathsRecoveredCard("recovered") }} >Gloabl Recovered</div>
                        <div className={"toggler"} style={todayStyle} onClick={() => { setDeathsRecoveredCard("today") }} >Today's Deaths</div>
                    </div>
            }
        </div>
    )
}

export default DeathsRecoveredCard;