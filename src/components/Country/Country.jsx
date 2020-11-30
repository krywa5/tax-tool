import { Collapse, TextField } from '@material-ui/core';
import { AppContext } from 'context/UserContext';
import React, { useState, useEffect, useContext } from 'react';
import { InputField, InputLabel } from 'components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    collapse: {
        width: "100%",

        "& .MuiFormControl-root": {
            minWidth: '230px',
        },

    },
}))

const Country = ({ data, ...rest }) => {
    const { setSelectedCountry, selectedCountry } = useContext(AppContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [countryData, setCountryData] = useState(data);

    const classes = useStyles();
    // operation values


    useEffect(() => {
        setIsExpanded(true);
        setSelectedCountry(countryData.id);
    },
        [countryData.id, setSelectedCountry]
    );

    return (
        <Collapse in={isExpanded || selectedCountry} component={'article'} className={classes.collapse}>
            <InputField>
                <InputLabel
                    label={`Przychód brutto (${countryData.currency})`}
                    labelFor="income"
                    sublabels={countryData.intl.income}
                />
                <TextField
                    id="income"
                    label="Przychód"
                    type="number"
                    variant="outlined"
                />
            </InputField>
            <InputField>
                <InputLabel
                    label='Dzień rozpoczęcia pracy'
                    labelFor="startDay"
                />
                <TextField
                    id="startDay"
                    type="date"
                    variant="outlined"
                />
            </InputField>
            <InputField>
                <InputLabel
                    label='Dzień zakończenia pracy'
                    labelFor="endDay"
                />
                <TextField
                    id="endDay"
                    type="date"
                    variant="outlined"
                />
            </InputField>
            <InputField>
                <InputLabel
                    label='Dni spędzone w Polsce'
                    labelFor="daysInPoland"
                />
                <TextField
                    id="daysInPoland"
                    type="date"
                    variant="outlined"
                />
            </InputField>
        </Collapse>
    );
}

export default Country;