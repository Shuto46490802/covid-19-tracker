import React, { useState, Fragment } from "react";
import "./ActiveIncidentRateCard.scss";

const ActiveIncidentRateCard = ({ provincesData, classes, arrowLeft, arrowRight, activeCardExpand, setActiveCardExpand, expandIcon, shrinkIcon, formatNumber, isTablet, isMobile, isActiveIncidentCard, setIsActiveIncidentCard}) => {

    const [isHover, setIsHover] = useState(false);

    if (!provincesData[0]) {
        return "Loading..."
    };

    const modifiedActiveData = provincesData
        .filter((data) => data.length > 0)
        .map((data) => data
            .map(({ active, key }) => [active, key])
            .filter((data) => data[0] > 30000)
        )
        .flat()
        .sort((a, b) => b[0] - a[0]);

    const activeDataSum = provincesData
        .filter((data) => data.length > 0)
        .map((data) => data
            .map(({ active }) => active))
        .flat()
        .reduce((a, b) => a + b);

    const modifiedIncidentRateData = provincesData
        .filter((data) => data.length > 0)
        .map((data) => data
            .map(({ incidentRate, key }) => [incidentRate, key])
            .filter((data) => data[0] > 12000)
        )
        .flat()
        .sort((a, b) => b[0] - a[0]);

    const numberOfProvinces = provincesData
        .filter((data) => data.length > 0)
        .map((data) => data
            .map(({ active }) => active))
        .flat().length;

    const incidentRateAvarage = Math.floor((provincesData
        .filter((data) => data.length > 0)
        .map((data) => data
            .map(({ active }) => active))
        .flat()
        .reduce((a, b) => a + b)) / numberOfProvinces);

    const toggleActiveIncidentRateCard = () => {
        if (isActiveIncidentCard === "active") {
            setIsActiveIncidentCard("incidentRate")
        } else {
            setIsActiveIncidentCard("active")
        }
    }

    let { admin0Style, admin2Style } = {};
    const onStyle = { borderBottom: "3px solid #d9e4f4", backgroundColor: "#295897" };
    admin0Style = isActiveIncidentCard === "active" ?
        onStyle :
        {}
    admin2Style = isActiveIncidentCard === "incidentRate" ?
        onStyle :
        {}

    return (
        <Fragment>
            <div
                className={`card-container${activeCardExpand ? "-expand" : isTablet || isMobile ? "-hide" : ""}`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {
                    isHover
                        ? !activeCardExpand
                            ? <div className={"expand-icon"} onClick={() => setActiveCardExpand(true)}>{expandIcon}</div>
                            : <div className={"shrink-icon"} onClick={() => setActiveCardExpand(false)}>{shrinkIcon}</div>
                        : null
                }
                <div className={isActiveIncidentCard === "active" ? "card-header" : "card-header card-header-incident"} >
                    {
                        isActiveIncidentCard === "active"
                            ? <div className={"card-header-text"}>
                                Gloabl Active Cases
                                </div>
                            : isActiveIncidentCard === "incidentRate"
                                ? <div className={"card-header-text"}>Global Incident Rate<div id="percentage">(per 100,000 people)</div></div>
                                : null
                    }
                    {
                        isActiveIncidentCard === "active"
                            ? <h1 className={"card-header-num active-num"} >{formatNumber(activeDataSum)}</h1>
                            : isActiveIncidentCard === "incidentRate"
                                ? <h1 className={"card-header-num incidentRate-num"} >{formatNumber(incidentRateAvarage)}</h1>
                                : null
                    }
                </div>
                <div className={"province-card-note"} >
                    <div>Cases by</div>
                    <div>Province/State/Dpendency</div>
                </div>
                <div className={"ul"}>
                    {
                        isActiveIncidentCard === "active"
                            ? modifiedActiveData.map((data, i) =>
                                <div className={"province-list"} key={i}>
                                    <div className={"list-num active-num"} >{formatNumber(data[0])} <div className={"province-list-cases"}>Cases</div></div>
                                    <div className={"province-list-place"}>{data[1]}</div>
                                </div>
                            )
                            : modifiedIncidentRateData.map((data, i) =>
                                <div className={"province-list"} key={i}>
                                    <div className={"list-num incidentRate-num"} >{formatNumber(data[0])} <div className={"province-list-cases"}>Cases</div></div>
                                    <div className={"province-list-place"}>{data[1]}</div>
                                </div>
                            )
                    }
                </div>
                {
                    !activeCardExpand
                        ? <div className={"arrow-toggler"}>
                            <div className={"arrow-icon"} onClick={() => toggleActiveIncidentRateCard()}>{arrowLeft}</div>
                            <div className={"toggler-text"}>
                                {
                                    isActiveIncidentCard === "active"
                                        ? "Active Cases"
                                        : isActiveIncidentCard === "incidentRate"
                                            ? "Incident Rate"
                                            : null
                                }
                            </div>
                            <div className={"arrow-icon"} onClick={() => toggleActiveIncidentRateCard()}>{arrowRight}</div>
                        </div>
                        : <div className={"button-toggler-wrapper-expand"}>
                            <div style={admin0Style} className={"button-toggler"} onClick={() => setIsActiveIncidentCard("active")}>Active Cases</div>
                            <div style={admin2Style} className={"button-toggler"} onClick={() => setIsActiveIncidentCard("incidentRate")}>Incident Rate</div>
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
                        ? !activeCardExpand
                            ? <div className={"expand-icon"} onClick={() => setActiveCardExpand(true)}>{expandIcon}</div>
                            : <div className={"shrink-icon"} onClick={() => setActiveCardExpand(false)}>{shrinkIcon}</div>
                        : null
                }
                <div className={isActiveIncidentCard === "active" ? "card-header" : "card-header card-header-incident"} >
                    {
                        isActiveIncidentCard === "active"
                            ? <div className={"card-header-text"}>
                                Gloabl Active Cases
                                </div>
                            : isActiveIncidentCard === "incidentRate"
                                ? <div className={"card-header-text"}>Global Incident Rate<div id="percentage">(per 100,000 people)</div></div>
                                : null
                    }
                    {
                        isActiveIncidentCard === "active"
                            ? <h1 className={"card-header-num active-num"} >{formatNumber(activeDataSum)}</h1>
                            : isActiveIncidentCard === "incidentRate"
                                ? <h1 className={"card-header-num incidentRate-num"} >{formatNumber(incidentRateAvarage)}</h1>
                                : null
                    }
                </div>
                <div className={"province-card-note"} >
                    <div>Cases by</div>
                    <div>Province/State/Dpendency</div>
                </div>
                <div className={"ul"}>
                    {
                        isActiveIncidentCard === "active"
                            ? modifiedActiveData.map((data, i) =>
                                <div className={"province-list"} key={i}>
                                    <div className={"list-num active-num"} >{formatNumber(data[0])} <div className={"province-list-cases"}>Cases</div></div>
                                    <div className={"province-list-place"}>{data[1]}</div>
                                </div>
                            )
                            : modifiedIncidentRateData.map((data, i) =>
                                <div className={"province-list"} key={i}>
                                    <div className={"list-num incidentRate-num"} >{formatNumber(data[0])} <div className={"province-list-cases"}>Cases</div></div>
                                    <div className={"province-list-place"}>{data[1]}</div>
                                </div>
                            )
                    }
                </div>
                <div className={`button-toggler-wrapper-tablet${isTablet ? "-version" : isMobile ? "-hide" : "" }`}>
                    <div style={admin0Style} className={"button-toggler"} onClick={() => setIsActiveIncidentCard("active")}>Active Cases</div>
                    <div style={admin2Style} className={"button-toggler"} onClick={() => setIsActiveIncidentCard("incidentRate")}>Incident Rate</div>
                </div>
            </div>
        </Fragment>
    )
}
export default ActiveIncidentRateCard;