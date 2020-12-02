import { Collapse, Container, TextField } from '@material-ui/core';
import { AppContext } from 'context/UserContext';
import React, { useState, useEffect, useContext } from 'react';
import { FieldGroupDivider, InputField, InputLabel } from 'components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    collapse: {
        width: "100%",

        "& .MuiFormControl-root": {
            minWidth: '230px',
        },
    },
    container: {
        paddingLeft: '50px',
        paddingRight: '50px',
    }
}))

const Country = ({ data, ...rest }) => {
    const { setSelectedCountry } = useContext(AppContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [countryData, setCountryData] = useState(data);

    const classes = useStyles();

    useEffect(() => {
        setSelectedCountry(countryData.id);
        setIsExpanded(true);
    },
        [countryData.id, setSelectedCountry]
    );

    return (
        <Collapse in={isExpanded} component={'article'} className={classes.collapse}>
            <Container className={classes.container}>
                {
                    countryData.inputs.manual.includes("income") &&
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
                }
                {
                    countryData.inputs.manual.includes("paidTax") &&
                    <InputField>
                        <InputLabel
                            label={`Podatek (${countryData.currency})`}
                            labelFor="paidTax"
                            sublabels={countryData.intl.tax}
                        />
                        <TextField
                            id="paidTax"
                            label="Podatek"
                            type="number"
                            variant="outlined"
                        />
                    </InputField>
                }
                {
                    countryData.inputs.manual.includes("startDate") &&
                    <InputField>
                        <InputLabel
                            label='Dzień rozpoczęcia pracy'
                            labelFor="startDate"
                        />
                        <TextField
                            id="startDate"
                            type="date"
                            variant="outlined"
                        />
                    </InputField>
                }
                {
                    countryData.inputs.manual.includes("endDate") &&
                    <InputField>
                        <InputLabel
                            label='Dzień zakończenia pracy'
                            labelFor="endDate"
                        />
                        <TextField
                            id="endDate"
                            type="date"
                            variant="outlined"
                        />
                    </InputField>
                }
                {
                    countryData.inputs.manual.includes("paymentDay") &&
                    <InputField>
                        <InputLabel
                            label='Dzień wypłaty'
                            labelFor="paymentDay"
                            sublabels={countryData.intl.paymentDay}
                        />
                        <TextField
                            id="paymentDay"
                            type="date"
                            variant="outlined"
                        />
                    </InputField>
                }
                {
                    countryData.inputs.manual.includes("daysInPoland") &&
                    <InputField>
                        <InputLabel
                            label='Dni spędzone w Polsce'
                            labelFor="daysInPoland"
                        />
                        <TextField
                            id="daysInPoland"
                            type="number"
                            variant="outlined"
                            label="Dni w Polsce"
                        />
                    </InputField>
                }
            </Container>
            <FieldGroupDivider text="Wartości poniżej są obliczane automatycznie" />
            <Container className={classes.container}>

            </Container>
        </Collapse>
    );
}

export default Country;