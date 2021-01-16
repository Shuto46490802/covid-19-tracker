import React, { useState } from "react";
import "./ActiveIncidentRateCard.css";

const ActiveIncidentRateCard = ({ provincesData, classes, arrowLeft, arrowRight, activeCardExpand, setActiveCardExpand, expandIcon, shrinkIcon }) => {

    const [activeIncidentRateCard, setActiveIncidentRateCard] = useState("active");
    const [isHover, setIsHover] = useState(false);

    if (!provincesData[0]) {
        return "Loading"
    };

    const modifiedActiveData = provincesData
        .filter((data) => data.length > 0)
        .map((data) => data
            .map(({ active, key }) => [active, key])
            .filter((data) => data[0] > 30000)
        )
        .flat()
        .sort((a, b) => b[0] - a[0]);

    const modifiedActiveDataSum = provincesData
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

    const modifiedIncidentRateDataAvarage = Math.floor((provincesData
        .filter((data) => data.length > 0)
        .map((data) => data
            .map(({ active }) => active))
        .flat()
        .reduce((a, b) => a + b)) / numberOfProvinces);

    const formatNumber = inputNumber => {
        let formetedNumber = (Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let splitArray = formetedNumber.split('.');
        if (splitArray.length > 1) {
            formetedNumber = splitArray[0];
        }
        return (formetedNumber);
    };

    const toggleActiveIncidentRateCard = () => {
        if (activeIncidentRateCard === "active") {
            setActiveIncidentRateCard("incidentRate")
        } else {
            setActiveIncidentRateCard("active")
        }
    }

    let { admin0Style, admin2Style } = {};
    const onStyle = { borderBottom: "3px solid white", backgroundColor: "#240090" };
    admin0Style = activeIncidentRateCard === "active" ?
        onStyle :
        {}
    admin2Style = activeIncidentRateCard === "incidentRate" ?
        onStyle :
        {}

    return (
        <div className={`${classes[2]}`}>
            <div
                id="list-active-wrapper"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={activeCardExpand ? { width: "98%", height: "730px", marginLeft: ".8em" } : { width: "200px", height: "410px" }}
            >
                <div className={"expand-shrink-icon-wrapper"}>
                    {
                        isHover
                            ? !activeCardExpand
                                ? <div style={{ top: "-6px", right: "-5px" }} onClick={() => setActiveCardExpand(!activeCardExpand)} className={"expand-shrink-icon"}>{expandIcon}</div>
                                : <div style={{ top: "-6px", right: "-5px" }} onClick={() => setActiveCardExpand(!activeCardExpand)} className={"expand-shrink-icon"}>{shrinkIcon}</div>
                            : null
                    }
                </div>
                {
                    activeIncidentRateCard === "active"
                        ? <div id="heading">
                            <h4>Global Active Case</h4>
                            <h1 className={"active-num num"}>{formatNumber(modifiedActiveDataSum)}</h1>
                        </div>
                        : <div id="heading-active">
                            <div id="incidentRate-heading"><h4>Global Incident Rate</h4> <h5>(per100,000 people)</h5></div>
                            <h1 className={"incidentRate-num num"}>{formatNumber(modifiedIncidentRateDataAvarage)}</h1>
                        </div>
                }
                <div id="admin2-heading"><span>Cases by</span><span>Province/State/Dependency</span></div>
                <div id="ul">
                    {
                        activeIncidentRateCard === "active"
                            ? modifiedActiveData.map((data, i) =>
                                <div className={"li-provinces"} key={i}><span className={"active-num"}>{formatNumber(data[0])} <span className={"suffix"}>cases</span></span><span className={"suffix"}>{data[1]}</span></div>
                            )
                            : modifiedIncidentRateData.map((data, i) =>
                                <div className={"li-provinces"} key={i}><span className={"incidentRate-num"}>{formatNumber(Math.floor(data[0]))}<span className={"suffix"}></span></span><span className={"suffix"}>{data[1]}</span></div>
                            )
                    }
                </div>
            </div>
            {
                !activeCardExpand
                    ? <div className={"card-toggler"}>
                        <span className={"admin-icon"} onClick={() => { toggleActiveIncidentRateCard() }}>{arrowLeft}</span>
                        {
                            activeIncidentRateCard === "active"
                                ? <span className={"card-toggler-name"}>Global Active Cases</span>
                                : activeIncidentRateCard === "incidentRate"
                                    ? <span className={"card-toggler-name"}>Global Incident Rate</span>
                                    : null
                        }
                        <span className={"admin-icon"} onClick={() => { toggleActiveIncidentRateCard() }}>{arrowRight}</span>
                    </div>
                    : <div id="card-toggler" style={activeCardExpand ? { bottom: "-13px", left: "15px" } : {}}>
                        <div className={"toggler"} style={admin0Style} onClick={() => { setActiveIncidentRateCard("active") }}>Global Active Cases</div>
                        <div className={"toggler"} style={admin2Style} onClick={() => { setActiveIncidentRateCard("incidentRate") }} >Gloabl Incident Rate</div>
                    </div>
            }
        </div>
    )
}
export default ActiveIncidentRateCard;