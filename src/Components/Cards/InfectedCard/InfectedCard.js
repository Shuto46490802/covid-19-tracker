import React, { Fragment, useState } from "react";

import "./InfectedCard.scss";

const InfectedCard = ({ countriesData, globalData, provincesData, arrowLeft, arrowRight, infectedCardExpand, expandIcon, shrinkIcon, setInfectedCardExpand, formatNumber, isTablet, isMobile, isInfectedCard, setIsInfectedCard }) => {

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
        if (isInfectedCard=== "admin0") {
            setIsInfectedCard("admin2")
        } else if (isInfectedCard === "admin2") {
            setIsInfectedCard("today")
        } else if (isInfectedCard === "today") {
            setIsInfectedCard("admin0")
        }
    };
    const toggleAdminInfectedLeft = () => {
        if (isInfectedCard === "admin0") {
            setIsInfectedCard("today")
        } else if (isInfectedCard === "today") {
            setIsInfectedCard("admin2")
        } else if (isInfectedCard === "admin2") {
            setIsInfectedCard("admin0")
        }
    };

    //toggle button togglers border bottom
    let { admin0Style, admin2Style, todayStyle } = {};
    const onStyle = { borderBottom: "3px solid #d9e4f4", backgroundColor: "#295897" };
    admin0Style = isInfectedCard === "admin0"
        ? onStyle
        : {}
    admin2Style = isInfectedCard === "admin2"
        ? onStyle
        : {}
    todayStyle = isInfectedCard === "today"
        ? onStyle
        : {}



    return (
        <Fragment>
            <div
                className={`card-container${infectedCardExpand ? "-expand" : isTablet || isMobile ? "-hide" : "" }`}
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
                        isInfectedCard === "admin0" || isInfectedCard === "admin2"
                            ? <div className={"card-header-text"}>Global Cases</div>
                            : <div className={"card-header-text"}>Global Today's Cases</div>
                    }

                    {
                        isInfectedCard === "admin0" || isInfectedCard === "admin2"
                            ? <h1 className={"card-header-num infected-num"} >{formatNumber(globalData[0].confirmed)}</h1>
                            : <h1 className={"card-header-num infected-num"} >{formatNumber(globalData[0].newConfirmed)}</h1>
                    }

                </div>
                {
                    isInfectedCard === "admin0" || isInfectedCard === "today"
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
                        isInfectedCard === "admin0"
                            ? modifiedGlobalCasesData.map((data, i) =>
                                <div className={"country-list"} key={i}>
                                    <div className={"list-num infected-num"} >{formatNumber(data[1].confirmed)}</div>
                                    <div className={"country-list-place"}>{data[0]}</div>
                                </div>
                            )
                            : isInfectedCard === "admin2"
                                ? modifiedProvincesData.map((data, i) =>
                                    <div className={"province-list"} key={i}>
                                        <div className={"list-num infected-num"} >{formatNumber(data[0])} <div className={"province-list-cases"}>Cases</div></div>
                                        <div className={"province-list-place"}>{data[1]}</div>
                                    </div>
                                )
                                : isInfectedCard === "today"
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
                        ? <div className={`arrow-toggler${isTablet ? "-hide" : "" }`}>
                            <div className={"arrow-icon"} onClick={() => toggleAdminInfectedLeft()}>{arrowLeft}</div>
                            <div className={"toggler-text"}>
                                {
                                    isInfectedCard === "admin0"
                                        ? "Admin0"
                                        : isInfectedCard === "admin2"
                                            ? "Admin2"
                                            : isInfectedCard === "today"
                                                ? "Global Today's Cases"
                                                : null
                                }
                            </div>
                            <div className={"arrow-icon"} onClick={() => toggleAdminInfectedRight()}>{arrowRight}</div>
                        </div>
                        : <div className={"button-toggler-wrapper-expand"}>
                            <div style={admin0Style} className={"button-toggler"} onClick={() => setIsInfectedCard("admin0")}>Admin0</div>
                            <div style={admin2Style} className={"button-toggler"} onClick={() => setIsInfectedCard("admin2")}>Admin2</div>
                            <div style={todayStyle} className={"button-toggler"} onClick={() => setIsInfectedCard("today")}>Global Today's Cases</div>
                        </div>
                }
            </div>

            {/* tablet */}
            <div
                className={`card-container${isTablet ? "-tablet-version" : isMobile ? "-mobile-version" : "-tablet" }`}
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
                        isInfectedCard === "admin0" || isInfectedCard === "admin2"
                            ? <div className={"card-header-text"}>Global Cases</div>
                            : <div className={"card-header-text"}>Global Today's Cases</div>
                    }

                    {
                        isInfectedCard === "admin0" || isInfectedCard === "admin2"
                            ? <h1 className={"card-header-num infected-num"} >{formatNumber(globalData[0].confirmed)}</h1>
                            : <h1 className={"card-header-num infected-num"} >{formatNumber(globalData[0].newConfirmed)}</h1>
                    }

                </div>
                {
                    isInfectedCard === "admin0" || isInfectedCard === "today"
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
                        isInfectedCard === "admin0"
                            ? modifiedGlobalCasesData.map((data, i) =>
                                <div className={"country-list"} key={i}>
                                    <div className={"list-num infected-num"} >{formatNumber(data[1].confirmed)}</div>
                                    <div className={"country-list-place"}>{data[0]}</div>
                                </div>
                            )
                            : isInfectedCard === "admin2"
                                ? modifiedProvincesData.map((data, i) =>
                                    <div className={"province-list"} key={i}>
                                        <div className={"list-num infected-num"} >{formatNumber(data[0])} <div className={"province-list-cases"}>Cases</div></div>
                                        <div className={"province-list-place"}>{data[1]}</div>
                                    </div>
                                )
                                : isInfectedCard === "today"
                                    ? modifiedTodayData.map((data, i) =>
                                        <div className={"country-list"} key={i}>
                                            <div className={"list-num infected-num"} >{formatNumber(data[1].confirmed)}</div>
                                            <div className={"country-list-place"}>{data[0]}</div>
                                        </div>
                                    )
                                    : null
                    }
                </div>
                <div className={`button-toggler-wrapper${isTablet ? "-tablet-version" : isMobile ? "-hide" : "-tablet" }`}>
                    <div style={admin0Style} className={"button-toggler"} onClick={() => setIsInfectedCard("admin0")}>Admin0</div>
                    <div style={admin2Style} className={"button-toggler"} onClick={() => setIsInfectedCard("admin2")}>Admin2</div>
                    <div style={todayStyle} className={"button-toggler"} onClick={() => setIsInfectedCard("today")}>Global Today's Cases</div>
                </div>
            </div>
        </Fragment>
    )
}

export default InfectedCard;