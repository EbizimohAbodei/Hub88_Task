import * as React from "react";
import { useState, useCallback, ChangeEvent } from "react";
import classes from "./searchBar.module.css";
import { RiSearchLine } from "react-icons/ri";

// Creating our interface for props passing
interface Props {
  onSearch: (values: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  // Creating a state to hold user input onChange
  const [text, setText] = useState("");

  // A callBack function that sets the text state, onSearch prop and watches for changes in the onSearch prop.
  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      //Destructuring the event target value
      const { value } = event.target;
      setText(value);
      onSearch(value);
    },
    [onSearch]
  );

  return (
    <>
      <div className={classes.container}>
        <div className={classes.searchForm}>
          <RiSearchLine className={classes.searchIcon} />
          <input
            type="text"
            name="countryCode"
            placeholder="search by country code"
            onChange={onInputChange}
            value={text}
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
