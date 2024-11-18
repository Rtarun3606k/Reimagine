import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-6">Admin Panel</h1>
        <nav className="mb-6">
          <Link
            to="/admin"
            className="text-blue-400 hover:text-blue-600 transition-colors duration-300 mr-4"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="text-blue-400 hover:text-blue-600 transition-colors duration-300 mr-4"
          >
            Users
          </Link>
          <Link
            to="/admin/settings"
            className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
          >
            Settings
          </Link>
        </nav>
        <hr className="border-gray-700 mb-6" />
        <div className="bg-gray-700 p-6 rounded-lg shadow-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
