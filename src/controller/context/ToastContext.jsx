import React, { useRef, useContext } from 'react';

export const ToastContext = React.createContext(null);

export const ToastProvider = ({ children }) => {
  const toast = useRef(null);

  const show = (options) => {
    toast.current?.show(options);
  };

  return (
    <ToastContext.Provider value={{ show, toastRef: toast }}>
      {children}
    </ToastContext.Provider>
  );
}; 

export const useToast = () => useContext(ToastContext);