import React, { useContext } from "react";
import { AppContext } from "context/UserContext";
import { Grid } from "@material-ui/core";
import { CountryFlag, Loader } from "components";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  flagsWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat( auto-fit, 80px )",
    maxWidth: "59%",
    padding: "0 30px",
    gap: "25px",
    listStyle: "none",
    justifyContent: "center",
  },
});

const CountryFlags = () => {
  const { countriesData } = useContext(AppContext);
  const classes = useStyles();
  const isDataLoading = !countriesData.length;

  return (
    <Grid
      container
      direction="row"
      className={classes.flagsWrapper}
      component="ul"
    >
      {isDataLoading ? (
        <Loader />
      ) : (
        countriesData.map((country) => (
          <CountryFlag
            key={country.id}
            country={country.id}
            countryLabel={country.label}
          />
        ))
      )}
    </Grid>
  );
};

export default CountryFlags;
