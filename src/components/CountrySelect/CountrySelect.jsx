import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CountryFlags } from 'components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    countryNav: {
        marginBottom: '15px',
    }
})

const CountrySelect = () => {
    const classes = useStyles();

    return (
        <Grid
            component="nav"
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            wrap="nowrap"
            className={classes.countryNav}
        >
            <Typography variant="h5">Wybierz kraj:</Typography>
            <CountryFlags />
        </Grid>
    );
}

export default CountrySelect;