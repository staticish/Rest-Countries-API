import { Link } from "react-router-dom";
import React from "react";

export function CountryElements(props) {
  const { name, capital, population, region, flag } = props;

  return (
    <Link to={`/countries/${name.replace(/\s/g, "%20")}`}>
      <div className=" card box-shadow">
        <div className="card-flag">
          <img className="flag" src={flag} alt="flag" />
        </div>
        <div className={""}>
          <div className="name">
            <h3> {name} </h3>
          </div>
          <div className="info ">
            <b> Population: </b> {population.toLocaleString()} <br />
            <b> Region: </b> {region}
            <br />
            <b> Capital: </b> {capital ? Object.values(capital)[0] : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
