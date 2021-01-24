import React, { useState, Fragment } from "react";
import "./ActiveIncidentRateCard.scss";

const ActiveIncidentRateCard = ({ provincesData, classes, arrowLeft, arrowRight, activeCardExpand, setActiveCardExpand, expandIcon, shrinkIcon, formatNumber }) => {

    const [isCard, setIsCard] = useState("active");
    const [isHover, setIsHover] = useState(false);

    if (!provincesData) {
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
        if (isCard === "active") {
            setIsCard("incidentRate")
        } else {
            setIsCard("active")
        }
    }

    let { admin0Style, admin2Style } = {};
    const onStyle = { borderBottom: "3px solid #d9e4f4", backgroundColor: "#295897" };
    admin0Style = isCard === "active" ?
        onStyle :
        {}
    admin2Style = isCard === "incidentRate" ?
        onStyle :
        {}

    return (
        <Fragment>
            <div
                className={"active-card-container"}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={activeCardExpand ? { width: "95%", height: "93%" } : {}}
            >
                {
                    isHover
                        ? !activeCardExpand
                            ? <div className={"expand-icon"} onClick={() => setActiveCardExpand(true)}>{expandIcon}</div>
                            : <div className={"shrink-icon"} onClick={() => setActiveCardExpand(false)}>{shrinkIcon}</div>
                        : null
                }
                <div className={"card-header"} style={isCard === "incidentRate" ? { padding: "0.85em 0 0 0" } : {}} >
                    {
                        isCard === "active"
                            ? <span className={"card-header-text"}>
                                Gloabl Active Cases
                                    </span>
                            : isCard === "incidentRate"
                                ? <span className={"card-header-text"}>Global Incident Rate<span id="percentage">(per 100,000 people)</span></span>
                                : null
                    }


                    {
                        isCard === "active"
                            ? <h1 className={"card-header-num active-num"} >{formatNumber(activeDataSum)}</h1>
                            : isCard === "incidentRate"
                                ? <h1 className={"card-header-num incidentRate-num"} >{formatNumber(incidentRateAvarage)}</h1>
                                : null
                    }

                </div>
                <div className={"country-card-note"} >
                    <span>Cases by Country</span>
                </div>
                <div className={"ul"}>
                    {
                        isCard === "active"
                            ? modifiedActiveData.map((data, i) =>
                                <div className={"province-list"} key={i}>
                                    <span className={"list-num active-num"} >{formatNumber(data[0])} <span className={"province-list-cases"}>Cases</span></span>
                                    <span className={"province-list-place"}>{data[1]}</span>
                                </div>
                            )
                            : modifiedIncidentRateData.map((data, i) =>
                                <div className={"province-list"} key={i}>
                                    <span className={"list-num incidentRate-num"} >{formatNumber(data[0])} <span className={"province-list-cases"}>Cases</span></span>
                                    <span className={"province-list-place"}>{data[1]}</span>
                                </div>
                            )
                    }
                </div>
            </div>
            {
                !activeCardExpand
                    ? <div className={"arrow-toggler"}>
                        <span className={"arrow-icon"} onClick={() => toggleActiveIncidentRateCard()}>{arrowLeft}</span>
                        <span className={"card-toggler-text"}>
                            {
                                isCard === "active"
                                    ? "Active Cases"
                                    : isCard === "incidentRate"
                                        ? "Incident Rate"
                                        : null
                            }
                        </span>
                        <span className={"arrow-icon"} onClick={() => toggleActiveIncidentRateCard()}>{arrowRight}</span>
                    </div>
                    : <div className={"card-button-toggler-wrapper"}>
                        <div style={admin0Style} className={"button-toggler"} onClick={() => setIsCard("active")}>Active Cases</div>
                        <div style={admin2Style} className={"button-toggler"} onClick={() => setIsCard("incidentRate")}>Incident Rate</div>
                    </div>
            }


            <div className={"active-card-container-tablet"}>
                <div className={"card-header"} style={isCard === "incidentRate" ? { padding: "0.85em 0 0 0" } : {}} >
                    {
                        isCard === "active"
                            ? <span className={"card-header-text"}>
                                Gloabl Active Cases
                                    </span>
                            : isCard === "incidentRate"
                                ? <span className={"card-header-text"}>Global Incident Rate<span id="percentage">(per 100,000 people)</span></span>
                                : null
                    }


                    {
                        isCard === "active"
                            ? <h1 className={"card-header-num active-num"} >{formatNumber(activeDataSum)}</h1>
                            : isCard === "incidentRate"
                                ? <h1 className={"card-header-num incidentRate-num"} >{formatNumber(incidentRateAvarage)}</h1>
                                : null
                    }

                </div>
                <div className={"country-card-note"} >
                    <span>Cases by Country</span>
                </div>
                <div className={"ul"}>
                    {
                        isCard === "active"
                            ? modifiedActiveData.map((data, i) =>
                                <div className={"province-list"} key={i}>
                                    <span className={"list-num active-num"} >{formatNumber(data[0])} <span className={"province-list-cases"}>Cases</span></span>
                                    <span className={"province-list-place"}>{data[1]}</span>
                                </div>
                            )
                            : modifiedIncidentRateData.map((data, i) =>
                                <div className={"province-list"} key={i}>
                                    <span className={"list-num incidentRate-num"} >{formatNumber(data[0])} <span className={"province-list-cases"}>Cases</span></span>
                                    <span className={"province-list-place"}>{data[1]}</span>
                                </div>
                            )
                    }
                </div>
            </div>
            <div className={"card-button-toggler-wrapper-tablet"}>
                <div style={admin0Style} className={"button-toggler"} onClick={() => setIsCard("active")}>Active Cases</div>
                <div style={admin2Style} className={"button-toggler"} onClick={() => setIsCard("incidentRate")}>Incident Rate</div>
            </div>
        </Fragment>
    )
}
export default ActiveIncidentRateCard;