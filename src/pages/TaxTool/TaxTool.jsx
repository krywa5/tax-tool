import React, { useContext, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Paper, makeStyles, Container } from '@material-ui/core';

import ROUTES from 'routes';
import { auth, db } from 'data/service/firebase.service';
import { LogoutButton, Loader, Logo, CountrySelect, Country } from 'components';
import { AppContext } from 'context/UserContext';
import CountryProvider from 'context/CountryContext';

const useStyles = makeStyles(theme => ({
    wrapper: ({ selectedCountry }) => ({
        margin: `${theme.spacing(10)}px auto ${theme.spacing(10)}px`,
        maxWidth: selectedCountry ? '1300px' : '800px',
        padding: `${theme.spacing(3)}px 0`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: `fadeSlideIn ${theme.transitions.duration.long}ms ${theme.transitions.easing.easeInOut} both`,
        transition: `max-width ${theme.transitions.duration.long}ms ${theme.transitions.easing.easeInOut}`,

        "@media print": {
            boxShadow: 'unset',
            margin: '0'
        }
    }),
    taxToolContainer: {
        "@media print": {
            maxWidth: 'unset',
        }
    }
}))

const TaxTool = () => {
    const history = useHistory();
    const { setIsUserLogged, setCountriesData, selectedCountry, countriesData } = useContext(AppContext);
    const classes = useStyles({ selectedCountry });

    //TODO: handle firebase database error
    const getCountriesData = useCallback(() => {
        const countriesDataRef = db.ref('countries');
        countriesDataRef.once('value', snapshot => {
            const data = snapshot.val();
            setCountriesData(data);
        });
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
        getCountriesData();
    }, [getCountriesData])


    return (
        <>
            {isUserLogged ?
                (
                    <Container disableGutters className={classes.taxToolContainer}>
                        <LogoutButton />
                        <Paper className={classes.wrapper} elevation={15} component="main" >
                            <Logo />
                            <CountrySelect />
                            <Switch>
                                {countriesData.map(country => (
                                    <Route path={`${ROUTES.taxTool}/${country.id}`} key={country.id} >
                                        <CountryProvider data={country} >
                                            <Country data={country} />
                                        </CountryProvider>
                                    </Route>
                                ))}
                            </Switch>
                        </Paper>
                    </Container>
                ) :
                <Loader isFullscreen color="white" />
            }
        </>
    );
}

export default TaxTool;