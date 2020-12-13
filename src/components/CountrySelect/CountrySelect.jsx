import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CountryFlags } from 'components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    countryNav: {
        margin: '20px 0 20px',
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
            className={`${classes.countryNav} no-print`}
        >
            <Typography className="no-print" variant="h6">Wybierz kraj:</Typography>
            <CountryFlags />
        </Grid>
    );
}

export default CountrySelect;