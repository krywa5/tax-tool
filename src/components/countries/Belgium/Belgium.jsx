import React, { useContext } from 'react';
import { AppContext } from 'context/UserContext';

const Belgium = () => {
    const { selectedCountry, setSelectedCountry } = useContext(AppContext);
    const isSelected = selectedCountry === 'belgium';

    setSelectedCountry('belgium');

    return (null);
}

export default Belgium;