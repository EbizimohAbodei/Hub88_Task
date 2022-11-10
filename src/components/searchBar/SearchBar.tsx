import * as React from "react";
import { Fragment } from "react";
import { RouteComponentProps } from "@gatsbyjs/reach-router";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import classes from "./searchBar.module.css";

export const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      code
    }
  }
`;

interface CountriesProps extends RouteComponentProps {}

const SearchBar: React.FC<CountriesProps> = () => {
  const { data, loading, error, refetch } = useQuery(GET_COUNTRY, {
    variables: { code: "NG" },
  });

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>{error.message} </div>;
  }

  if (!data) {
    return <div>Not found</div>;
  }

  // const [countryCode, setcountryCode] = useState("undefined");

  const handleChange = () => {
    // this.setState({ countryCode: e.target.value });
    // return e.target.value;
  };

  const handleSubmit = () => {
    // evt.preventDefault();
    // console.log("evt", evt.target.value);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className={classes.searchForm}>
        <input
          type="text"
          name="countryCode"
          placeholder="search by country code"
          // value={this.state.value}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </Fragment>
  );
};

export default SearchBar;
