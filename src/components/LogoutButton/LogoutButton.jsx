import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { toast } from "react-toastify";

import { LogoutAlert } from "components";

const useStyles = makeStyles((theme) => ({
  button: {
    position: "fixed",
    top: "75px",
    right: "75px",
    transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.short}ms`,

    "&:hover": {
      transform: "translateY(-2px)",
    },
    "@media (max-width: 1730px)": {
      top: "20px",
      right: "50px",
    },
  },
  toast: {
    // [TODO]: move this outside the component
    backgroundColor: "white",
    padding: "40px 20px",
    borderRadius: `${theme.shape.borderRadius}px`,

    "& .Toastify__progress-bar": {
      backgroundColor: theme.palette.secondary.main,
    },
    "& .Toastify__close-button": {
      position: "absolute",
      top: "15px",
      right: "15px",
      color: theme.palette.error.main,
      opacity: "1",
    },
  },
}));

const LogoutButton = (props) => {
  const styles = useStyles();

  const handleOnClick = () => {
    toast.info(<LogoutAlert />, {
      className: styles.toast,
    });
  };

  return (
    <Button
      className={`${styles.button} no-print`}
      variant="contained"
      color="secondary"
      endIcon={<ExitToAppIcon />}
      size="large"
      onClick={handleOnClick}
    >
      Wyloguj
    </Button>
  );
};

export default LogoutButton;
