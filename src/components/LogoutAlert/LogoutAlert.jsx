import { Typography, Button } from "@material-ui/core";
import React, { useContext } from "react";

import { auth } from "data/service/firebase.service";
import ROUTES from "routes";
import { useHistory } from "react-router-dom";
import { AppContext } from "context/UserContext";
import { makeStyles } from "@material-ui/styles";
import { closeAuthSession } from "utils";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: "2em",
    color: theme.palette.primary.main,
  },
  button: {
    margin: "0 auto",
    display: "block",
  },
}));

const LogoutAlert = () => {
  const history = useHistory();
  const classes = useStyles();
  const { setIsUserLogged, setSelectedCountry } = useContext(AppContext);

  const clickHandler = () => {
    auth.signOut();
    closeAuthSession();
    history.push(ROUTES.loginPage);
    setIsUserLogged(false);
    setSelectedCountry("");
  };

  return (
    <>
      <Typography variant="body1" align="center" className={classes.heading}>
        Czy na pewno chcesz się wylogować?
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={clickHandler}
        className={classes.button}
      >
        Wyloguj
      </Button>
    </>
  );
};

export default LogoutAlert;
