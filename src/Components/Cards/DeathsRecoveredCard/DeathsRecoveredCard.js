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
    const onStyle = { borderBottom: "3px solid #d9e4f4", backgroundColor: "#295897" };
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
                className={`deaths-card-container${deathsdCardExpand ? "-expand" : ""}`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {
                    isHover
                        ? !deathsdCardExpand
                            ? <div className={"expand-icon"} onClick={() => setDeathsCardExpand(true)}>{expandIcon}</div>
                            : <div className={"shrink-icon"} onClick={() => setDeathsCardExpand(false)}>{shrinkIcon}</div>
                        : null
                }
                <div className={"card-header"} >
                    {
                        isCard === "deaths"
                            ? <div className={"card-header-text"}>Global Deaths</div>
                            : isCard === "recovered"
                                ? <div className={"card-header-text"}>Global Recovered</div>
                                : isCard === "today"
                                    ? <div className={"card-header-text"}>Global Todays's Deaths</div>
                                    : null
                    }
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
                    <div>Cases by Country</div>
                </div>
                <div className={"ul"}>
                    {
                        isCard === "deaths"
                            ? modifiedGlobalDeathsData.map((data, i) =>
                                <div className={"country-list"} key={i}>
                                    <div className={"list-num deaths-num"} >{formatNumber(data[1].deaths)}</div>
                                    <div className={"country-list-place"}>{data[0]}</div>
                                </div>
                            )
                            : isCard === "recovered"
                                ? modifiedGlobalRecoveredData.map((data, i) =>
                                    <div className={"country-list"} key={i}>
                                        <div className={"list-num recovered-num"} >{formatNumber(data[1].recovered)}</div>
                                        <div className={"country-list-place"}>{data[0]}</div>
                                    </div>
                                )
                                : isCard === "today"
                                    ? modifiedTodayData.map((data, i) =>
                                        <div className={"country-list"} key={i}>
                                            <div className={"list-num deaths-num"} >{formatNumber(data[2].deaths)}</div>
                                            <div className={"country-list-place"}>{data[0]}</div>
                                        </div>
                                    )
                                    : null
                    }
                </div>
                {
                    !deathsdCardExpand
                        ? <div className={"arrow-toggler"}>
                            <div className={"arrow-icon"} onClick={() => toggleDeathsRecoveredLeft()}>{arrowLeft}</div>
                            <div className={"card-toggler-text"}>
                                {
                                    isCard === "deaths"
                                        ? "Deaths"
                                        : isCard === "recovered"
                                            ? "Recovered"
                                            : isCard === "today"
                                                ? "Global Today's Deaths"
                                                : null
                                }
                            </div>
                            <div className={"arrow-icon"} onClick={() => toggleDeathsRecoveredRight()}>{arrowRight}</div>
                        </div>
                        : <div className={"card-button-toggler-wrapper"}>
                            <div style={admin0Style} className={"button-toggler"} onClick={() => setIsCard("deaths")}>Deaths</div>
                            <div style={admin2Style} className={"button-toggler"} onClick={() => setIsCard("recovered")}>Recovered</div>
                            <div style={todayStyle} className={"button-toggler"} onClick={() => setIsCard("today")}>Global Today's Deaths</div>
                        </div>
                }
            </div>

            {/* tablet */}
            <div
                className={`deaths-card-container-tablet`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {
                    isHover
                        ? !deathsdCardExpand
                            ? <div className={"expand-icon"} onClick={() => setDeathsCardExpand(true)}>{expandIcon}</div>
                            : <div className={"shrink-icon"} onClick={() => setDeathsCardExpand(false)}>{shrinkIcon}</div>
                        : null
                }
                <div className={"card-header"} >
                    {
                        isCard === "deaths"
                            ? <div className={"card-header-text"}>Global Deaths</div>
                            : isCard === "recovered"
                                ? <div className={"card-header-text"}>Global Recovered</div>
                                : isCard === "today"
                                    ? <div className={"card-header-text"}>Global Todays's Deaths</div>
                                    : null
                    }
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
                    <div>Cases by Country</div>
                </div>
                <div className={"ul"}>
                    {
                        isCard === "deaths"
                            ? modifiedGlobalDeathsData.map((data, i) =>
                                <div className={"country-list"} key={i}>
                                    <div className={"list-num deaths-num"} >{formatNumber(data[1].deaths)}</div>
                                    <div className={"country-list-place"}>{data[0]}</div>
                                </div>
                            )
                            : isCard === "recovered"
                                ? modifiedGlobalRecoveredData.map((data, i) =>
                                    <div className={"country-list"} key={i}>
                                        <div className={"list-num recovered-num"} >{formatNumber(data[1].recovered)}</div>
                                        <div className={"country-list-place"}>{data[0]}</div>
                                    </div>
                                )
                                : isCard === "today"
                                    ? modifiedTodayData.map((data, i) =>
                                        <div className={"country-list"} key={i}>
                                            <div className={"list-num deaths-num"} >{formatNumber(data[2].deaths)}</div>
                                            <div className={"country-list-place"}>{data[0]}</div>
                                        </div>
                                    )
                                    : null
                    }
                </div>
                <div className={"card-button-toggler-wrapper-tablet"}>
                    <div style={admin0Style} className={"button-toggler"} onClick={() => setIsCard("deaths")}>Deaths</div>
                    <div style={admin2Style} className={"button-toggler"} onClick={() => setIsCard("recovered")}>Recovered</div>
                    <div style={todayStyle} className={"button-toggler"} onClick={() => setIsCard("today")}>Global Today's Deaths</div>
                </div>
            </div>
        </Fragment>
    )
}

export default DeathsRecoveredCard;