import React, { useContext } from 'react';
import { AppContext } from 'context/UserContext';

const France = () => {
    const { selectedCountry, setSelectedCountry } = useContext(AppContext);
    const isSelected = selectedCountry === 'france';

    setSelectedCountry('france');

    return (null);
}

export default France;