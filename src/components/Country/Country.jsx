import React, { useEffect, useContext, useRef } from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import { AppContext } from 'context/UserContext';
import { FieldGroupDivider, TipsPanel, PrintButton } from 'components';
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
        "@media print": {
            padding: '0',
        }
    },
    incomeListTitle: {
        fontWeight: 700,
        marginBottom: '20px',
        "@media print": {
            marginBottom: '30px',
        }
    },
    countryName: {
        fontSize: theme.typography.h5.fontSize,
        fontFamily: theme.typography.h5.fontFamily,
        fontWeight: 700,
        lineHeight: theme.typography.h5.lineHeight,
    }
}))

const Country = () => {
    const classes = useStyles();
    const firstInput = useRef();

    const { setSelectedCountry } = useContext(AppContext);
    const { calculator, setCalculatorValue, addNewIncome, countryData } = useContext(CountryContext);
    const { currencyTable, currencyValue, currencyValueDate, daysInPoland, endDate, holidayIncome, income, incomes, paidTax, paymentDate, startDate, taxValue, allIncomeValue } = calculator;

    const isIncomesListShown = !!incomes.length;

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
        setCalculatorValue('income', '');
        setCalculatorValue('paidTax', '');
        setCalculatorValue('holidayIncome', '');
        setCalculatorValue('daysInPoland', '');

        firstInput.current.focus();
        window.scroll({ top: 300, left: 0, behavior: 'smooth' });
    }

    return (
        <Container component={'div'} className={classes.wrapper} disableGutters maxWidth={false}>
            <TipsPanel />
            <ManualFields className={`${classes.container} no-print`} firstInput={firstInput} />
            <FieldGroupDivider text="Wartości poniżej są obliczane automatycznie" />
            <AutoFields className={`${classes.container} no-print`} />
            <Button onClick={addToIncomeList} disabled={!allIncomeValue} fullWidth={true} color="secondary" variant="contained" size="large" className={`${classes.submitButton} no-print`}>
                Dodaj do listy
            </Button>
            {
                isIncomesListShown &&
                <>
                    <Container className={classes.incomeListWrapper} maxWidth={false}>
                        <Typography variant="h5" align="center" className={classes.incomeListTitle}>Lista przychodów<Typography className={`${classes.countryName} only-print`} fontSize="large" variant="body1">&nbsp;- {countryData.label}</Typography></Typography>
                        <IncomesTable />
                    </Container>
                    <PrintButton />
                </>
            }
        </Container>
    );
}

export default Country;