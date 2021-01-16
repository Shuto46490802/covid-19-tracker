import React, { useState } from "react";

import "./InfectedCard.css";

const InfectedCard = ({ countriesData, globalData, provincesData, arrowLeft, arrowRight, infectedCardExpand, expandIcon, shrinkIcon, setInfectedCardExpand }) => {

    const [infectedCard, setInfectedCard] = useState("admin0");
    const [isHover, setIsHover] = useState(false);

    //check if countriesData, globalData are asigned
    if (!globalData[0]) {
        return "Loading ..."
    };
    if (!countriesData[0]) {
        return "Loading"
    };
    if(!provincesData[0]){
        return "Loading"
    }

    //modify provinces data
    const modifiedProvincesData = provincesData
        .filter((data) => data.length > 1)
        .map((data) => data
            .map(({ confirmed, key }) => [confirmed, key])
            .filter((data) => data[0] > 30000))
        .filter((data) => data.length > 0)
        .flat()
        .sort((a, b) => b[0] - a[0]);


    //modify latest datas and sort 
    const modifiedLatestData = countriesData
        .map(({ country, latestData, todayData }) => [country, latestData, todayData])
        .sort((a, b) => b[1].confirmed - a[1].confirmed);

    //modify today's data and sort
    const modifiedTodayData = countriesData
        .map(({ country, latestData, todayData }) => [country, latestData, todayData])
        .sort((a, b) => b[2].confirmed - a[2].confirmed);

    const formatNumber = inputNumber => {
        let formetedNumber = (Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let splitArray = formetedNumber.split('.');
        if (splitArray.length > 1) {
            formetedNumber = splitArray[0];
        }
        return (formetedNumber);
    };

    const toggleAdminInfectedRight = () => {
        if (infectedCard === "admin0") {
            setInfectedCard("admin2")
        } else if (infectedCard === "admin2") {
            setInfectedCard("today")
        } else if (infectedCard === "today") {
            setInfectedCard("admin0")
        }
    };
    const toggleAdminInfectedLeft = () => {
        if (infectedCard === "admin0") {
            setInfectedCard("today")
        } else if (infectedCard === "today") {
            setInfectedCard("admin2")
        } else if (infectedCard === "admin2") {
            setInfectedCard("admin0")
        }
    };

    //toggle map togglers border bottom
    let { admin0Style, admin2Style, todayStyle } = {};
    const onStyle = { borderBottom: "3px solid white", backgroundColor: "#240090" };
    admin0Style = infectedCard === "admin0" ?
        onStyle :
        {}
    admin2Style = infectedCard === "admin2" ?
        onStyle :
        {}
    todayStyle = infectedCard === "today" ?
        onStyle :
        {}

    return (
        <div>
            <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                id="list-infected-wrapper"
                style={infectedCardExpand ? { width: "98%", height: "730px", marginLeft: ".8em" } : { width: "260px", height: "440px" }}
            >
                <div className={"expand-shrink-icon-wrapper"}>
                    {
                        isHover
                            ? !infectedCardExpand
                                ? <div style={{ top: "-6px", right: "-5px" }} onClick={() => setInfectedCardExpand(!infectedCardExpand)} className={"expand-shrink-icon"}>{expandIcon}</div>
                                : <div style={{ top: "-6px", right: "-5px" }} onClick={() => setInfectedCardExpand(!infectedCardExpand)} className={"expand-shrink-icon"}>{shrinkIcon}</div>
                            : null
                    }
                </div>
                <div id="heading">
                    {
                        infectedCard === "admin0" || infectedCard === "admin2"
                            ? <h4>Global Cases</h4>
                            : <h4>Global Today's Cases</h4>
                    }
                    {
                        infectedCard === "admin0" || infectedCard === "admin2"
                            ? <h1 className={"infected-num num"}>{formatNumber(globalData[0].confirmed)}</h1>
                            : <h1 className={"infected-num num"}>{formatNumber(globalData[0].newConfirmed)}</h1>
                    }
                </div>
                {
                    infectedCard === "admin0"
                        ? <div id="admin0-heading">Cases by Country</div>
                        : infectedCard === "admin2"
                            ? <div id="admin2-heading"><span>Cases by</span><span>Province/State/Dependency</span></div>
                            : infectedCard === "today"
                                ? <div id="admin0-heading">Cases by Country</div>
                                : null
                }
                <div id="ul">
                    {
                        infectedCard === "admin0"
                            ? modifiedLatestData.map((data, i) =>
                                <div className={"li"} key={i}><span className={"infected-num"}>{formatNumber(data[1].confirmed)} </span><span>{data[0]}</span></div>
                            )
                            : infectedCard === "admin2"
                                ? modifiedProvincesData.map((data, i) =>
                                    <div className={"li-provinces"} key={i}><span className={"infected-num"}>{formatNumber(data[0])} <span className={"suffix"}>cases</span></span><span>{data[1]}</span></div>
                                )
                                : infectedCard === "today"
                                    ? modifiedTodayData.map((data, i) =>
                                        <div className={"li"} key={i}><span className={"infected-num"}>{formatNumber(data[2].confirmed)} </span><span>{data[0]}</span></div>
                                    )
                                    : null
                    }
                </div>
            </div>
            {
                !infectedCardExpand
                    ? <div className={"card-toggler"}>
                        <span className={"admin-icon"} onClick={() => { toggleAdminInfectedLeft() }}>{arrowLeft}</span>
                        {
                            infectedCard === "admin0"
                                ? <span className={"card-toggler-name"}>Admin0</span>
                                : infectedCard === "admin2"
                                    ? <span className={"card-toggler-name"}>Admin2</span>
                                    : infectedCard === "today"
                                        ? <span className={"card-toggler-name"}>Today's Infected Cases</span>
                                        : null
                        }
                        <span className={"admin-icon"} onClick={() => { toggleAdminInfectedRight() }}>{arrowRight}</span>
                    </div>
                    : <div id="card-toggler" style={infectedCardExpand ? { bottom: "-13px", left: "15px" } : {}}>
                        <div className={"toggler"} style={admin0Style} onClick={() => { setInfectedCard("admin0") }}>Admin0</div>
                        <div className={"toggler"} style={admin2Style} onClick={() => { setInfectedCard("admin2") }} >Admin2</div>
                        <div className={"toggler"} style={todayStyle} onClick={() => { setInfectedCard("today") }} >Today's Infected Cases</div>
                    </div>
            }
        </div>
    )
}

export default InfectedCard;