import React, { useState, useEffect, Fragment } from "react";

import { NativeSelect, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { fetchCountry } from "../api";

import "../css/CountryPicker.scss";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(.5),
        minWidth: 120,
    },
    selectEmpty: {
        //   marginTop: theme.spacing(2),
    }
}));

const CountryPicker = ({ classes, toggleCountry, globalDailyChartExpand }) => {

    const [countries, setCountries] = useState([]);
    const classStyle = useStyles();

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

    return (
        <Fragment>
            <div className={`country-picker-container${globalDailyChartExpand ? "-expand" : ""}`}>
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

            <div className={`country-picker-container-tablet`}>
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
        </Fragment>
    )
};

export default CountryPicker;