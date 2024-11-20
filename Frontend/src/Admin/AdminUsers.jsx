import React, { useState, useEffect } from "react";
import { get_access_token } from "../utils/Cookies";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editUser, setEditUser] = useState({
    email: "",
    name: "",
    role: "",
    country: "",
  });

  useEffect(() => {
    // Fetch users data from your API or data source
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/userall", {
          headers: {
            Authorization: `Bearer ${get_access_token()}`,
          },
        });
        const data = await response.json();
        setUsers(data.user_data);
        if (Array.isArray(data)) {
          console.log("Users fetched:", users);
        } else {
          console.error("Fetched data is not an array:", data);
          console.log("Users fetched:", users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditUser(users[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async (index) => {
    const updatedUser = { ...editUser };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/user/user/${updatedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_access_token()}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const updatedUsers = [...users];
        updatedUsers[index] = data.user_data;
        setUsers(updatedUsers);
        setEditIndex(null);
      } else {
        console.error("Error updating user:", data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (user) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/user/${user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${get_access_token()}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const updatedUsers = users.filter((u) => u._id !== user._id);
        setUsers(updatedUsers);
      } else {
        console.error("Error deleting user:", data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700">Email</th>
            <th className="py-2 px-4 border-b border-gray-700">Name</th>
            <th className="py-2 px-4 border-b border-gray-700">Role</th>
            <th className="py-2 px-4 border-b border-gray-700">Country</th>
            <th className="py-2 px-4 border-b border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="py-2 px-4 border-b border-gray-700">
                {editIndex === index ? (
                  <input
                    type="text"
                    name="email"
                    value={editUser.email}
                    onChange={handleChange}
                    className="w-full p-1 rounded bg-gray-700 text-white"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="py-2 px-4 border-b border-gray-700">
                {editIndex === index ? (
                  <input
                    type="text"
                    name="name"
                    value={editUser.name}
                    onChange={handleChange}
                    className="w-full p-1 rounded bg-gray-700 text-white"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="py-2 px-4 border-b border-gray-700">
                {editIndex === index ? (
                  <input
                    type="text"
                    name="role"
                    value={editUser.role}
                    onChange={handleChange}
                    className="w-full p-1 rounded bg-gray-700 text-white"
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="py-2 px-4 border-b border-gray-700">
                {editIndex === index ? (
                  <input
                    type="text"
                    name="country"
                    value={editUser.country}
                    onChange={handleChange}
                    className="w-full p-1 rounded bg-gray-700 text-white"
                  />
                ) : (
                  user?.address?.country
                )}
              </td>
              <td className="py-2 px-4 border-b border-gray-700">
                {editIndex === index ? (
                  <button
                    onClick={() => handleSave(index)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Update
                  </button>
                )}
                <button
                  onClick={() => handleDelete(user)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
