import React, { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getLastWorkingDay, dateDiff, daysToMonths, sortByKey } from "utils";
import { currencyFetch } from "data/fetch/currency.fetch";

export const CountryContext = createContext({});

const CountryProvider = ({ data, children }) => {
  const [countryData, setCountryData] = useState(data);
  const [calculator, setCalculator] = useState({
    income: "", // przychód brutto
    paidTax: "", // zapłacony podatek zagranicą
    holidayIncome: "", // przychód wakacyjny (tylko w Niemczech)
    startDate: "", // data rozpoczęcia pracy
    endDate: "", // data zakończenia pracy
    paymentDate: "", // data wypłaty
    incomes: [
      // tablica do trzymania listy wyników kalkulatora
      // {
      //     id: 123123123,
      //     startDate: '2019-01-01',
      //     endDate: '2019-02-01',
      //     currencyTable: 'asdasdsad',
      //     currencyValue: 4.1252,
      //     currencyValueDate: '2019-02-01',
      //     daysInPoland: 2,
      //     holidayIncome: 120,
      //     incomeAbroad: 1600,
      //     incomePLN: 4012.12,
      //     paidTax: 100.12,
      //     paymentDate: '2019-01-31',
      //     taxPLN: 400.55,
      // },
      // {
      //     id: 123123112318,
      //     startDate: '2019-01-01',
      //     endDate: '2019-02-01',
      //     currencyTable: 'asdasdsad',
      //     currencyValue: 4.1252,
      //     currencyValueDate: '2019-02-01',
      //     daysInPoland: 2,
      //     holidayIncome: 120,
      //     incomeAbroad: 1600,
      //     incomePLN: 4012.12,
      //     paidTax: 100.12,
      //     paymentDate: '2019-01-31',
      //     taxPLN: 400.55,
      // },
      // {
      //     id: 12312311232118,
      //     startDate: '2019-01-01',
      //     endDate: '2019-02-01',
      //     currencyTable: 'asdasdsad',
      //     currencyValue: 4.1252,
      //     currencyValueDate: '2019-02-01',
      //     daysInPoland: 2,
      //     holidayIncome: 120,
      //     incomeAbroad: 1600,
      //     incomePLN: 30012.12,
      //     paidTax: 100.12,
      //     paymentDate: '2019-01-31',
      //     taxPLN: 400.55,
      // },
    ],
    currencyValue: 0, // średni kurs waluty z NBP
    currencyValueDate: "", // data średniego kursu waluty z NBP
    currencyTable: "", // tabela waluty
    dailyDiet: Number((countryData.diet * countryData.dietFactor).toFixed(2)), // dzienna dieta wyznaczona na podstawie tabeli diet zagranicznych
    workDays: 0, // ilość dni zagranicą
    workMonths: 0, // ilość miesięcy zagranicą
    daysInPoland: "", // ilość spędzonych w Polsce podczas pracy zagranicą
    taxValue: 0, // podatek PLN
    allIncomeValue: 0, // przychód PLN
    isDataFetching: false, // flaga gdy pobieranie danych o walucie
  });

  const setCalculatorValue = useCallback((key, value) => {
    setCalculator((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  }, []);

  const setCountryValue = useCallback((key, value) => {
    setCountryData((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  }, []);

  const clearAPIValues = useCallback(() => {
    setCalculatorValue("currencyValue", 0);
    setCalculatorValue("currencyValueDate", "");
    setCalculatorValue("currencyTable", "");
  }, [setCalculatorValue]);

  const showDataLoader = () => {
    setCalculatorValue("isDataFetching", true);
  };

  const hideDataLoader = () => {
    setCalculatorValue("isDataFetching", false);
  };

  const addNewIncome = (income = {}) => {
    setCalculatorValue(
      "incomes",
      sortByKey([...calculator.incomes, income], "startDate")
    );
    return;
  };

  const removeIncome = (incomeId) => {
    const state = [...calculator.incomes];
    const newIncomes = state.filter((income) => income.id !== incomeId);

    return setCalculatorValue("incomes", newIncomes);
  };

  // Calculate/recalculate calculator values dependent on start and end dates
  useEffect(
    () => {
      const {
        startDate,
        endDate,
        paymentDate,
        daysInPoland,
        workDays,
      } = calculator;

      if (startDate && (endDate || paymentDate)) {
        setCalculatorValue(
          "workDays",
          dateDiff(startDate, endDate, daysInPoland)
        );
        setCalculatorValue("workMonths", daysToMonths(workDays));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      setCalculatorValue,
      calculator.startDate,
      calculator.endDate,
      calculator.paymentDate,
      calculator.daysInPoland,
      calculator.workDays,
    ]
  );

  // Get currency API values if end date or payment date has changed
  useEffect(() => {
    const { endDate, paymentDate } = calculator;
    const { currency } = countryData;

    if (endDate || paymentDate) {
      const properDate = paymentDate || endDate; // if paymentDate is inserted it has priority over endDate

      clearAPIValues();
      showDataLoader();

      currencyFetch(getLastWorkingDay(properDate), currency)
        .then((data) => {
          const {
            effectiveDate: currencyValueDate,
            mid: currencyValueApi,
            no: currencyTable,
          } = data.rates[0];

          setCalculatorValue(
            "currencyValue",
            Number(currencyValueApi.toFixed(4))
          );
          setCalculatorValue("currencyValueDate", currencyValueDate);
          setCalculatorValue("currencyTable", currencyTable);
        })
        .catch((error) => {
          toast.error(
            "Wystąpił błąd przy pobieraniu danych waluty. Sprawdź czy masz połączenie z internetem lub czy podane daty są prawidłowe.",
            {
              position: "top-center",
              toastId: "currency-data-error-toast",
            }
          );
          console.error(error);
        })
        .finally(hideDataLoader);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    calculator.endDate,
    calculator.paymentDate,
    clearAPIValues,
    countryData.currency,
    setCalculatorValue,
  ]);

  // Calculate tax value [PLN]
  useEffect(() => {
    const { paidTax, currencyValue } = calculator;

    const taxValue = paidTax * currencyValue;
    const output = Math.max(Number(taxValue.toFixed(2)));

    return setCalculatorValue("taxValue", output);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculator.currencyValue, calculator.paidTax, setCalculatorValue]);

  // Calculate Income value [PLN]
  useEffect(() => {
    const {
      currencyValue,
      income,
      holidayIncome,
      workDays,
      dailyDiet,
      workMonths,
    } = calculator;
    const { monthlyIncomeCost } = countryData;

    const allIncome =
      (income + holidayIncome - workDays * dailyDiet) * currencyValue -
      workMonths * monthlyIncomeCost;

    const output = Math.max(Number(allIncome.toFixed(2)), 0);

    return setCalculatorValue("allIncomeValue", output);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    calculator.currencyValue,
    calculator.income,
    calculator.holidayIncome,
    calculator.workDays,
    calculator.dailyDiet,
    calculator.workMonths,
    countryData.monthlyIncomeCost,
    setCalculatorValue,
  ]);

  // change country data if selected year changed
  useEffect(() => {
    setCountryData(data);
  }, [data]);

  return (
    <CountryContext.Provider
      value={{
        countryData,
        setCountryValue,
        calculator,
        setCalculatorValue,
        addNewIncome,
        removeIncome,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export default CountryProvider;
