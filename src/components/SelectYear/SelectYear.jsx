import React, { useContext } from "react";
import { AppContext } from "context/UserContext";
import { MenuItem, Select } from "@material-ui/core";

const SelectYear = () => {
  const { selectedYear, setSelectedYear, availableYears } = useContext(
    AppContext
  );

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
