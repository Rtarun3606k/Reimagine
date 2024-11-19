import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { get_access_token } from "../utils/Cookies";
import { useNavigate } from "react-router-dom";
import Caed from "../components/Caed";

const Profile = ({ user = {} }) => {
  const navigate = useNavigate();
  const [Data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    phoneCountryCode: "",
    phone: "",
    address: {
      address: "",
      city: "",
      country: "",
      zipCode: "",
    },
  });

  const fetchUserData = async () => {
    console.log("fetchUserData", get_access_token());
    console.log("fetchUserData");

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${get_access_token()}`,
      },
    };
    try {
      const response = await fetch(
        // `${import.meta.env.VITE_REACT_APP_URL}/user/user}`,
        `http://localhost:3000/user/user`,
        options
      );
      const data = await response.json();
      console.log(data);
      setData(data);
      setFormData({
        name: data?.user_data?.name || "",
        email: data?.user_data?.email || "",
        dateOfBirth: data?.user_data?.dateOfBirth || "",
        phoneCountryCode: data?.user_data?.phoneCountryCode || "",
        phone: data?.user_data?.phone || "",
        address: {
          address: data?.user_data?.address?.address || "",
          city: data?.user_data?.address?.city || "",
          country: data?.user_data?.address?.country || "",
          zipCode: data?.user_data?.address?.zipCode || "",
        },
      });
      console.log(Data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    // Save the updated data to the server
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${get_access_token()}`,
      },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(
        `http://localhost:3000/user/user/${Data.user_data._id}`,
        options
      );
      const data = await response.json();
      console.log(data);
      setData(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 w-[78%]">
      <div className="bg-gradient-to-r from-[#0f0f10] to-gray-900 shadow-2xl rounded-3xl p-8 text-white">
        <div className="flex items-center space-x-6">
          {/* <img
            src={user.profilePicture || "default-profile.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-lg"
          /> */}
          <div>
            <h1 className="text-4xl font-semibold">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-800 text-white p-2 rounded"
                />
              ) : (
                Data?.user_data?.name || "Login To access"
              )}
            </h1>
            <p className="text-gray-400 mt-3">
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-800 text-white p-2 rounded"
                />
              ) : (
                Data?.user_data?.email || " Login To access"
              )}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">
            Personal Information
          </h2>
          <p className="mt-4">
            <strong>Date of Birth:</strong>{" "}
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="bg-gray-800 text-white p-2 rounded"
              />
            ) : Data?.user_data?.dateOfBirth ? (
              new Date(Data.user_data.dateOfBirth).toLocaleDateString()
            ) : (
              "Add date of birth"
            )}
          </p>
          <p className="mt-4">
            <strong>Phone:</strong>{" "}
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="phoneCountryCode"
                  value={formData.phoneCountryCode}
                  onChange={handleChange}
                  className="bg-gray-800 text-white p-2 rounded w-[40px] mr-3"
                  placeholder="+91"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-800 text-white p-2 rounded"
                  placeholder="1234567890"
                />
              </>
            ) : (
              <>
                {Data?.user_data?.phoneCountryCode
                  ? `+${Data.user_data.phoneCountryCode} `
                  : ""}
                {Data?.user_data?.phone || "Add phone number"}
              </>
            )}
          </p>
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 mt-8">
            Address
          </h2>
          <p className="mt-4">
            <strong>Address:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="address.address"
                value={formData.address.address}
                onChange={handleChange}
                className="bg-gray-800 text-white p-2 rounded"
                placeholder="123, Street Name"
              />
            ) : (
              Data?.user_data?.address?.address || "Add address"
            )}
          </p>
          <p className="mt-4">
            <strong>City:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="bg-gray-800 text-white p-2 rounded"
                placeholder="City Name"
              />
            ) : (
              Data?.user_data?.address?.city || "Add city"
            )}
          </p>
          <p className="mt-4">
            <strong>Country:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className="bg-gray-800 text-white p-2 rounded"
                placeholder="Country Name"
              />
            ) : (
              Data?.user_data?.address?.country || "Add country"
            )}
          </p>
          <p className="mt-4">
            <strong>Zip Code:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
                className="bg-gray-800 text-white p-2 rounded"
                placeholder="123456"
              />
            ) : (
              Data?.user_data?.address?.zipCode || "Add zip code"
            )}
          </p>
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 mt-8">
            Orders
          </h2>
          <ul className="mt-4 list-disc list-inside">
            {Data?.user_data?.orders && Data.user_data.orders.length > 0 ? (
              Data.user_data.orders.map((order, index) => (
                <Caed id={order.product} />
              ))
            ) : (
              <p className="text-gray-400">No orders available</p>
            )}
          </ul>
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 mt-8">
            Cart
          </h2>
          <ul className="mt-4 list-disc list-inside">
            {Data?.user_data?.cart && Data.user_data.cart.length > 0 ? (
              Data.user_data.cart.map((order, index) => (
                <Caed id={order.product} />
              ))
            ) : (
              <p className="text-gray-400">No items available</p>
            )}
          </ul>
        </div>
        <div className="flex justify-end mt-8">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white hover:bg-green-700 transition-colors duration-300 rounded-lg"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300 rounded-lg"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    profilePicture: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    dateOfBirth: PropTypes.string,
    phoneCountryCode: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.shape({
      address: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      zipCode: PropTypes.string,
    }),
    orders: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Profile;
