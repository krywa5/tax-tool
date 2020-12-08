import { Container, InputAdornment, TextField, Button } from '@material-ui/core';
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
    },
    submitButton: {
        borderRadius: '0',
        padding: '12px 22px',
        letterSpacing: '1px',
        fontSize: '1.5rem',
        boxShadow: 'unset',
        borderTop: '1px solid #000',
        borderBottom: '1px solid #000',

        "&:disabled": {
            cursor: 'not-allowed',
            pointerEvents: 'auto',
        },
    }
}))

const Country = ({ data, ...rest }) => {
    const classes = useStyles();
    const { setSelectedCountry, selectedCountry } = useContext(AppContext);
    // insert data from context to component's state. USE STATE DATA INSIDE COUNTRY COMPONENT!
    const [countryData, setCountryData] = useState(data); // dane o kraju z bazy danych
    const [isTipsActive, setIsTipsActive] = useState(false);
    // CALCULATION VALUES
    const [dailyDiet, setDailyDiet] = useState(Number((countryData.diet * countryData.dietFactor).toFixed(2))); // dzienna dieta wyznaczona na podstawie tabeli diet zagranicznych
    const [income, setIncome] = useState(0); // przychód brutto
    const [paidTax, setPaidTax] = useState(0); // zapłacony podatek zagranicą
    const [incomes, setIncomes] = useState([]); // tablica do trzymania listy wyników kalkulatora
    const [holidayIncome, setHolidayIncome] = useState(0); // przychód wakacyjny (tylko w Niemczech)
    const [paymentDate, setPaymentDate] = useState(''); // data wypłaty
    const [currencyValue, setCurrencyValue] = useState(0); // średni kurs waluty z NBP
    const [currencyValueDate, setCurrencyValueDate] = useState(''); // data średniego kursu waluty z NBP
    const [currencyTable, setCurrencyTable] = useState(''); // tabela waluty
    const [workDays, setWorkDays] = useState(0); // ilość dni zagranicą
    const [workMonths, setWorkMonths] = useState(0); // ilość miesięcy zagranicą
    const [startDate, setStartDate] = useState(''); // data rozpoczęcia pracy
    const [endDate, setEndDate] = useState(''); // data zakończenia pracy
    const [daysInPoland, setDaysInPoland] = useState(0); // ilość spędzonych w Polsce podczas pracy zagranicą

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

            clearAPIValues();

            currencyFetch(getLastWorkingDay(properDate), currency)
                .then((data) => {
                    const { effectiveDate: currencyValueDate, mid: currencyValueApi, no: currencyTable } = data.rates[0];

                    setCurrencyValueDate(currencyValueDate);
                    setCurrencyValue(Number(currencyValueApi.toFixed(4)));
                    setCurrencyTable(currencyTable);
                })
                .catch(error => {
                    toast.error('Wystąpił błąd przy pobieraniu danych waluty. Sprawdź czy masz połączenie z internetem lub czy podane daty są prawidłowe.', {
                        position: 'top-center',
                        toastId: 'currency-data-error-toast',
                    });
                    console.error(error);
                })
        }
    }, [countryData, endDate, paymentDate])

    // Calculate/recalculate values
    useEffect(() => {
        if (startDate && (endDate || paymentDate)) {
            setWorkDays(dateDiff(startDate, endDate, daysInPoland));
            setWorkMonths(daysToMonths(workDays));
        }
    },
        [countryData, startDate, endDate, paymentDate, daysInPoland, workDays]
    )

    const clearAPIValues = () => {
        setCurrencyValueDate('');
        setCurrencyValue(0);
        setCurrencyTable('');
    }

    const getAllIncomeValue = () => {
        // if there is no currency value return 0
        if (!currencyValue) return 0;

        // Germany: (income + holidayIncome - workDays*allowanceValue)*currencyValue - workMonths*monthlyIncomeCost
        const allIncome = (income + holidayIncome - workDays * dailyDiet) * currencyValue - workMonths * countryData.monthlyIncomeCost;

        const output = Number(allIncome.toFixed(2));
        return output;
    }

    const getTaxValue = () => {
        // if there is no currency value return 0
        if (!currencyValue) return 0;

        const taxValue = paidTax * currencyValue;

        const output = Number(taxValue.toFixed(2));
        return output;
    }

    const addToIncomeList = () => {
        if (!getAllIncomeValue()) {
            return;
        }

        const newIncome = {
            currencyTable,
            currencyValue,
            currencyValueDate,
            daysInPoland,
            endDate,
            holidayIncome,
            id: Date.now(),
            incomeAbroad: income,
            incomePLN: getAllIncomeValue(),
            paidTax,
            paymentDate: paymentDate ? paymentDate : endDate,
            startDate,
            taxPLN: getTaxValue(),
        }

        setIncomes(prevVal => [...prevVal, newIncome]);
        clearInputs();
    }

    const clearInputs = () => {
        setIncome(0);
        setPaidTax(0);
        setHolidayIncome(0);
        setDaysInPoland(0);
        clearAPIValues();
    }

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
                    countryData.inputs.manual.includes("holidayIncome") &&
                    <InputField>
                        <InputLabel
                            label='Przychód wakacyjny'
                            labelFor="holidayIncome"
                            sublabels={countryData.intl.holidayIncome}
                        />
                        <TextField
                            id="holidayIncome"
                            label="Przychód wakacyjny"
                            type="number"
                            variant="outlined"
                            value={holidayIncome}
                            onChange={e => setHolidayIncome(strToNum(e.target.value))}
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
                            sublabels={countryData.intl.paidTax}
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
                            sublabels={currencyValueDate ?
                                `${toPolishDateFormat(currencyValueDate)}, ${currencyTable}`
                                :
                                ""}
                        />
                        <TextField
                            id="currencyValue"
                            type="number"
                            variant="outlined"
                            label="Kurs waluty"
                            value={currencyValue.toFixed(4)}
                            onChange={e => setCurrencyValue(Number(Number((e.target.value)).toFixed(4)))}
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
                            value={dailyDiet.toFixed(2)}
                            onChange={e => setDailyDiet(Number(Number(e.target.value).toFixed(2)))}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    step: 0.01,
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
                                    readOnly: true,
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
                            value={(workDays * dailyDiet).toFixed(2)}
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
                            sublabels={countryData.sublabels.taxValue}
                        />
                        <TextField
                            id="taxValue"
                            type="number"
                            variant="outlined"
                            label="Wartość podatku"
                            InputLabelProps={{ shrink: true }}
                            value={getTaxValue().toFixed(2)}
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
                            sublabels={countryData.sublabels.allIncomeValue}
                        />
                        <TextField
                            id="allIncomeValue"
                            type="number"

                            variant="outlined"
                            label="Wartość przychodu"
                            value={getAllIncomeValue().toFixed(2)}
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
            <Button onClick={addToIncomeList} disabled={!Number(getAllIncomeValue())} fullWidth={true} color={"secondary"} variant="contained" size="large" className={classes.submitButton}>
                Dodaj do listy
            </Button>
        </Container>
    );
}

export default Country;