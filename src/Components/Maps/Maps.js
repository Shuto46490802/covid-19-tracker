import React, { useEffect, useState } from "react";

//components
import CamulativeMap from "./CamulativeMap/CamulativeMap";
import ActiveMap from "./ActiveMap/ActiveMap";

import { fetchProvinceData } from "../../api"

const Maps = (props) => {

    const [countries, setcountries] = useState();

    useEffect(() => {
        const fetchAPI = async () => {
            setcountries(await fetchProvinceData());
        }
        fetchAPI();
    }, [setcountries]);

    //check if data has been asinged to countries
    if (!countries) {
        return "Loading"
    };

    //data from country without province
    const noProvince = countries
        .filter((data) => data.length === 1)
        .map((data) => data[0])
        .filter((data) => data)
        .filter(({ lat, confirmed }) => lat !== null && confirmed > 50000);

    console.log(noProvince)

    //data from countries with provinces
    const provinces = countries
        .filter((data) => data.length > 1)
        .map((data) => data
            .filter(({ lat, confirmed, country }) => lat !== null && country !== "US" && confirmed > 10000));

    //data from US    
    const usProvinces = countries
        .filter((data) => data.length > 1)
        .map((data) => data
            .filter(({ lat, confirmed, country }) => lat !== null && country === "US" && confirmed > 50000));

    //format number with separator 
    const formatNumber = inputNumber => {
        let formetedNumber = (Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let splitArray = formetedNumber.split('.');
        if (splitArray.length > 1) {
            formetedNumber = splitArray[0];
        }
        return (formetedNumber);
    };

    return (
        <div>
            {
                props.isMap === "calmulative"
                    ? <CamulativeMap noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
                    : <ActiveMap noProvince={noProvince} provinces={provinces} usProvinces={usProvinces} formatNumber={formatNumber} />
            }
        </div>
    )
}



export default Maps;