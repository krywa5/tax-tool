import React, { useState, useEffect, useContext, useRef } from 'react';
import { Container, InputAdornment, TextField, Button, Typography } from '@material-ui/core';
import { AppContext } from 'context/UserContext';
import { FieldGroupDivider, InputField, InputLabel } from 'components';
import { makeStyles } from '@material-ui/styles';
import { strToNum, getLastWorkingDay, toPolishDateFormat, dateDiff, daysToMonths } from 'utils';
import { currencyFetch } from 'data/fetch/currency.fetch';
import { toast } from 'react-toastify';
import { IncomesTable, ManualFields } from './components';
import CountryProvider, { CountryContext } from 'context/CountryContext';

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
    },
    incomeListWrapper: {
        padding: '50px 20px',
    },
    incomeListTitle: {
        fontWeight: 700,
        marginBottom: '20px',
    },
}))

const Country = ({ data, ...rest }) => {
    const classes = useStyles();
    const firstInput = useRef();
    const { setSelectedCountry, selectedCountry } = useContext(AppContext);
    const { setCountryData: setContextData, getAllIncomeValue, getTaxValue } = useContext(CountryContext);
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
        setSelectedCountry(id); // UserContext
        setContextData(countryData); // CountryContext
    },
        [countryData, setSelectedCountry, setContextData]
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

        firstInput.current.focus();
    }

    return (
        <CountryProvider>
            <Container component={'div'} className={classes.wrapper} disableGutters maxWidth={false}>
                <ManualFields
                    className={classes.container}
                    firstInput={firstInput}
                />
                <FieldGroupDivider text="Wartości poniżej są obliczane automatycznie" />
                <ManualFields
                    className={classes.container}
                />
                <Button onClick={addToIncomeList} disabled={false} fullWidth={true} color={"secondary"} variant="contained" size="large" className={classes.submitButton}>
                    Dodaj do listy
            </Button>
                <Container className={classes.incomeListWrapper} maxWidth={false}>
                    <Typography variant="h5" align="center" className={classes.incomeListTitle}>Lista przychodów</Typography>
                    <IncomesTable incomeList={incomes} countryData={countryData} />
                </Container>
            </Container>
        </CountryProvider>

    );
}

export default Country;