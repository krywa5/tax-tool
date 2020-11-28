import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, makeStyles } from '@material-ui/core';

import ROUTES from 'routes';
import { auth, db } from 'data/service/firebase.service';
import { LogoutButton, Loader, Logo, CountrySelect } from 'components';
import { AppContext } from 'context/UserContext';

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: `${theme.spacing(10)}px auto ${theme.spacing(10)}px`,
        maxWidth: '1024px',
        transition: 'width .75s ease-in-out',
        padding: `${theme.spacing(3)}px ${theme.spacing(8)}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: `fadeSlideIn ${theme.transitions.duration.long}ms ${theme.transitions.easing.easeInOut} both`,
    }
}))

const TaxTool = () => {
    const history = useHistory();
    const { isUserLogged, setIsUserLogged, setCountriesData } = useContext(AppContext);
    const classes = useStyles();

    // TEMP
    // const isUserLogged = true; // dodać potem z kontekstu
    useEffect(() => {
        if (auth.currentUser) {
            // user is logged
            setIsUserLogged(true);
            getCountriesData();
        } else {
            // user is not logged
            history.push(ROUTES.loginPage);
            setIsUserLogged(false);
        }
    }, [history, setIsUserLogged]);

    useEffect(() => {
        getCountriesData();
    }, [])

    const getCountriesData = () => {
        const countriesDataRef = db.ref('countries');
        countriesDataRef.on('value', snapshot => {
            const data = snapshot.val();
            setCountriesData(data);
        })
    }


    return (
        <>
            {isUserLogged ?
                (
                    <>
                        <LogoutButton />
                        <Paper className={classes.wrapper} elevation={15} component="main" >
                            <Logo />
                            <React.Suspense fallback={<Loader />}>
                                <CountrySelect />
                            </React.Suspense>
                        </Paper>
                    </>
                ) :
                <Loader isFullscreen color="white" />
            }
        </>
    );
}

export default TaxTool;