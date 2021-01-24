import React, { Fragment, useState } from "react";

import "./InfectedCard.scss";

const InfectedCard = ({ countriesData, globalData, provincesData, arrowLeft, arrowRight, infectedCardExpand, expandIcon, shrinkIcon, setInfectedCardExpand, formatNumber }) => {

    const [isCard, setIsCard] = useState("admin0");
    const [isHover, setIsHover] = useState(false);

    if (!countriesData[0] || !globalData[0]) {
        return "Loading..."
    }

    //modify global datas
    const modifiedGlobalCasesData = countriesData
        .map(({ country, latestData }) => [country, latestData])
        .sort((a, b) => b[1].confirmed - a[1].confirmed);

    //modify provinces data
    const modifiedProvincesData = provincesData
        .filter((data) => data.length > 1)
        .map((data) => data
            .map(({ confirmed, key }) => [confirmed, key])
            .filter((data) => data[0] > 30000))
        .filter((data) => data.length > 0)
        .flat()
        .sort((a, b) => b[0] - a[0]);

    //modify today's data 
    const modifiedTodayData = countriesData
        .map(({ country, todayData }) => [country, todayData])
        .sort((a, b) => b[1].confirmed - a[1].confirmed);

    const toggleAdminInfectedRight = () => {
        if (isCard === "admin0") {
            setIsCard("admin2")
        } else if (isCard === "admin2") {
            setIsCard("today")
        } else if (isCard === "today") {
            setIsCard("admin0")
        }
    };
    const toggleAdminInfectedLeft = () => {
        if (isCard === "admin0") {
            setIsCard("today")
        } else if (isCard === "today") {
            setIsCard("admin2")
        } else if (isCard === "admin2") {
            setIsCard("admin0")
        }
    };

    //toggle map togglers border bottom
    let { admin0Style, admin2Style, todayStyle } = {};
    const onStyle = { borderBottom: "3px solid #d9e4f4", backgroundColor: "#295897" };
    admin0Style = isCard === "admin0"
        ? onStyle
        : {}
    admin2Style = isCard === "admin2"
        ? onStyle
        : {}
    todayStyle = isCard === "today"
        ? onStyle
        : {}

    return (
        <Fragment>
            <div
                className={"infected-card-container"}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={infectedCardExpand ? { width: "95%", height: "93%" } : {}}
            >
                {
                    isHover
                        ? !infectedCardExpand
                            ? <div className={"expand-icon"} onClick={() => setInfectedCardExpand(true)}>{expandIcon}</div>
                            : <div className={"shrink-icon"} onClick={() => setInfectedCardExpand(false)}>{shrinkIcon}</div>
                        : null
                }
                <div className={"card-header"} >
                    <span className={"card-header-text"}>
                        {
                            isCard === "admin0" || isCard === "admin2"
                                ? "Global Cases"
                                : "Global Today's Cases"
                        }
                    </span>
                    <h1 className={"card-header-num infected-num"} >
                        {
                            isCard === "admin0" || isCard === "admin2"
                                ? formatNumber(globalData[0].confirmed)
                                : formatNumber(globalData[0].newConfirmed)
                        }
                    </h1>
                </div>
                {
                    isCard === "admin0" || isCard === "today"
                        ? <div className={"country-card-note"} >
                            <span>Cases by Country</span>
                        </div>
                        : <div className={"province-card-note"} >
                            <span>Cases by</span>
                            <span>Province/State/Dpendency</span>
                        </div>
                }
                <div className={"ul"}>
                    {
                        isCard === "admin0"
                            ? modifiedGlobalCasesData.map((data, i) =>
                                <div className={"country-list"} key={i}>
                                    <span className={"list-num infected-num"} >{formatNumber(data[1].confirmed)}</span>
                                    <span>{data[0]}</span>
                                </div>
                            )
                            : isCard === "admin2"
                                ? modifiedProvincesData.map((data, i) =>
                                    <div className={"province-list"} key={i}>
                                        <span className={"list-num infected-num"} >{formatNumber(data[0])} <span className={"province-list-cases"}>Cases</span></span>
                                        <span className={"province-list-place"}>{data[1]}</span>
                                    </div>
                                )
                                : isCard === "today"
                                    ? modifiedTodayData.map((data, i) =>
                                        <div className={"country-list"} key={i}>
                                            <span className={"list-num infected-num"} >{formatNumber(data[1].confirmed)}</span>
                                            <span>{data[0]}</span>
                                        </div>
                                    )
                                    : null
                    }
                </div>
            </div>
            {
                !infectedCardExpand
                    ? <div className={"arrow-toggler"}>
                        <span className={"arrow-icon"} onClick={() => toggleAdminInfectedLeft()}>{arrowLeft}</span>
                        <span className={"card-toggler-text"}>
                            {
                                isCard === "admin0"
                                    ? "Admin0"
                                    : isCard === "admin2"
                                        ? "Admin2"
                                        : isCard === "today"
                                            ? "Global Today's Cases"
                                            : null
                            }
                        </span>
                        <span className={"arrow-icon"} onClick={() => toggleAdminInfectedRight()}>{arrowRight}</span>
                    </div>
                    : <div className={"card-button-toggler-wrapper"}>
                        <div style={admin0Style} className={"button-toggler"} onClick={() => setIsCard("admin0")}>Admin0</div>
                        <div style={admin2Style} className={"button-toggler"} onClick={() => setIsCard("admin2")}>Admin2</div>
                        <div style={todayStyle} className={"button-toggler"} onClick={() => setIsCard("today")}>Global Today's Cases</div>
                    </div>
            }


            <div
                className={"infected-card-container-tablet"}>
                <div className={"card-header"} >
                    <span className={"card-header-text"}>
                        {
                            isCard === "admin0" || isCard === "admin2"
                                ? "Global Cases"
                                : "Global Today's Cases"
                        }
                    </span>
                    <h1 className={"card-header-num infected-num"} >
                        {
                            isCard === "admin0" || isCard === "admin2"
                                ? formatNumber(globalData[0].confirmed)
                                : formatNumber(globalData[0].newConfirmed)
                        }
                    </h1>
                </div>
                {
                    isCard === "admin0" || isCard === "today"
                        ? <div className={"country-card-note"} >
                            <span>Cases by Country</span>
                        </div>
                        : <div className={"province-card-note"} >
                            <span>Cases by</span>
                            <span>Province/State/Dpendency</span>
                        </div>
                }
                <div className={"ul"}>
                    {
                        isCard === "admin0"
                            ? modifiedGlobalCasesData.map((data, i) =>
                                <div className={"country-list"} key={i}>
                                    <span className={"list-num infected-num"} >{formatNumber(data[1].confirmed)}</span>
                                    <span>{data[0]}</span>
                                </div>
                            )
                            : isCard === "admin2"
                                ? modifiedProvincesData.map((data, i) =>
                                    <div className={"province-list"} key={i}>
                                        <span className={"list-num infected-num"} >{formatNumber(data[0])} <span className={"province-list-cases"}>Cases</span></span>
                                        <span className={"province-list-place"}>{data[1]}</span>
                                    </div>
                                )
                                : isCard === "today"
                                    ? modifiedTodayData.map((data, i) =>
                                        <div className={"country-list"} key={i}>
                                            <span className={"list-num infected-num"} >{formatNumber(data[1].confirmed)}</span>
                                            <span>{data[0]}</span>
                                        </div>
                                    )
                                    : null
                    }
                </div>
            </div>
            <div className={"card-button-toggler-wrapper-tablet"}>
                <div style={admin0Style} className={"button-toggler"} onClick={() => setIsCard("admin0")}>Admin0</div>
                <div style={admin2Style} className={"button-toggler"} onClick={() => setIsCard("admin2")}>Admin2</div>
                <div style={todayStyle} className={"button-toggler"} onClick={() => setIsCard("today")}>Global Today's Cases</div>
            </div>
        </Fragment>
    )
}

export default InfectedCard;