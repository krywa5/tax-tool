import React, { useContext } from 'react';
import { AppContext } from 'context/UserContext';

const Germany = () => {
    const { selectedCountry, setSelectedCountry } = useContext(AppContext);
    const isSelected = selectedCountry === 'germany';

    setSelectedCountry('germany');

    return (null);
}

export default Germany;