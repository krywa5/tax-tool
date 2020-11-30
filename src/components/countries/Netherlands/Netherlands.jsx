import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Typography } from '@material-ui/core';
import { AppContext } from 'context/UserContext';
import { makeStyles } from '@material-ui/styles';
import { InputField } from 'components';

const useStyles = makeStyles(theme => ({
    containerr: {
        display: 'flex',
    }
}))

const Netherlands = () => {
    const { selectedCountry, setSelectedCountry, countriesData } = useContext(AppContext);
    const isSelected = selectedCountry === 'netherlands';
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = useState(false);



    useEffect(() => {
        setIsExpanded(true);
    },
        []);

    return (
        <Collapse in={isExpanded} component={'article'}>
            {null}
        </Collapse >
    );
}

export default Netherlands;