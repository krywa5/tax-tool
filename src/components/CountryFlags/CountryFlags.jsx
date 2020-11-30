import React, { useContext } from 'react';
import { AppContext } from 'context/UserContext';
import { Grid } from '@material-ui/core';
import { CountryFlag, Loader } from 'components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    flagsWrapper: {
        width: 'fit-content',
        listStyle: 'none',
        padding: '0',
    }
})

const CountryFlags = () => {
    const { countriesData } = useContext(AppContext);
    const classes = useStyles();
    const isDataLoading = !countriesData.length;

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            wrap="nowrap"
            className={classes.flagsWrapper}
            component="ul"
        >
            {isDataLoading ?
                <Loader />
                :
                countriesData.map(country => <CountryFlag key={country.id} country={country.id} />)
            }
        </Grid>
    );
}

export default CountryFlags;