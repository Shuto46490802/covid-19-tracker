import React, { useState, useEffect } from "react";

import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchCountry, fetchProvinceData } from "../api";

const CountryPicker = (props) => {

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountry());
    }
    fetchAPI();

  }, [setCountries]);

  return (
    <div>
      <FormControl className="form">
        <NativeSelect onChange={(e) => { props.toggleCountry(e.target.value) }}>
          <option value="Global">Global</option>
          {
            countries.map((country, i) =>
              <option key={i} value={country}>{country}</option>
            )
          }
        </NativeSelect>
      </FormControl>
    </div>
  )
};

export default CountryPicker;