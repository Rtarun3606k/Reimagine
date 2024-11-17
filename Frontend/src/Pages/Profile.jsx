import React from "react";
import PropTypes from "prop-types";
import "tailwindcss/tailwind.css"; // Make sure Tailwind CSS is properly set up in your project

const Profile = ({ user = {} }) => {
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
              {user.name || "John Doe"}
            </h1>
            <p className="text-gray-400">
              {user.email || "john.doe@example.com"}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">
            Personal Information
          </h2>
          <p className="mt-4">
            <strong>Date of Birth:</strong>{" "}
            {user.dateOfBirth
              ? new Date(user.dateOfBirth).toLocaleDateString()
              : "01/01/1990"}
          </p>
          <p className="mt-4">
            <strong>Phone:</strong>{" "}
            {user?.phoneCountryCode ? `+${user.phoneCountryCode || "1"} ` : ""}
            {user.phone || "123-456-7890"}
          </p>
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 mt-8">
            Address
          </h2>
          <p className="mt-4">
            <strong>Address:</strong> {user.address?.address || "123 Main St"}
          </p>
          <p className="mt-4">
            <strong>City:</strong> {user.address?.city || "Anytown"}
          </p>
          <p className="mt-4">
            <strong>Country:</strong> {user.address?.country || "USA"}
          </p>
          <p className="mt-4">
            <strong>Zip Code:</strong> {user.address?.zipCode || "12345"}
          </p>
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 mt-8">
            Orders
          </h2>
          <ul className="mt-4 list-disc list-inside">
            {user.orders && user.orders.length > 0 ? (
              user.orders.map((order, index) => (
                <li key={index} className="mt-2">
                  {JSON.stringify(order)}
                </li>
              ))
            ) : (
              <p className="text-gray-400">No orders available</p>
            )}
          </ul>
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
