import React, { Fragment } from "react";

import "../css/InfoPanel.scss";

const InfoPanel = ({ globalData, countriesData, provincesData, formatNumber, classes, dataPanelExpand }) => {

    if (!globalData[0]) {
        return "Loading..."
    }

    const filteredCountries = countriesData.filter(({ latestData }) => latestData.confirmed > 0);
    const filteredProvinces = provincesData.flat().filter(({ confirmed }) => confirmed > 0);

    // get formatted time for lastUpdate
    const getFormattedDate = () => {
        let lastUpdate = String(new Date(globalData[0].lastUpdate));
        let month = String(lastUpdate.slice(4, 7));
        switch (month) {
            case "Jan":
                month = "1"
                break;
            case "Feb":
                month = "2";
                break;
            case "Mar":
                month = "3";
                break;
            case "Apr":
                month = "4";
                break;
            case "May":
                month = "5";
                break;
            case "Jun":
                month = "6";
                break;
            case "Jul":
                month = "7";
                break;
            case "Aug":
                month = "8";
                break;
            case "Sep":
                month = "9";
                break;
            case "Oct":
                month = "10";
                break;
            case "Nov":
                month = "11";
                break;
            case "Dec":
                month = "12";
                break;
            default:
                month = "";
        };

        let day = String(lastUpdate.slice(8, 10));

        let year = String(lastUpdate.slice(11, 15));

        let hour = lastUpdate.slice(16, 18);
        let ampm = ""
        if (hour > 12) {
            hour -= 12
            ampm = "PM"
        } else {
            ampm = "AM"
        }
        let minute = String(lastUpdate.slice(19, 21))
        return month + "/" + day + "/" + year + "," + hour + ":" + minute + " " + ampm
    };

    return (
        <Fragment>
            {
                !dataPanelExpand
                    ? <Fragment>
                        <table id="table-laptop">
                            <tr>
                                <td colspan="2">
                                    <span className={"infected-panel-header"}>Today's Global Cases</span>
                                    <h2 className={"infected-panel-number"}>
                                        {formatNumber(globalData[0].newConfirmed)}
                                    </h2>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <span className={"panel-header"}>Today's Global Deaths</span>
                                    <h3 className={"panel-number deaths-number"}>
                                        {formatNumber(globalData[0].newDeaths)}
                                    </h3>
                                </td>
                                <td>
                                    <span className={"panel-header"}>Today's Global Recovered</span>
                                    <h3 className={"panel-number recovered-number"}>
                                        {formatNumber(globalData[0].newRecovered)}
                                    </h3>
                                </td>
                            </tr>
                        </table>
                        <div id="country-panel">
                            <span className={"panel-header"}>Countries/Provinces</span>
                            <h3 className={"panel-number"}>
                                {filteredCountries.length}/{filteredProvinces.length}
                            </h3>
                        </div>
                        <div id="last-update-panel">
                            <span className={"panel-header"}>Last Updated at (M/D/YYYY)</span>
                            <h3 className={"panel-number"}>
                                {getFormattedDate(globalData[0].lastUpdate)}
                            </h3>
                        </div>
                    </Fragment>
                    : <Fragment>
                        <table id="table-expand">
                            <tr>
                                <td colspan="2">
                                    <span className={"infected-panel-header"}>Today's Global Cases</span>
                                    <h1 className={"infected-panel-number"}>
                                        {formatNumber(globalData[0].newConfirmed)}
                                    </h1>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <span className={"panel-header"}>Today's Global Deaths</span>
                                    <h2 className={"panel-number deaths-number"}>
                                        {formatNumber(globalData[0].newDeaths)}
                                    </h2>
                                </td>
                                <td>
                                    <span className={"panel-header"}>Today's Global Recovered</span>
                                    <h2 className={"panel-number recovered-number"}>
                                        {formatNumber(globalData[0].newRecovered)}
                                    </h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className={"panel-header"}>Countries/Provinces</span>
                                    <h2 className={"panel-number"}>
                                        {filteredCountries.length}/{filteredProvinces.length}
                                    </h2>
                                </td>
                                <td>
                                    <span className={"panel-header"}>Last Updated at (M/D/YYYY)</span>
                                    <h2 className={"panel-number"}>
                                        {getFormattedDate(globalData[0].lastUpdate)}
                                    </h2>
                                </td>
                            </tr>
                        </table>
                    </Fragment>
            }

            <table id="table-mobile">
                <tr>
                    <td colspan="2">
                        <span className={"infected-panel-header"}>Today's Global Cases</span>
                        <h1 className={"infected-panel-number"}>
                            {formatNumber(globalData[0].newConfirmed)}
                        </h1>
                    </td>

                </tr>
                <tr>
                    <td>
                        <span className={"panel-header"}>Today's Global Deaths</span>
                        <h2 className={"panel-number deaths-number"}>
                            {formatNumber(globalData[0].newDeaths)}
                        </h2>
                    </td>
                    <td>
                        <span className={"panel-header"}>Today's Global Recovered</span>
                        <h2 className={"panel-number recovered-number"}>
                            {formatNumber(globalData[0].newRecovered)}
                        </h2>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span className={"panel-header"}>Countries/Provinces</span>
                        <h2 className={"panel-number"}>
                            {filteredCountries.length}/{filteredProvinces.length}
                        </h2>
                    </td>
                    <td>
                        <span className={"panel-header"}>Last Updated at (M/D/YYYY)</span>
                        <h2 className={"panel-number"}>
                            {getFormattedDate(globalData[0].lastUpdate)}
                        </h2>
                    </td>
                </tr>
            </table>
        </Fragment>
    )
};

export default InfoPanel;