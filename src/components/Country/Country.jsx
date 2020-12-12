import React, { useState, useEffect, useContext, useRef } from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import { AppContext } from 'context/UserContext';
import { FieldGroupDivider } from 'components';
import { makeStyles } from '@material-ui/styles';
import { AutoFields, IncomesTable, ManualFields } from './components';
import { CountryContext } from 'context/CountryContext';

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: "100%",
        paddingTop: '15px',

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

const Country = () => {
    const classes = useStyles();
    const firstInput = useRef();

    const { setSelectedCountry } = useContext(AppContext);
    const { calculator, setCalculatorValue, addNewIncome, countryData } = useContext(CountryContext);
    const { currencyTable, currencyValue, currencyValueDate, daysInPoland, endDate, holidayIncome, income, paidTax, paymentDate, startDate, taxValue, allIncomeValue, incomes } = calculator;

    const [isTipsActive, setIsTipsActive] = useState(false);


    // set selected country
    useEffect(() => {
        const { id } = countryData;
        setSelectedCountry(id); // UserContext
    },
        [countryData, setSelectedCountry]
    );

    const addToIncomeList = () => {

        if (!allIncomeValue) {
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
            incomePLN: allIncomeValue,
            paidTax,
            paymentDate: paymentDate ? paymentDate : endDate,
            startDate,
            taxPLN: taxValue,
        }

        addNewIncome(newIncome);
        clearInputs();
    }

    const clearInputs = () => {
        setCalculatorValue('income', 0);
        setCalculatorValue('paidTax', 0);
        setCalculatorValue('holidayIncome', 0);
        setCalculatorValue('workDays', 0);

        firstInput.current.focus();
    }

    return (

        <Container component={'div'} className={classes.wrapper} disableGutters maxWidth={false}>
            <ManualFields className={classes.container} firstInput={firstInput} />
            <FieldGroupDivider text="Wartości poniżej są obliczane automatycznie" />
            <AutoFields className={classes.container} />
            <Button onClick={addToIncomeList} disabled={!allIncomeValue} fullWidth={true} color="secondary" variant="contained" size="large" className={classes.submitButton}>
                Dodaj do listy
            </Button>
            <Container className={classes.incomeListWrapper} maxWidth={false}>
                <Typography variant="h5" align="center" className={classes.incomeListTitle}>Lista przychodów</Typography>
                <IncomesTable />
            </Container>
        </Container>

    );
}

export default Country;