import * as React from "react";
import { Fragment, useState, useCallback, ChangeEvent } from "react";
import classes from "./searchBar.module.css";

interface Props {
  onSubmit: (values: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }, []);
  const onSearchSubmit = useCallback(() => {
    onSubmit(text);
  }, [text, onSubmit]);

  return (
    <>
      <div className={classes.searchForm}>
        <input
          type="text"
          name="countryCode"
          placeholder="search by country code"
          onChange={onInputChange}
          value={text}
        />
        <button className={classes.searchForm} onClick={onSearchSubmit}>
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
