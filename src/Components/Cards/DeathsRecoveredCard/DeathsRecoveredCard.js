import React, { useState, Fragment } from "react";
import "./DeathsRecoveredCard.scss"

const DeathsRecoveredCard = ({ countriesData, globalData, classes, arrowLeft, arrowRight, deathsdCardExpand, setDeathsCardExpand, expandIcon, shrinkIcon, formatNumber }) => {

    const [isCard, setIsCard] = useState("deaths");
    const [isHover, setIsHover] = useState(false);

    if (!countriesData[0] || !globalData[0]) {
        return "Loading ..."
    }

    //modify deaths datas
    const modifiedGlobalDeathsData = countriesData
        .map(({ country, latestData, todayData }) => [country, latestData, todayData])
        .sort((a, b) => b[1].deaths - a[1].deaths);

    //modify recovered datas
    const modifiedGlobalRecoveredData = countriesData
        .map(({ country, latestData, todayData }) => [country, latestData, todayData])
        .sort((a, b) => b[1].recovered - a[1].recovered);

    //modify today's deaths data 
    const modifiedTodayData = countriesData
        .map(({ country, latestData, todayData }) => [country, latestData, todayData])
        .sort((a, b) => b[2].deaths - a[2].deaths);

    //toggle cards
    const toggleDeathsRecoveredRight = () => {
        if (isCard === "deaths") {
            setIsCard("recovered")
        } else if (isCard === "recovered") {
            setIsCard("today")
        } else if (isCard === "today") {
            setIsCard("deaths")
        }
    };
    const toggleDeathsRecoveredLeft = () => {
        if (isCard === "deaths") {
            setIsCard("today")
        } else if (isCard === "today") {
            setIsCard("recovered")
        } else if (isCard === "recovered") {
            setIsCard("deaths")
        }
    };

    //toggle map togglers border bottom
    let { admin0Style, admin2Style, todayStyle } = {};
    const onStyle = { borderBottom: "3px solid white", backgroundColor: "#240090" };
    admin0Style = isCard === "deaths" ?
        onStyle :
        {}
    admin2Style = isCard === "recovered" ?
        onStyle :
        {}
    todayStyle = isCard === "today" ?
        onStyle :
        {}

    return (
        <Fragment>
            <div
                className={"deaths-card-container"}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={deathsdCardExpand ? { width: "95%", height: "93%" } : { }}
            >
                {
                    isHover
                        ? !deathsdCardExpand
                            ? <div className={"expand-icon"} onClick={() => setDeathsCardExpand(true)}>{expandIcon}</div>
                            : <div className={"shrink-icon"} onClick={() => setDeathsCardExpand(false)}>{shrinkIcon}</div>
                        : null
                }
                <div className={"card-header"} >
                    <span className={"card-header-text"}>
                        {
                            isCard === "deaths"
                                ? "Global Deaths"
                                : isCard === "recovered"
                                    ? "Global Recovered"
                                    : isCard === "today"
                                        ? "Global Todays's Deaths"
                                        : null
                        }
                    </span>

                    {
                        isCard === "deaths"
                            ? <h1 className={"card-header-num deaths-num"} >{formatNumber(globalData[0].deaths)}</h1>
                            : isCard === "recovered"
                                ? <h1 className={"card-header-num recovered-num"} >{formatNumber(globalData[0].recovered)}</h1>
                                : isCard === "today"
                                    ? <h1 className={"card-header-num deaths-num"} >{formatNumber(globalData[0].newDeaths)}</h1>
                                    : null
                    }

                </div>
                <div className={"country-card-note"} >
                    <span>Cases by Country</span>
                </div>
                <div className={"ul"}>
                    {
                        isCard === "deaths"
                            ? modifiedGlobalDeathsData.map((data, i) =>
                                <div className={"country-list"} key={i}>
                                    <span className={"list-num deaths-num"} >{formatNumber(data[1].deaths)}</span>
                                    <span>{data[0]}</span>
                                </div>
                            )
                            : isCard === "recovered"
                                ? modifiedGlobalRecoveredData.map((data, i) =>
                                    <div className={"country-list"} key={i}>
                                        <span className={"list-num recovered-num"} >{formatNumber(data[1].recovered)}</span>
                                        <span>{data[0]}</span>
                                    </div>
                                )
                                : isCard === "today"
                                    ? modifiedTodayData.map((data, i) =>
                                        <div className={"country-list"} key={i}>
                                            <span className={"list-num deaths-num"} >{formatNumber(data[2].deaths)}</span>
                                            <span>{data[0]}</span>
                                        </div>
                                    )
                                    : null
                    }
                </div>
            </div>
            <div className={"arrow-toggler"}>
                <span className={"arrow-icon"} onClick={() => toggleDeathsRecoveredLeft()}>{arrowLeft}</span>
                <span className={"card-toggler-text"}>
                    {
                        isCard === "deaths"
                            ? "Deaths"
                            : isCard === "recovered"
                                ? "Recovered"
                                : isCard === "today"
                                    ? "Global Today's Deaths"
                                    : null
                    }
                </span>
                <span className={"arrow-icon"} onClick={() => toggleDeathsRecoveredRight()}>{arrowRight}</span>
            </div>


            <div className={"deaths-card-container-mobile"}>
                <div className={"card-header"} >
                    <span className={"card-header-text"}>
                        {
                            isCard === "deaths"
                                ? "Global Deaths"
                                : isCard === "recovered"
                                    ? "Global Recovered"
                                    : isCard === "today"
                                        ? "Global Todays's Deaths"
                                        : null
                        }
                    </span>

                    {
                        isCard === "deaths"
                            ? <h1 className={"card-header-num deaths-num"} >{formatNumber(globalData[0].deaths)}</h1>
                            : isCard === "recovered"
                                ? <h1 className={"card-header-num recovered-num"} >{formatNumber(globalData[0].recovered)}</h1>
                                : isCard === "today"
                                    ? <h1 className={"card-header-num deaths-num"} >{formatNumber(globalData[0].newDeaths)}</h1>
                                    : null
                    }

                </div>
                <div className={"country-card-note"} >
                    <span>Cases by Country</span>
                </div>
                <div className={"ul"}>
                    {
                        isCard === "deaths"
                            ? modifiedGlobalDeathsData.map((data, i) =>
                                <div className={"country-list"} key={i}>
                                    <span className={"list-num deaths-num"} >{formatNumber(data[1].deaths)}</span>
                                    <span>{data[0]}</span>
                                </div>
                            )
                            : isCard === "recovered"
                                ? modifiedGlobalRecoveredData.map((data, i) =>
                                    <div className={"country-list"} key={i}>
                                        <span className={"list-num recovered-num"} >{formatNumber(data[1].recovered)}</span>
                                        <span>{data[0]}</span>
                                    </div>
                                )
                                : isCard === "today"
                                    ? modifiedTodayData.map((data, i) =>
                                        <div className={"country-list"} key={i}>
                                            <span className={"list-num deaths-num"} >{formatNumber(data[2].deaths)}</span>
                                            <span>{data[0]}</span>
                                        </div>
                                    )
                                    : null
                    }
                </div>
            </div>
            <div className={"arrow-toggler-mobile"}>
                <span className={"arrow-icon"} onClick={() => toggleDeathsRecoveredLeft()}>{arrowLeft}</span>
                <span className={"card-toggler-text"}>
                    {
                        isCard === "deaths"
                            ? "Deaths"
                            : isCard === "recovered"
                                ? "Recovered"
                                : isCard === "today"
                                    ? "Global Today's Deaths"
                                    : null
                    }
                </span>
                <span className={"arrow-icon"} onClick={() => toggleDeathsRecoveredRight()}>{arrowRight}</span>
            </div>
        </Fragment>
    )
}

export default DeathsRecoveredCard;