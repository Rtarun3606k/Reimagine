// src/AdminDashboard.js
import React, { useEffect, useState } from "react";
import ProductForm from "./Components/ProductForm";
import { FormProvider, useFormContext } from "./Context/FormContext";
import IPhoneCard from "../components/IPhoneCard";
import ProductCard from "../components/ProductCard";

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

const AdminDashboardWithProvider = () => {
  const [Data, setData] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/products/allProducts`
      );
      const data = await response.json();
      console.log(data);
      // data = data.reverse();
      setData(data.reverse());
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    // Add any side effects here
    fetchProducts();
  }, []);

  return (
    <>
      <FormProvider>
        <AdminDashboard />
      </FormProvider>
      {/* <IPhoneCard /> */}
      <ProductCard models={Data} />
    </>
  );
};

export default AdminDashboardWithProvider;
