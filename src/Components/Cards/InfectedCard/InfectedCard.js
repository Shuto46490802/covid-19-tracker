import React, { Fragment, useState } from "react";

import "./InfectedCard.scss";

const InfectedCard = ({ countriesData, globalData, provincesData, arrowLeft, arrowRight, infectedCardExpand, expandIcon, shrinkIcon, setInfectedCardExpand, formatNumber, classes }) => {

    const [isCard, setIsCard] = useState("admin0");
    const [isHover, setIsHover] = useState(false);

    if (!countriesData[0] || !globalData[0] || !provincesData[0]) {
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
                className={`infected-card-container${infectedCardExpand ? "-expand" : ""}`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {
                    isHover
                        ? !infectedCardExpand
                            ? <div className={"expand-icon"} onClick={() => setInfectedCardExpand(true)}>{expandIcon}</div>
                            : <div className={"shrink-icon"} onClick={() => setInfectedCardExpand(false)}>{shrinkIcon}</div>
                        : null
                }
                <div className={"card-header"} >
                    {
                        isCard === "admin0" || isCard === "admin2"
                            ? <div className={"card-header-text"}>Global Cases</div>
                            : <div className={"card-header-text"}>Global Today's Cases</div>
                    }

                    {
                        isCard === "admin0" || isCard === "admin2"
                            ? <h1 className={"card-header-num infected-num"} >{formatNumber(globalData[0].confirmed)}</h1>
                            : <h1 className={"card-header-num infected-num"} >{formatNumber(globalData[0].newConfirmed)}</h1>
                    }

                </div>
                {
                    isCard === "admin0" || isCard === "today"
                        ? <div className={"country-card-note"} >
                            <div>Cases by Country</div>
                        </div>
                        : <div className={"province-card-note"} >
                            <div>Cases by</div>
                            <div>Province/State/Dpendency</div>
                        </div>
                }
                <div className={"ul"}>
                    {
                        isCard === "admin0"
                            ? modifiedGlobalCasesData.map((data, i) =>
                                <div className={"country-list"} key={i}>
                                    <div className={"list-num infected-num"} >{formatNumber(data[1].confirmed)}</div>
                                    <div className={"country-list-place"}>{data[0]}</div>
                                </div>
                            )
                            : isCard === "admin2"
                                ? modifiedProvincesData.map((data, i) =>
                                    <div className={"province-list"} key={i}>
                                        <div className={"list-num infected-num"} >{formatNumber(data[0])} <div className={"province-list-cases"}>Cases</div></div>
                                        <div className={"province-list-place"}>{data[1]}</div>
                                    </div>
                                )
                                : isCard === "today"
                                    ? modifiedTodayData.map((data, i) =>
                                        <div className={"country-list"} key={i}>
                                            <div className={"list-num infected-num"} >{formatNumber(data[1].confirmed)}</div>
                                            <div className={"country-list-place"}>{data[0]}</div>
                                        </div>
                                    )
                                    : null
                    }
                </div>
                {
                    !infectedCardExpand
                        ? <div className={"arrow-toggler"}>
                            <div className={"arrow-icon"} onClick={() => toggleAdminInfectedLeft()}>{arrowLeft}</div>
                            <div className={"card-toggler-text"}>
                                {
                                    isCard === "admin0"
                                        ? "Admin0"
                                        : isCard === "admin2"
                                            ? "Admin2"
                                            : isCard === "today"
                                                ? "Global Today's Cases"
                                                : null
                                }
                            </div>
                            <div className={"arrow-icon"} onClick={() => toggleAdminInfectedRight()}>{arrowRight}</div>
                        </div>
                        : <div className={"card-button-toggler-wrapper"}>
                            <div style={admin0Style} className={"button-toggler"} onClick={() => setIsCard("admin0")}>Admin0</div>
                            <div style={admin2Style} className={"button-toggler"} onClick={() => setIsCard("admin2")}>Admin2</div>
                            <div style={todayStyle} className={"button-toggler"} onClick={() => setIsCard("today")}>Global Today's Cases</div>
                        </div>
                }
            </div>

            {/* tablet */}
            <div
                className={`infected-card-container-tablet`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {
                    isHover
                        ? !infectedCardExpand
                            ? <div className={"expand-icon"} onClick={() => setInfectedCardExpand(true)}>{expandIcon}</div>
                            : <div className={"shrink-icon"} onClick={() => setInfectedCardExpand(false)}>{shrinkIcon}</div>
                        : null
                }
                <div className={"card-header"} >
                    {
                        isCard === "admin0" || isCard === "admin2"
                            ? <div className={"card-header-text"}>Global Cases</div>
                            : <div className={"card-header-text"}>Global Today's Cases</div>
                    }

                    {
                        isCard === "admin0" || isCard === "admin2"
                            ? <h1 className={"card-header-num infected-num"} >{formatNumber(globalData[0].confirmed)}</h1>
                            : <h1 className={"card-header-num infected-num"} >{formatNumber(globalData[0].newConfirmed)}</h1>
                    }

                </div>
                {
                    isCard === "admin0" || isCard === "today"
                        ? <div className={"country-card-note"} >
                            <div>Cases by Country</div>
                        </div>
                        : <div className={"province-card-note"} >
                            <div>Cases by</div>
                            <div>Province/State/Dpendency</div>
                        </div>
                }
                <div className={"ul"}>
                    {
                        isCard === "admin0"
                            ? modifiedGlobalCasesData.map((data, i) =>
                                <div className={"country-list"} key={i}>
                                    <div className={"list-num infected-num"} >{formatNumber(data[1].confirmed)}</div>
                                    <div className={"country-list-place"}>{data[0]}</div>
                                </div>
                            )
                            : isCard === "admin2"
                                ? modifiedProvincesData.map((data, i) =>
                                    <div className={"province-list"} key={i}>
                                        <div className={"list-num infected-num"} >{formatNumber(data[0])} <div className={"province-list-cases"}>Cases</div></div>
                                        <div className={"province-list-place"}>{data[1]}</div>
                                    </div>
                                )
                                : isCard === "today"
                                    ? modifiedTodayData.map((data, i) =>
                                        <div className={"country-list"} key={i}>
                                            <div className={"list-num infected-num"} >{formatNumber(data[1].confirmed)}</div>
                                            <div className={"country-list-place"}>{data[0]}</div>
                                        </div>
                                    )
                                    : null
                    }
                </div>
                <div className={"card-button-toggler-wrapper-tablet"}>
                    <div style={admin0Style} className={"button-toggler"} onClick={() => setIsCard("admin0")}>Admin0</div>
                    <div style={admin2Style} className={"button-toggler"} onClick={() => setIsCard("admin2")}>Admin2</div>
                    <div style={todayStyle} className={"button-toggler"} onClick={() => setIsCard("today")}>Global Today's Cases</div>
                </div>
            </div>
        </Fragment>
    )
}

export default InfectedCard;