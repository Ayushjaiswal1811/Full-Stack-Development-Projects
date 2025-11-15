import { useEffect, useState } from "react";
import axios from "../api/axiosClient";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to load users.");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/admin/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <table className="w-full border text-left rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4">Full Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-3 px-4">{user.fullname}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4 capitalize">{user.role}</td>

              <td className="py-3 px-4 space-x-3">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <p className="text-center text-gray-600 mt-4">
          No users found.
        </p>
      )}
    </div>
  );
}
