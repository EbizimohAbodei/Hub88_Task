import React from "react";
import { render, screen } from "@testing-library/react";
import App, { FETCH_ALL_COUNTRIES } from "./App";
import { MockedProvider } from "@apollo/client/testing";
import { MockedResponse } from "@apollo/client/testing/core";
import userEvent from "@testing-library/user-event";

const countries = [
  {
    name: "Estonia",
    code: "EE",
  },
  {
    name: "Nigeria",
    code: "NG",
  },
  {
    name: "Finland",
    code: "FI",
  },
  {
    name: "Eritea",
    code: "ER",
  },
];
const mockFetchCountriesSuccess: MockedResponse = {
  request: {
    query: FETCH_ALL_COUNTRIES,
  },
  result: {
    data: {
      countries,
    },
  },
};

describe("Countries component test", () => {
  it("renders list of countries", async () => {
    render(
      <MockedProvider mocks={[mockFetchCountriesSuccess]} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(
      await screen.findByPlaceholderText("search by country code")
    ).toBeInTheDocument();
    for (const country of countries) {
      expect(await screen.findByText(country.name)).toBeInTheDocument();
      expect(await screen.findByText(country.code)).toBeInTheDocument();
    }
  });

  it("should filter for specific country", async () => {
    render(
      <MockedProvider mocks={[mockFetchCountriesSuccess]} addTypename={false}>
        <App />
      </MockedProvider>
    );
    const searchBar = await screen.findByPlaceholderText(
      "search by country code"
    );

    const countryCodeToSearch = "NG";
    userEvent.type(searchBar, countryCodeToSearch);

    expect(await screen.findByText(countryCodeToSearch)).toBeInTheDocument();

    countries
      .filter((country) => country.code !== countryCodeToSearch)
      .forEach((country) => {
        expect(screen.queryByText(country.name)).not.toBeInTheDocument();
        expect(screen.queryByText(country.code)).not.toBeInTheDocument();
      });
  });
});
