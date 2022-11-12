import "./App.css";
import * as React from "react";
import { Fragment } from "react";
import { RouteComponentProps } from "@gatsbyjs/reach-router";
import { AiOutlineArrowUp } from "react-icons/ai";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import Loading from "./components/loading/Loading";
import SearchBar from "./components/searchBar/SearchBar";
import { useState } from "react";
import { useEffect } from "react";

export const FETCH_ALL_COUNTRIES = gql`
  query Query {
    countries {
      name
      code
    }
  }
`;

interface CountriesProps extends RouteComponentProps {}

const Countries: React.FC<CountriesProps> = () => {
  // eslint-disable-next-line
  const { data, loading, error, refetch } = useQuery(FETCH_ALL_COUNTRIES);

  const [dat, setDat] = useState([]);
  const [singleCountry, setSingleCountry] = useState("");

  useEffect(() => {
    if (!data) {
      return;
    }
    setDat(
      data.countries.filter(
        (country: any) =>
          country.code
            .toLocaleLowerCase()
            .indexOf(singleCountry.toLocaleLowerCase()) >= 0
      )
    );
  }, [data, singleCountry]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <> Error while fetching countries: {error} </>;
  }

  if (!data) {
    <div>Data not found</div>;
  }

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      <SearchBar onSearch={setSingleCountry} />
      <table className="styled-table">
        <thead>
          <tr>
            <th>Country Name</th>
            <th>Country Code</th>
          </tr>
        </thead>
        {dat.map((country: { name: string; code: string }) => (
          <tbody key={country.name}>
            <tr>
              <td>{country.name}</td>
              <td>{country.code}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <button className="backTop" onClick={scrollTop}>
        <AiOutlineArrowUp />
      </button>
    </Fragment>
  );
};

export default Countries;
