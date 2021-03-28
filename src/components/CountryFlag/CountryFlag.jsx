import React, { useContext } from "react";
import { makeStyles, Tooltip } from "@material-ui/core";
import { AppContext } from "context/UserContext";
import { useHistory } from "react-router-dom";
import ROUTES from "routes";

import belgiumFlag from "assets/images/flags/belgium.jpg";
import franceFlag from "assets/images/flags/france.jpg";
import germanyFlag from "assets/images/flags/germany.jpg";
import netherlandsFlag from "assets/images/flags/netherlands.jpg";
import norwayFlag from "assets/images/flags/norway.png";
import switzerlandFlag from "assets/images/flags/switzerland.png";
import noFlag from "assets/images/flags/no-flag.jpg";

const useStyles = makeStyles((theme) => ({
  listItem: {
    cursor: "pointer",
    boxShadow: theme.shadows[5],
    position: "relative",
    transition: `transform ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
    userSelect: "none",

    "&:last-child": {
      marginRight: "0",
    },

    "&::before": {
      content: "''",
      display: "block",
      position: "absolute",
      zIndex: "-1",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      opacity: "0",
      boxShadow: theme.shadows[15],
      transition: `opacity ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
    },

    "&:hover, &.selected": {
      transform: "translateY(-2px)",

      "&::before": {
        opacity: "1",
      },
    },
    "&.selected": {
      outline: `3px solid ${theme.palette.secondary.main}`,
    },
  },
  img: {
    objectFit: "cover",
    objectPosition: "center",
    width: "100%",
    aspectRatio: "16/9",
  },
}));

const CountryFlag = ({ country, countryLabel }) => {
  const classes = useStyles();
  const history = useHistory();
  const { selectedCountry, setSelectedCountry } = useContext(AppContext);

  const flagImg = (() => {
    switch (country) {
      case "belgium":
        return belgiumFlag;
      case "france":
        return franceFlag;
      case "germany":
        return germanyFlag;
      case "netherlands":
        return netherlandsFlag;
      case "norway":
        return norwayFlag;
      case "switzerland":
        return switzerlandFlag;
      default:
        return noFlag;
    }
  })();

  const clickHandler = () => {
    if (country === selectedCountry) {
      setSelectedCountry("");
      history.push(`${ROUTES.taxTool}`);
    } else {
      setSelectedCountry(country);
      history.push(`${ROUTES.taxTool}/${country}`);
    }
  };

  return (
    <Tooltip title={countryLabel} placement="bottom">
      <li
        className={`${classes.listItem} ${
          country === selectedCountry ? "selected" : ""
        }`.trim()}
        onClick={clickHandler}
      >
        <img src={flagImg} alt="country flag" className={classes.img} />
      </li>
    </Tooltip>
  );
};

export default CountryFlag;
