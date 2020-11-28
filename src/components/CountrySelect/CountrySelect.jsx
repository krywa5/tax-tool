import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CountryFlags } from 'components';

const CountrySelect = () => {
    return (
        <Grid
            component="nav"
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            wrap="nowrap"
        >
            <Typography variant="h5">Wybierz kraj:</Typography>
            <CountryFlags />
        </Grid>
    );
}

export default CountrySelect;