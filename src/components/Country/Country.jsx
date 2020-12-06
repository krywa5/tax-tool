import { Container, InputAdornment, TextField } from '@material-ui/core';
import { AppContext } from 'context/UserContext';
import React, { useState, useEffect, useContext } from 'react';
import { FieldGroupDivider, InputField, InputLabel } from 'components';
import { makeStyles } from '@material-ui/styles';
import { strToNum, getLastWorkingDay, toPolishDateFormat, dateDiff, daysToMonths } from 'utils';
import { currencyFetch } from 'data/fetch/currency.fetch';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
    wrapper: {
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
    const classes = useStyles();
    const { setSelectedCountry, selectedCountry } = useContext(AppContext);
    // insert data from context to component's state. USE STATE DATA INSIDE COUNTRY COMPONENT!
    const [countryData, setCountryData] = useState(data);
    const [isTipsActive, setIsTipsActive] = useState(false);
    // CALCULATION VALUES
    const [allowanceValue, setAllowanceValue] = useState(countryData.diet);
    const [monthlyIncomeCost, setMonthlyIncomeCost] = useState(countryData.monthlyIncomeCost);
    const [dailyDiet, setDailyDiet] = useState(Number((countryData.diet * countryData.dietFactor).toFixed(2)));
    const [income, setIncome] = useState(0);
    const [paidTax, setPaidTax] = useState(0);
    const [incomes, setIncomes] = useState([]); // place to store incomes
    const [holidayIncome, setHolidayIncome] = useState(0);
    const [paymentDate, setPaymentDate] = useState('');
    const [currencyValue, setCurrencyValue] = useState(0);
    const [currencyValueDate, setCurrencyValueDate] = useState('');
    const [currencyValueDateAPI, setCurrencyValueDateAPI] = useState('');
    const [currencyTable, setCurrencyTable] = useState('');
    const [workDays, setWorkDays] = useState(0);
    const [workMonths, setWorkMonths] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [daysInPoland, setDaysInPoland] = useState(0);

    // get Country Data
    useEffect(() => {
        const { id } = countryData;
        setSelectedCountry(id);
    },
        [countryData, setSelectedCountry]
    );

    // Get currency data from API if endDate/paymentDate inserted
    useEffect(() => { // update currency data from API
        const { currency } = countryData;

        if (endDate || paymentDate) {
            const properDate = paymentDate || endDate; // if paymentDate is inserted it has priority over endDate

            currencyFetch(getLastWorkingDay(properDate), currency)
                .then((data) => {
                    const { effectiveDate: currencyValueDateAPI, mid: currencyValueApi, no: currencyTable } = data.rates[0];

                    setCurrencyValueDateAPI(currencyValueDateAPI);
                    setCurrencyValue(currencyValueApi);
                    setCurrencyTable(currencyTable);
                })
                .catch(error => {
                    toast.error('Wystąpił błąd przy pobieraniu danych waluty. Sprawdź czy masz połączenie z internetem lub czy podane daty są prawidłowe', {
                        position: 'top-center',
                    });
                    console.error(error);
                })
        }
    }, [countryData, endDate, paymentDate])

    // Calculate/recalculate values
    useEffect(() => {
        const { diet, dietFactor, monthlyIncomeCost } = countryData;
        if (startDate && (endDate || paymentDate)) {
            setWorkDays(dateDiff(startDate, endDate, daysInPoland));
            setWorkMonths(daysToMonths(workDays));
        }
    },
        [countryData, startDate, endDate, paymentDate, daysInPoland, workDays]
    )



    return (
        <Container component={'div'} className={classes.wrapper} disableGutters >
            <Container className={classes.container}>
                {
                    countryData.inputs.manual.includes("income") &&
                    <InputField>
                        <InputLabel
                            label='Przychód brutto'
                            labelFor="income"
                            sublabels={countryData.intl.income}
                        />
                        <TextField
                            id="income"
                            label="Przychód"
                            type="number"
                            variant="outlined"
                            value={income}
                            autoFocus
                            onChange={e => setIncome(strToNum(e.target.value))}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{countryData.currency}</InputAdornment>,
                                inputProps: {
                                    step: 0.01,
                                    min: 0,
                                }
                            }}
                        />
                    </InputField>
                }
                {
                    countryData.inputs.manual?.includes("paidTax") &&
                    <InputField>
                        <InputLabel
                            label='Podatek'
                            labelFor="paidTax"
                            sublabels={countryData.intl.tax}
                        />
                        <TextField
                            id="paidTax"
                            label="Podatek"
                            type="number"
                            variant="outlined"
                            value={paidTax}
                            onChange={e => setPaidTax(strToNum(e.target.value))}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{countryData.currency}</InputAdornment>,
                                inputProps: {
                                    step: 0.01,
                                    min: 0,
                                }
                            }}
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
                            onBlur={e => setStartDate(e.target.value)}
                            InputProps={{
                                inputProps: {
                                    max: new Date().toISOString().slice(0, 10),
                                }
                            }}
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
                            onBlur={e => setEndDate(e.target.value)}
                            InputProps={{
                                inputProps: {
                                    max: new Date().toISOString().slice(0, 10),
                                }
                            }}
                        />
                    </InputField>
                }
                {
                    countryData.inputs.manual.includes("paymentDate") &&
                    <InputField>
                        <InputLabel
                            label='Dzień wypłaty'
                            labelFor="paymentDate"
                            sublabels={[countryData.intl.paymentDate, "Wypełnić jeśli inny niż ostatni dzień pracy"]}
                        />
                        <TextField
                            id="paymentDate"
                            type="date"
                            variant="outlined"
                            onBlur={e => setPaymentDate(e.target.value)}
                            InputProps={{
                                inputProps: {
                                    max: new Date().toISOString().slice(0, 10),
                                }
                            }}
                        />
                    </InputField>
                }
                {
                    countryData.inputs.manual.includes("daysInPoland") &&
                    <InputField>
                        <InputLabel
                            label='Ilość dni spędzonych w Polsce'
                            labelFor="daysInPoland"
                        />
                        <TextField
                            id="daysInPoland"
                            type="number"
                            variant="outlined"
                            label="Dni w Polsce"
                            value={daysInPoland}
                            onChange={e => setDaysInPoland(Number(e.target.value))}
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    max: 366,
                                }
                            }}
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
                            sublabels={currencyValueDateAPI ?
                                `${toPolishDateFormat(currencyValueDateAPI)}, ${currencyTable}`
                                :
                                ""}
                        />
                        <TextField
                            id="currencyValue"
                            type="number"
                            variant="outlined"
                            label="Kurs waluty"
                            value={currencyValue}
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
                            value={workMonths}
                            onChange={e => setWorkMonths(Number(e.target.value))}
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
                    countryData.inputs.auto.includes("dailyDiet") &&
                    <InputField>
                        <InputLabel
                            label='Wysokość diety za dzień'
                            labelFor="dailyDiet"
                        />
                        <TextField
                            id="dailyDiet"
                            type="number"
                            variant="outlined"
                            label="Wysokość diety za dzień"
                            value={dailyDiet}
                            onChange={e => setDailyDiet(Number(Number(e.target.value).toFixed(2)))}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    step: 0.1,
                                },
                                endAdornment: <InputAdornment position="end">{countryData.currency}</InputAdornment>,
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
                            value={workDays}
                            onChange={e => setWorkDays(Number(e.target.value))}
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                inputProps: {
                                    readOnly: true,
                                },
                                endAdornment: <InputAdornment position="end">{countryData.currency}</InputAdornment>,
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
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    step: 0.01,
                                    readOnly: true,
                                },
                                endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
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
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    step: 0.01,
                                    readOnly: true,
                                },
                                endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
                            }}
                        />
                    </InputField>
                }
            </Container>
        </Container>
    );
}

export default Country;