import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { CountryFlags, SelectYear } from "components";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  countryNav: {
    padding: "20px",
  },
  selectText: {
    whiteSpace: "nowrap",
  },
});

const CountrySelect = () => {
  const classes = useStyles();

  return (
    <Grid
      component="nav"
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      wrap="nowrap"
      className={`${classes.countryNav} no-print`}
    >
      <Typography className={`no-print ${classes.selectText}`} variant="h6">
        Wybierz kraj:
      </Typography>
      <CountryFlags />
      <SelectYear />
    </Grid>
  );
};

export default CountrySelect;
