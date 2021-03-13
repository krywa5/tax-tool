import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState();
  const [countriesData, setCountriesData] = useState([]);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear() - 1
  );

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
