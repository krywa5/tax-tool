import React, { useContext, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Paper, makeStyles } from '@material-ui/core';

import ROUTES from 'routes';
import { auth, db } from 'data/service/firebase.service';
import { LogoutButton, Loader, Logo, CountrySelect } from 'components';
import { AppContext } from 'context/UserContext';
import { Netherlands, Belgium, France, Germany } from 'components/countries';

const useStyles = makeStyles(theme => ({
    wrapper: ({ selectedCountry }) => ({
        margin: `${theme.spacing(10)}px auto ${theme.spacing(10)}px`,
        maxWidth: selectedCountry ? '1024px' : '800px',
        padding: `${theme.spacing(3)}px ${theme.spacing(8)}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: `fadeSlideIn ${theme.transitions.duration.long}ms ${theme.transitions.easing.easeInOut} both`,
        transition: `max-width ${theme.transitions.duration.long}ms ${theme.transitions.easing.easeInOut}`,
    })
}))

const TaxTool = () => {
    const history = useHistory();
    const { setIsUserLogged, setCountriesData, selectedCountry } = useContext(AppContext);
    const classes = useStyles({ selectedCountry });


    const getCountriesData = useCallback(() => {
        const countriesDataRef = db.ref('countries');
        countriesDataRef.on('value', snapshot => {
            const data = snapshot.val();
            setCountriesData(data);
        })
    }, [setCountriesData])

    // TEMP
    const isUserLogged = true; // dodać potem z kontekstu
    // useEffect(() => {
    //     if (auth.currentUser) {
    //         // user is logged
    //         setIsUserLogged(true);
    //         getCountriesData();
    //     } else {
    //         // user is not logged
    //         history.push(ROUTES.loginPage);
    //         setIsUserLogged(false);
    //     }
    // }, [history, setIsUserLogged, getCountriesData]);

    useEffect(() => {
        getCountriesData()
    }, [getCountriesData])


    return (
        <>
            {isUserLogged ?
                (
                    <>
                        <LogoutButton />
                        <Paper className={classes.wrapper} elevation={15} component="main" >
                            <Logo />
                            <CountrySelect />

                            <Switch>
                                <Route path={ROUTES.netherlands}>
                                    <Netherlands />
                                </Route>
                                <Route path={ROUTES.belgium}>
                                    <Belgium />
                                </Route>
                                <Route path={ROUTES.france}>
                                    <France />
                                </Route>
                                <Route path={ROUTES.germany}>
                                    <Germany />
                                </Route>
                            </Switch>
                        </Paper>
                    </>
                ) :
                <Loader isFullscreen color="white" />
            }
        </>
    );
}

export default TaxTool;