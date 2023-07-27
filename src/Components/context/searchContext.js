import React, { useState, useMemo } from "react";

export const SearchContext = React.createContext();

export const CheckContext = React.createContext();

//Для передачи параметров из выбора сеансов в кинозал
export const ParamKinozal = React.createContext();

export const IsCheckedProvider = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const newVal = useMemo(() => ({ isChecked, setIsChecked }), [isChecked]);

  return (
    <CheckContext.Provider value={newVal}>
      {props.children}
    </CheckContext.Provider>
  );
};

export const SearchProvider = (props) => {
  const [searchText, setSearchText] = useState("");

  const newValue = {
    searchText,
    setSearchText,
  };
  return (
    <SearchContext.Provider value={newValue}>
      {props.children}
    </SearchContext.Provider>
  );
};

export const ParamKinozalProvider = (props) => {
  const [seansValue, setSeansValue] = useState({
    Dt: undefined,
    Seans: undefined,
    Title: undefined,
  });
  const seansObj = { seansValue, setSeansValue };
  return (
    <ParamKinozal.Provider value={seansObj}>
      {props.children}
    </ParamKinozal.Provider>
  );
};
