import * as React from "react";
import { useState, useCallback, ChangeEvent } from "react";
import classes from "./searchBar.module.css";

interface Props {
  onSearch: (values: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [text, setText] = useState("");

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setText(value);
      onSearch(value);
    },
    [onSearch]
  );
  // const onSearchSubmit = useCallback(() => {
  //   onSubmit(text);
  // }, [text, onSubmit]);

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
      </div>
    </>
  );
};

export default SearchBar;
