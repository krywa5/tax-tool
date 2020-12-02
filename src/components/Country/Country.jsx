import { Collapse, Container, InputAdornment, TextField } from '@material-ui/core';
import { AppContext } from 'context/UserContext';
import React, { useState, useEffect, useContext } from 'react';
import { FieldGroupDivider, InputField, InputLabel } from 'components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    collapse: {
        width: "100%",

        "& .MuiFormControl-root": {
            minWidth: '260px',
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
                {
                    countryData.inputs.auto.includes("currencyValue") &&
                    <InputField>
                        <InputLabel
                            label='Kurs waluty'
                            labelFor="currencyValue"
                        />
                        <TextField
                            id="currencyValue"
                            type="number"
                            variant="outlined"
                            label="Kurs waluty"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    step: 0.0001,
                                }
                            }}
                        />
                    </InputField>
                }
                {
                    countryData.inputs.auto.includes("allowanceMonths") &&
                    <InputField>
                        <InputLabel
                            label='Ilość miesięcy zagranicą'
                            labelFor="allowanceMonths"
                        />
                        <TextField
                            id="allowanceMonths"
                            type="number"
                            variant="outlined"
                            label="Ilość miesięcy zagranicą"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    max: 12,
                                }
                            }}
                        />
                    </InputField>
                }
                {
                    countryData.inputs.auto.includes("dayAllowanceValue") &&
                    <InputField>
                        <InputLabel
                            label='Wysokość diety za dzień'
                            labelFor="dayAllowanceValue"
                        />
                        <TextField
                            id="dayAllowanceValue"
                            type="number"
                            variant="outlined"
                            label="Wysokość diety za dzień"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    step: 0.1,
                                },
                                startAdornment: <InputAdornment position="start">{countryData.currency}</InputAdornment>,
                            }}
                        />
                    </InputField>
                }
                {
                    countryData.inputs.auto.includes("workDays") &&
                    <InputField>
                        <InputLabel
                            label='Ilość dni zagranicą'
                            labelFor="workDays"
                        />
                        <TextField
                            id="workDays"
                            type="number"
                            variant="outlined"
                            label="Ilość dni zagranicą"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    max: 366,
                                }
                            }}
                        />
                    </InputField>
                }
                {
                    countryData.inputs.auto.includes("allAllowanceValue") &&
                    <InputField>
                        <InputLabel
                            label='Wartość diet'
                            labelFor="allAllowanceValue"
                        />
                        <TextField
                            id="allAllowanceValue"
                            type="number"
                            variant="outlined"
                            label="Wartość diet"
                            InputProps={{
                                inputProps: {
                                    readOnly: true,
                                },
                                startAdornment: <InputAdornment position="start">{countryData.currency}</InputAdornment>,
                            }}

                        />
                    </InputField>
                }
                {
                    countryData.inputs.auto.includes("taxValue") &&
                    <InputField>
                        <InputLabel
                            label='Wartość podatku'
                            labelFor="taxValue"
                        />
                        <TextField
                            id="taxValue"
                            type="number"
                            variant="outlined"
                            label="Wartość podatku"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    step: 0.01,
                                    readOnly: true,
                                },
                                startAdornment: <InputAdornment position="start">PLN</InputAdornment>,
                            }}
                        />
                    </InputField>
                }
                {
                    countryData.inputs.auto.includes("allIncomeValue") &&
                    <InputField>
                        <InputLabel
                            label='Wartość przychodu'
                            labelFor="allIncomeValue"
                        />
                        <TextField
                            id="allIncomeValue"
                            type="number"

                            variant="outlined"
                            label="Wartość przychodu"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    step: 0.01,
                                    readOnly: true,
                                },
                                startAdornment: <InputAdornment position="start">PLN</InputAdornment>,
                            }}
                        />
                    </InputField>
                }
            </Container>
        </Collapse>
    );
}

export default Country;