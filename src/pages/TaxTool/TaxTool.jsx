import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Paper, makeStyles } from '@material-ui/core';

import ROUTES from 'routes';
import { auth } from 'data/service/firebase.service';
import { LogoutButton, Loader } from 'components';
import { AppContext } from 'context/UserContext';

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: `${theme.spacing(10)}px auto ${theme.spacing(10)}px`,
        width: 'fit-content',
        transition: 'width .75s ease-in-out',
        padding: `${theme.spacing(8)}px`,
    }
}))

const TaxTool = () => {
    const history = useHistory();
    const { isUserLogged, setIsUserLogged } = useContext(AppContext);
    const classes = useStyles();

    useEffect(() => {
        if (auth.currentUser) {
            // user is logged
            setIsUserLogged(true);
        } else {
            // user is not logged
            history.push(ROUTES.loginPage);
            setIsUserLogged(false);
        }
    }, [history, setIsUserLogged]);

    return (
        <>
            {isUserLogged ?
                (
                    <>
                        <LogoutButton />
                        <Paper className={classes.wrapper} elevation={15} component="main" >
                            <Typography variant="h1">To jest typo</Typography>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, recusandae!</p>
                            <Typography variant="body1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, voluptate.</Typography>
                        </Paper>

                    </>
                ) :
                <Loader isFullscreen color="white" />
            }
        </>
    );
}

export default TaxTool;