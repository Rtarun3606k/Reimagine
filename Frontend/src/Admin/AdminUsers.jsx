import React, { useEffect, useState } from "react";
import { get_access_token } from "../utils/Cookies";

const initialUsers = [
  {
    email: "john.doe@example.com",
    name: "John Doe",
    role: "Admin",
    country: "USA",
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    role: "User",
    country: "Canada",
  },
  {
    email: "sam.wilson@example.com",
    name: "Sam Wilson",
    role: "Moderator",
    country: "UK",
  },
  {
    email: "lisa.jones@example.com",
    name: "Lisa Jones",
    role: "User",
    country: "Australia",
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editIndex, setEditIndex] = useState(null);
  const [editUser, setEditUser] = useState({});

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditUser(users[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSave = async (index) => {
    const updatedUsers = [...users];
    updatedUsers[index] = editUser;
    setUsers(updatedUsers);
    setEditIndex(null);
    console.log("Updated user:", editUser);

    const token = get_access_token(); // Ensure this function correctly retrieves the token
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure the token is correctly formatted
      },
      body: JSON.stringify(editUser),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/user/user/${editUser._id}`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("User updated:", data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleDelete = async (user) => {
    console.log("Deleting user:", user);
    const token = get_access_token(); // Ensure this function correctly retrieves the token
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure the token is correctly formatted
      },
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/user/user/${user._id}`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setUsers(users.filter((u) => u.email !== user.email));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchUsers = async () => {
    const token = get_access_token(); // Ensure this function correctly retrieves the token
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure the token is correctly formatted
      },
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/user/user`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setUsers(data.user_data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg">
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
    </div>
  );
};

export default AdminUsers;
