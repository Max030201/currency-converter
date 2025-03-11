import React, { createContext, useContext, useState } from 'react';

const RepeatConversionContext = createContext();

export const RepeatConversionProvider = ({ children }) => {
  const [repeatData, setRepeatData] = useState(null);
  return (
    <RepeatConversionContext.Provider value={{ repeatData, setRepeatData }}>
      {children}
    </RepeatConversionContext.Provider>
  );
};

export const useRepeatConversion = () => useContext(RepeatConversionContext); 
 