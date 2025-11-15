import { useState } from "react";
import axios from "../api/axiosClient";

export default function AddUser() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullname || !email || !password) {
      return setError("All fields are required.");
    }

    try {
      await axios.post("/admin/add-user", {
        fullname,
        email,
        password,
        role,
      });

      setSuccess("User added successfully!");
      setFullname("");
      setEmail("");
      setPassword("");
      setRole("user");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add user.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New User</h2>

      {error && (
        <p className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</p>
      )}

      {success && (
        <p className="bg-green-100 text-green-600 p-2 rounded mb-4">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Fullname */}
        <div>
          <label className="block font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg mt-1"
            placeholder="Enter user's full name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg mt-1"
            placeholder="Enter user's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg mt-1"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium text-gray-700">Role</label>
          <select
            className="w-full px-4 py-2 border rounded-lg mt-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
