import axios from "axios";

const url = 'https://covid19.mathdro.id/api';

//for countries charts
export const fetchCountriesYearlyData = async (country) => {
    if (country === "select a country") {
        return "Loading..."
    }
    var changableUrl = (`https://corona-api.com/countries/${country}`)
    try {
        const { data: { data: { latest_data, timeline, name } } } = await axios.get(changableUrl);
        return { latest_data, timeline, name }
    } catch (error) {
    }
}

//fetch global datas
export const fetchGlobaldata = async () => {
    let url = "https://corona-api.com/timeline"
    try {
        const { data: { data } } = await axios.get(url);
        return data.map((data) => ({
            active: data.active,
            confirmed: data.confirmed,
            date: data.date,
            deaths: data.deaths,
            recovered: data.recovered,
            newConfirmed: data.new_confirmed,
            newDeaths: data.new_deaths,
            newRecovered: data.new_recovered,
            lastUpdate: data.updated_at
        }));
    } catch (error) {
    }
}

//for country picker
export const fetchCountry = async () => {
    let url = "https://corona-api.com/countries"
    try {
        const { data: { data } } = await axios.get(url);

        return data.map(({ name, code, latest_data }) => ({
            name: name,
            code: code,
            data: latest_data
        }))

    } catch (error) {

    }
};

//for country infected, deaths and recovered list 
export const fetchCountriesData = async () => {
    let url = "https://corona-api.com/countries"

    try {
        const { data: { data } } = await axios.get(url)
        return data.map((data) => ({
            country: data.name,
            latestData: data.latest_data,
            todayData: data.today
        }))

    } catch (error) {
    }
};

//for Map
export const fetchProvinceData = async () => {

    const promises = countries.map(async (country) => {
        try {
            const { data } = await axios.get(`${url}/countries/${country}/confirmed`);

            return data.map((data) => ({
                confirmed: data.confirmed,
                deaths: data.deaths,
                recovered: data.recovered,
                active: data.active,
                lat: data.lat,
                long: data.long,
                country: data.countryRegion,
                key: data.combinedKey,
                incidentRate: data.incidentRate
            }));
        } catch (error) {
        }
    });

    const getData = async () => {
        return await Promise.all(promises.map(async (promise) => {
            return promise
        }))
    }
    return await getData();
};

const countries =
    ["Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burma",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo (Brazzaville)",
        "Congo (Kinshasa)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czechia",
        "Denmark",
        "Diamond Princess",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Holy See",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "South Korea",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "MS Zaandam",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "US",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "West Bank and Gaza",
        "Yemen",
        "Zambia",
        "Zimbabwe"]
