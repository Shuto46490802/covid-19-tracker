import React, { useState, useEffect, Fragment } from "react";

import "../App.scss"

import Tablet from "./Tablet"
import Mobile from "./Mobile"

const Desktop = () => {
    return (
        <div style={{position : "absolute", top : "50px"}}>
            <div className={`desktop`}><h1>Desktop</h1></div>
            <div className={`tablet-responsive`}><Tablet/></div>
            <div className={`mobile-responsive`}><Mobile/></div>
        </div>
    )
};

export default Desktop; 