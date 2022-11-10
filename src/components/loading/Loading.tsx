import React from "react";
import classes from "./loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.loader}>
        <div className={classes.circle}></div>
        <div className={classes.circle}></div>
        <div className={classes.circle}></div>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
