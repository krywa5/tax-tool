import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    marginBottom: "1.2rem",
  },
  acceptBtn: {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.common.white,
  },
  rejectBtn: {
    marginLeft: "1rem",
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
  },
}));

const DismissForm = ({
  text,
  rejectBtnText,
  acceptBtnText,
  rejectHandler,
  acceptHandler,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="body1" align="center" className={classes.text}>
        {text}
      </Typography>
      <div>
        <Button
          className={classes.acceptBtn}
          variant="contained"
          onClick={acceptHandler}
        >
          {acceptBtnText}
        </Button>
        <Button
          onClick={rejectHandler}
          variant="outlined"
          className={classes.rejectBtn}
        >
          {rejectBtnText}
        </Button>
      </div>
    </div>
  );
};

export default DismissForm;
