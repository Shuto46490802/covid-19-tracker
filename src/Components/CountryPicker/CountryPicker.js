import React, { useState, useEffect, Fragment } from "react";

import { NativeSelect, FormControl, InputLabel } from "@material-ui/core";

import { fetchCountry } from "../../api";

import "./CountryPicker.scss";


const CountryPicker = ({ classes, toggleCountry, globalDailyChartExpand, isTablet, isMobile, country }) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountry());
        }
        fetchAPI();

    }, [setCountries]);

    const modifiedData = countries
        .map((data) => data)
        .filter(({ data }) => data.confirmed > 0)
        .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
        console.log(country)

    return (
        <Fragment>
            {/* Desktop */}
            <div className={`country-picker-container${globalDailyChartExpand ? "-expand" : isTablet || isMobile ? "-hide" : ""}`}>
                <FormControl id="form">
                    <InputLabel shrink id="label">Select a Country</InputLabel>
                    <NativeSelect id="select" onChange={(e) => { toggleCountry(e.target.value) }} className={classes.selectEmpty}>
                        <option value={"select a country"} className={"option"}>Global</option>
                        {
                            modifiedData.map((country, i) =>
                                <option key={i} value={country.code} className={"option"} > {country.name} </option>)
                        }
                    </NativeSelect>
                </FormControl>
            </div>

            {/* Tablet */}
            <div className={`country-picker-container${isTablet ? "-tablet-version" : isMobile ? "-hide" : "-tablet" }`}>
                <FormControl id="form">
                    <InputLabel shrink id="label">Select a Country</InputLabel>
                    <NativeSelect id="select" onChange={(e) => { toggleCountry(e.target.value) }} className={classes.selectEmpty}>
                        <option value={"select a country"} className={"option"}>Global</option>
                        {
                            modifiedData.map((country, i) =>
                                <option key={i} value={country.code} className={"option"} > {country.name} </option>)
                        }
                    </NativeSelect>
                </FormControl>
            </div>

            {/* Mobile */}
            <div className={`country-picker-container${isMobile ? "-mobile-version" : isTablet ? "-hide" : "-mobile" }`}>
                <FormControl id="form">
                    <InputLabel shrink id="label">Select a Country</InputLabel>
                    <NativeSelect id="select" onChange={(e) => { toggleCountry(e.target.value) }} className={classes.selectEmpty}>
                        <option className={"option"}>Select A Country</option>
                        {
                            modifiedData.map((country, i) =>
                                <option key={i} value={country.code} className={"option"} > {country.name} </option>)
                        }
                    </NativeSelect>
                </FormControl>
            </div>
        </Fragment>
    )
};

export default CountryPicker;