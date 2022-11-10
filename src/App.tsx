import "./App.css";
import * as React from "react";
import { Fragment } from "react";
import { RouteComponentProps } from "@gatsbyjs/reach-router";
import { AiOutlineArrowUp } from "react-icons/ai";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import Loading from "./components/loading/Loading";
import SearchBar from "./components/searchBar/SearchBar";

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
  const { data, loading, error, refetch } = useQuery(FETCH_ALL_COUNTRIES);

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
      <SearchBar />
      <table className="styled-table">
        <thead>
          <tr>
            <th>Country Name</th>
            <th>Country Code</th>
          </tr>
        </thead>
        {data.countries.map(
          (country: {
            name:
              | boolean
              | React.Key
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | null
              | undefined;
            code:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
          }) => (
            <tbody>
              <tr>
                <td>{country.name}</td>
                <td>{country.code}</td>
              </tr>
            </tbody>
          )
        )}
      </table>
      <button className="backTop" onClick={scrollTop}>
        <AiOutlineArrowUp />
      </button>
    </Fragment>
  );
};

export default Countries;
