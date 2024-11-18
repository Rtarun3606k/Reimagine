// src/context/FormContext.js
import React, { createContext, useState, useContext } from "react";

// Create a context
const FormContext = createContext();

// Create a provider component
export const FormProvider = ({ children }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <FormContext.Provider
      value={{ isFormOpen, handleOpenForm, handleCloseForm }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Create a custom hook to use the FormContext
export const useFormContext = () => {
  return useContext(FormContext);
};
