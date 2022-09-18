import "./Styles/dropDownStyle.css";
import "./Styles/styles.css";
import Context from "./Theme/Context";
import Layout from "./Theme/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useParams
} from "react-router-dom";

import { CountryElements } from "./components/CountryElements";
import React from "react";

import Dropdown from "react-dropdown";

const generateCountries = () => {
  return fetch(`https://restcountries.com/v3.1/all`).then((resp) =>
    resp.json()
  );
};
const filterRegion = (region) => {
  return fetch(`https://restcountries.com/v3.1/region/${region}`).then((resp) =>
    resp.json()
  );
};
const fetchCountryName = (name) => {
  return fetch(
    ` https://restcountries.com/v3.1/name/${name}?fullText=true`
  ).then((resp) => resp.json());
};
const searchCountryName = (name) => {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then((resp) =>
    resp.json()
  );
};

const HomePage = (props) => {
  const [countries, setCountries] = React.useState("");
  const [searchCountry, setSearchCountry] = React.useState("");
  const options = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const defaultOption = "Filter by Region";

  function debounce(func, timeout = 500) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  function searchFunction(e) {
    if (countries) {
      setSearchCountry(e.target.value.replace(/^\s+|\s+$/gm, ""));
    }
  }

  const search = debounce((e) => searchFunction(e));

  React.useEffect(() => {
    if (searchCountry === "") {
      generateCountries().then((resp) => {
        setCountries(resp);
      });
    } else {
      searchCountryName(searchCountry).then((resp) => {
        setCountries(resp);
      });
    }
  }, [searchCountry]);

  function filter(e) {
    filterRegion(e.value).then((resp) => setCountries(resp));
  }

  return (
    <div>
      <form onChange={search} className="flex ">
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
        </svg>
        <input
          style={{ border: "none" }}
          placeholder="Search for a country..."
          type="text"
        />
        <div target={"true"} className="dropDown">
          <Dropdown
            className="drop-down"
            onChange={filter}
            options={options}
            value={defaultOption}
          />
        </div>
      </form>
      <div className="container grid">
        {countries[0] ? (
          countries.map((country) => {
            return (
              <div key={country.name.common} className="country-container">
                <CountryElements
                  flag={country.flags.png}
                  name={country.name.common}
                  population={country.population}
                  capital={country.capital}
                  region={country.region}
                />
              </div>
            );
          })
        ) : (
          <div className="loading">Loading... </div>
        )}
      </div>
    </div>
  );
};

const Details = () => {
  const [country, setCountry] = React.useState("");
  const [countries, setCountries] = React.useState("");
  let { countryId } = useParams();

  React.useEffect(() => {
    fetchCountryName(countryId).then((resp) => setCountry(resp[0]));
    generateCountries().then((resp) => {
      setCountries(resp);
    });
  }, [countryId]);
  let borderName = null;

  if (country.borders && countries) {
    borderName = country.borders.map((item) =>
      countries.find((i) => i.cca3 === item)
    );
  }

  if (country)
    return (
      <div>
        <Link to="/">
          <button className="back-button">
            <div className="back-button-content">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                fill="white"
              >
                <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
              </svg>
              Back
            </div>
          </button>
        </Link>

        <div className="container details">
          <img src={country.flags.png} alt="flag" />

          <div className="info">
            <h1> {country.name.common} </h1>
            <br />
            <b> Native Name: </b>
            {Object.values(country.name.nativeName)[0].common}
            <br />
            <b> Population: </b> {country.population.toLocaleString()}
            <br />
            <b> Region: </b> {country.region}
            <br />
            <b> Sub Region: </b> {country.subregion}
            <br />
            <b> Capital: </b> {Object.values(country.capital).join(",")}
            <br />
          </div>

          <div className="info2 " style={{ paddingInline: "1rem" }}>
            <b> Top level Domain: </b> {country.tld}
            <br />
            <b> Currencies: </b> {Object.values(country.currencies)[0].name}
            <br />
            <div>
              <b> Languages: </b>
              {country.languages
                ? Object.values(country.languages).map((item) => {
                    return (
                      <h5
                        key={item}
                        style={{ fontWeight: "100" }}
                        className="languages"
                      >
                        {Object.values(country.languages)[
                          Object.values(country.languages).length - 1
                        ] !== item ? (
                          <span>{item},&nbsp; </span>
                        ) : (
                          item
                        )}
                      </h5>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        <div className=" border-elements  grid">
          <b> Border Countries: </b>
          {borderName ? (
            borderName.map((country) => {
              return (
                <Link
                  key={country.name.common}
                  to={`/countries/${country.name.common}`}
                >
                  <button key={country.name.common}>
                    {country.name.common}
                  </button>
                </Link>
              );
            })
          ) : (
            <h4>No borders... </h4>
          )}
        </div>
      </div>
    );
};

export default function App() {
  const queryClient = new QueryClient();

  const [theme, setTheme] = React.useState("light");
  const value = { theme, setTheme };
  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={value}>
        <Layout>
          <main>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/countries/:countryId" element={<Details />} />
              </Routes>
            </BrowserRouter>
          </main>
        </Layout>
      </Context.Provider>
    </QueryClientProvider>
  );
}
