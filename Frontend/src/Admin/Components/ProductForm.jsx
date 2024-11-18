import React, { useState } from "react";
import { useFormContext } from "../Context/FormContext";

const ProductForm = () => {
  const { handleCloseForm } = useFormContext();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
    stock: "",
    colors: "",
    sizes: "",
    reviews: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    handleCloseForm();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-full">
        <h2 className="text-2xl font-semibold mb-4 text-white">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <label className="block text-white mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Images</label>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Colors</label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Sizes</label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <label className="block text-white mb-2">Reviews</label>
              <input
                type="text"
                name="reviews"
                value={formData.reviews}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseForm}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
