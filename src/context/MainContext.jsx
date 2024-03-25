import React, { createContext, useContext, useState } from "react";

export const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {
  const [isShowNavbar, setIsShowNavbar] = useState(false);
  const handleShowNavbar = (isShow) => {
    setIsShowNavbar(isShow);
  };

  return (
    <MainContext.Provider value={{ isShowNavbar, handleShowNavbar }}>
      {children}
    </MainContext.Provider>
  );
};
export const useMainContext = () => useContext(MainContext);
