import React, { useContext } from "react";
import { AppContext } from "context/UserContext";
import { MenuItem, Select } from "@material-ui/core";
import Loader from "components/Loader";

const SelectYear = () => {
  const { selectedYear, setSelectedYear, availableYears } =
    useContext(AppContext);

  const changeHandler = (e) => {
    setSelectedYear(e.target.value);
  };

  const MenuItemsJSX = availableYears.map((year) => (
    <MenuItem value={year} key={year}>
      {year}
    </MenuItem>
  ));

  if (availableYears.length <= 1) return <Loader />;

  return (
    <Select value={selectedYear} onChange={changeHandler} variant="outlined">
      {MenuItemsJSX}
    </Select>
  );
};

export default SelectYear;
