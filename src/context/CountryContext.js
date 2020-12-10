import React, { createContext, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getLastWorkingDay, dateDiff, daysToMonths } from 'utils';
import { currencyFetch } from 'data/fetch/currency.fetch';

export const CountryContext = createContext({});

const CountryProvider = ({ data, children }) => {
    const [countryData, setCountryData] = useState(data);
    const [calculator, setCalculator] = useState({
        income: 0, // przychód brutto
        paidTax: 0, // zapłacony podatek zagranicą
        holidayIncome: 0, // przychód wakacyjny (tylko w Niemczech)
        startDate: '', // data rozpoczęcia pracy
        endDate: '', // data zakończenia pracy
        paymentDate: '', // data wypłaty
        incomes: [], // tablica do trzymania listy wyników kalkulatora
        currencyValue: 0, // średni kurs waluty z NBP
        currencyValueDate: '', // data średniego kursu waluty z NBP
        currencyTable: '', // tabela waluty
        dailyDiet: Number((countryData.diet * countryData.dietFactor).toFixed(2)), // dzienna dieta wyznaczona na podstawie tabeli diet zagranicznych
        workDays: 0, // ilość dni zagranicą
        workMonths: 0, // ilość miesięcy zagranicą
        daysInPoland: 0, // ilość spędzonych w Polsce podczas pracy zagranicą
        taxValue: 0, // podatek PLN
        allIncomeValue: 0, // przychód PLN
    });

    const setCalculatorValue = useCallback((key, value) => {
        setCalculator(prevValue => ({
            ...prevValue,
            [key]: value,
        }))
    },
        []
    )

    const setCountryValue = useCallback((key, value) => {
        setCountryData(prevValue => ({
            ...prevValue,
            [key]: value,
        }))
    },
        []
    )

    const clearAPIValues = useCallback(() => {
        setCalculatorValue('currencyValue', 0);
        setCalculatorValue('currencyValueDate', '');
        setCalculatorValue('currencyTable', '');
    },
        [setCalculatorValue]
    )


    const addNewIncome = (income = {}) => {
        setCalculatorValue('incomes', [...calculator.incomes, income]);
        return;
    }


    // Calculate/recalculate calculator values dependent on start and end dates
    useEffect(() => {
        if (calculator.startDate && (calculator.endDate || calculator.paymentDate)) {
            setCalculatorValue('workDays', dateDiff(calculator.startDate, calculator.endDate, calculator.daysInPoland));
            setCalculatorValue('workMonths', daysToMonths(calculator.workDays));
        }
    },
        [setCalculatorValue, calculator.startDate, calculator.endDate, calculator.paymentDate, calculator.daysInPoland, calculator.workDays]
    )

    // Get currency API values if end date or payment date has changed 
    useEffect(() => {
        if (calculator.endDate || calculator.paymentDate) {
            const properDate = calculator.paymentDate || calculator.endDate; // if paymentDate is inserted it has priority over endDate

            clearAPIValues();

            currencyFetch(getLastWorkingDay(properDate), countryData.currency)
                .then((data) => {
                    const { effectiveDate: currencyValueDate, mid: currencyValueApi, no: currencyTable } = data.rates[0];

                    setCalculatorValue('currencyValue', Number(currencyValueApi.toFixed(4)));
                    setCalculatorValue('currencyValueDate', currencyValueDate);
                    setCalculatorValue('currencyTable', currencyTable);
                })
                .catch(error => {
                    toast.error('Wystąpił błąd przy pobieraniu danych waluty. Sprawdź czy masz połączenie z internetem lub czy podane daty są prawidłowe.', {
                        position: 'top-center',
                        toastId: 'currency-data-error-toast',
                    });
                    console.error(error);
                })
        }
    },
        [calculator.endDate, calculator.paymentDate, clearAPIValues, countryData.currency, setCalculatorValue]
    );


    // Calculate tax value [PLN]
    useEffect(() => {
        const { paidTax, currencyValue } = calculator;

        const taxValue = paidTax * currencyValue;
        const output = Math.max(Number(taxValue.toFixed(2)));

        return setCalculatorValue('taxValue', output);
    },
        [calculator.currencyValue, calculator.paidTax, setCalculatorValue]
    )


    // Calculate Income value [PLN]
    useEffect(() => {
        const { currencyValue, income, holidayIncome, workDays, dailyDiet, workMonths } = calculator;
        const { monthlyIncomeCost } = countryData;

        // Germany: (income + holidayIncome - workDays*allowanceValue)*currencyValue - workMonths*monthlyIncomeCost
        const allIncome = (income + holidayIncome - workDays * dailyDiet) * currencyValue - workMonths * monthlyIncomeCost;

        const output = Math.max(Number(allIncome.toFixed(2)), 0);

        return setCalculatorValue('allIncomeValue', output);
    },
        [calculator.currencyValue, calculator.income, calculator.holidayIncome, calculator.workDays, calculator.dailyDiet, calculator.workMonths, countryData.monthlyIncomeCost, setCalculatorValue, countryData.monthlyIncomeCost]
    )

    return (
        <CountryContext.Provider value={{
            countryData,
            setCountryValue,
            calculator,
            setCalculatorValue,
            addNewIncome,
        }}>
            {children}
        </CountryContext.Provider>
    );
}

export default CountryProvider;