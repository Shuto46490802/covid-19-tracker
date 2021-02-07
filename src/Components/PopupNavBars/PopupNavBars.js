import React, { useState, useEffect, Fragment } from "react";

//scss
import "./PopupNavBars.scss"

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const navBars = < FontAwesomeIcon icon={faBars} />
const dropdown = < FontAwesomeIcon icon={faSortDown} />

const PopupNavBars = ({ isTablet, setIsTablet, isMobile, setIsMobile, setIsMap, setGlobalChartExpand, setGlobalDailyChartExpand, setInfectedCardExpand, setDeathsCardExpand, setActiveCardExpand, setMapExpand, setDataPanelExpand }) => {

    const [popup, setPopup] = useState(false);
    const [popupDataSource, setPopupDataSource] = useState(false);

    return (
        <div id="popup-nav-container">
            <div id="nav-icon" onClick={() => { setPopup(!popup) }}>
                {navBars}
            </div>
            {
                popup
                    ? <div id="popup-container">
                        <div className={"popup-item"}
                            onClick={() => {
                                setPopupDataSource(!popupDataSource)
                            }}>
                            <div>Data Source</div>
                            <div className={`dropdown-icon${popupDataSource ? "-up" : ""}`}>{dropdown}</div>
                        </div>
                        {
                            popupDataSource
                                ? <div id="dropdown-items">
                                    <div onClick={() => setPopup(!popup) } className={"dropdown-item"}>
                                        <a href="https://about-corona.net/documentation" target="_blank">ABOUT-CORONA.NET</a>
                                    </div>
                                    <div onClick={() => setPopup(!popup) } className={"dropdown-item"}>
                                        <a href="https://github.com/mathdroid/covid-19-api" target="_blank">Mathdroid Covid-19 REST API v1.0</a>
                                    </div>
                                </div>
                                : null
                        }
                        <div
                            className={"popup-item"}
                            onClick={() => {
                                setIsTablet(!isTablet)
                                setIsMap("")
                                setTimeout(() => setIsMap("cumulative"))
                                setPopup(!popup)
                                setGlobalChartExpand(false)
                                setGlobalDailyChartExpand(false)
                                setInfectedCardExpand(false)
                                setDeathsCardExpand(false)
                                setActiveCardExpand(false)
                                setMapExpand(false)
                                setDataPanelExpand(false)
                            }}
                        >
                            {
                                !isTablet
                                ? "Tablet Version"
                                : "Desktop Version"
                            }
                            
                         </div>
                        <div
                            className={"popup-item"}
                            onClick={() => {
                                setIsMobile(!isMobile)
                                setPopup(!popup)
                                setIsMap("")
                                setTimeout(() => setIsMap("cumulative"))
                                setGlobalChartExpand(false)
                                setGlobalDailyChartExpand(false)
                                setInfectedCardExpand(false)
                                setDeathsCardExpand(false)
                                setActiveCardExpand(false)
                                setMapExpand(false)
                                setDataPanelExpand(false)
                            }}
                        >
                            {
                                !isMobile
                                ? "Mobile Version"
                                : "Desktop Version"
                            }
                        </div>
                        <div
                            className={"popup-item"}
                            onClick={() => { setPopup(!popup) }}
                        >
                            <a href="https://github.com/Shuto46490802" target="_blank">About</a>
                        </div>
                    </div>
                    : null
            }
        </div >
    )
};

export default PopupNavBars;