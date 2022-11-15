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

// Create a query for streamlining result from fetch
export const FETCH_ALL_COUNTRIES = gql`
  query Query {
    countries {
      name
      code
    }
  }
`;

// Creating an interface for countries function props
interface CountriesProps extends RouteComponentProps {}

const Countries: React.FC<CountriesProps> = () => {
  // Defining state to hold our fetched data for rendering
  const [filteredData, setFilteredData] = useState([]);

  // Defining state to hold user input in search-bar
  const [userInput, setUserInput] = useState("");

  //   // Fetching the countries data with "useQuery" and defined query in lines 14-21
  const { data, loading, error } = useQuery(FETCH_ALL_COUNTRIES);

  // A useEffect function to watch for changes in our data and userInput
  useEffect(() => {
    if (!data) {
      return;
    }

    //Setting the filteredData state with filtered data based off on user input
    setFilteredData(
      data?.countries?.filter(
        (country: any) =>
          country.code
            .toLocaleLowerCase()
            .indexOf(userInput.toLocaleLowerCase()) >= 0
      )
    );
  }, [data, userInput]);

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
    <div>
      <p>Data not found</p>
    </div>;
  }

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // const localStorageCountries: any = JSON.parse(localStorageData) || [];

  return (
    <Fragment>
      <SearchBar onSearch={setUserInput} />
      {filteredData?.length > 0 ? (
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th>Country Name</th>
                <th>Country Code</th>
              </tr>
            </thead>
            {filteredData.map((country: { name: string; code: string }) => (
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
        </div>
      ) : (
        <div className="notFoundContainer">
          <p className="notFound">
            No country found with the searched country code
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default Countries;
