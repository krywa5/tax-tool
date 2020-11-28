import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [selectedCountry, setSelectedCountry] = useState();
    const [countriesData, setCountriesData] = useState([]);
    const [isUserLogged, setIsUserLogged] = useState(false);

    return (
        <AppContext.Provider value={{
            selectedCountry,
            setSelectedCountry,
            countriesData,
            setCountriesData,
            isUserLogged,
            setIsUserLogged,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;