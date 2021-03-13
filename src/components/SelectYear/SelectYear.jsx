import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "context/UserContext";
import { MenuItem, Select } from "@material-ui/core";
import { db } from "data/service/firebase.service";

const SelectYear = () => {
  const [availableYears, setAvailableYears] = useState([]);
  const { selectedYear, setSelectedYear } = useContext(AppContext);

  useEffect(() => {
    // Get data from DB and set available years
    const countriesDataRef = db.ref("countries");
    countriesDataRef.once("value", (snapshot) => {
      const response = Object.keys(snapshot.val()).map(Number);
      setAvailableYears(response);
    });
  }, []);

  const changeHandler = (e) => {
    setSelectedYear(e.target.value);
  };

  const MenuItemsJSX = availableYears.map((year) => (
    <MenuItem value={year} key={year}>
      {year}
    </MenuItem>
  ));

  return (
    <>
      {availableYears.length ? (
        <Select
          value={selectedYear}
          onChange={changeHandler}
          variant="outlined"
        >
          {MenuItemsJSX}
        </Select>
      ) : null}
    </>
  );
};

export default SelectYear;
