import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axiosClient";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/register", form);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Create your Account
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-100 text-green-600 p-2 rounded mb-4 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.fullname}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
