// src/AdminDashboard.js
import React from "react";
import ProductForm from "./Components/ProductForm";
import { FormProvider, useFormContext } from "./Context/FormContext";

const AdminDashboard = () => {
  const { isFormOpen, handleOpenForm } = useFormContext();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Welcome to the Admin Dashboard
      </h2>
      <button
        onClick={handleOpenForm}
        className="bg-blue hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Product
      </button>
      {isFormOpen && <ProductForm />}
    </div>
  );
};

const AdminDashboardWithProvider = () => (
  <FormProvider>
    <AdminDashboard />
  </FormProvider>
);

export default AdminDashboardWithProvider;
