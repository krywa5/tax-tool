import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { auth } from 'data/service/firebase.service';
import { useHistory } from 'react-router-dom';
import ROUTES from 'routes';
import { AppContext } from 'context/UserContext';

const useStyles = makeStyles(theme => ({
    button: {
        position: 'fixed',
        top: '75px',
        right: '75px',
        transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.short}ms`,

        '&:hover': {
            transform: 'translateY(-2px)',
        }
    }
}))

const LogoutButton = props => {
    const history = useHistory();
    const styles = useStyles();
    const { setIsUserLogged } = useContext(AppContext);

    const handleOnClick = () => {
        auth.signOut();
        history.push(ROUTES.loginPage);
        setIsUserLogged(false);
    }

    return (
        <Button
            className={styles.button}
            variant="contained"
            color="secondary"
            endIcon={<ExitToAppIcon />}
            size="large"
            onClick={handleOnClick}
        >
            Wyloguj
        </Button>
    );
}

export default LogoutButton;