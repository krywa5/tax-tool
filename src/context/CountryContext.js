import React, { createContext, useState } from 'react';

export const CountryContext = createContext({});

const CountryProvider = ({ children }) => {
    const [countryData, setCountryData] = useState({});
    const [calculator, setCalculator] = useState({});

    const setCalculatorValue = (key, value) => {
        setCalculator({
            ...calculator,
            [key]: value,
        })
    }

    const setCountryValue = (key, value) => {
        setCountryData({
            ...countryData,
            [key]: value,
        })
    }

    const getTaxValue = () => {
        // if there is no currency value return 0
        const { currencyValue, paidTax } = calculator;
        if (!currencyValue) return 0;

        const taxValue = paidTax * currencyValue;

        const output = Number(taxValue.toFixed(2));
        return Math.max(output, 0);
    }

    const getAllIncomeValue = () => {
        const { currencyValue, income, holidayIncome, workDays, dailyDiet, workMonths } = calculator;
        // if there is no currency value return 0
        if (!currencyValue) return 0;

        // Germany: (income + holidayIncome - workDays*allowanceValue)*currencyValue - workMonths*monthlyIncomeCost
        const allIncome = (income + holidayIncome - workDays * dailyDiet) * currencyValue - workMonths * countryData.monthlyIncomeCost;

        const output = Number(allIncome.toFixed(2));
        return Math.max(output, 0);
    }

    return (
        <CountryContext.Provider value={{
            countryData,
            setCountryValue,
            calculator,
            setCalculatorValue,
            getTaxValue,
            getAllIncomeValue,
        }}>
            {children}
        </CountryContext.Provider>
    );
}

export default CountryProvider;