import React, { createContext, useEffect, useState } from "react";
import { db } from "data/service/firebase.service";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState();
  const [countriesData, setCountriesData] = useState([]);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear() - 1
  );
  const [availableYears, setAvailableYears] = useState([]);

  // Get data from DB and set available years
  useEffect(() => {
    const countriesDataRef = db.ref("countries");
    countriesDataRef.once("value", (snapshot) => {
      const response = Object.keys(snapshot.val()).map(Number);
      setAvailableYears(response);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        countriesData,
        setCountriesData,
        isUserLogged,
        setIsUserLogged,
        selectedYear,
        setSelectedYear,
        availableYears,
        setAvailableYears,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
