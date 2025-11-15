import { useState } from "react";
import axios from "../api/axiosClient";

export default function AddStore() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const submitStore = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      return setError("Store name is required.");
    }

    try {
      await axios.post("/stores/add", {
        name,
        description,
      });

      setSuccess("Store added successfully!");
      setName("");
      setDescription("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add store.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Store</h2>

      {error && (
        <p className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</p>
      )}

      {success && (
        <p className="bg-green-100 text-green-600 p-2 rounded mb-4">
          {success}
        </p>
      )}

      <form onSubmit={submitStore} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700">Store Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg mt-1"
            placeholder="Enter store name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg mt-1"
            placeholder="Enter store description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Store
        </button>
      </form>
    </div>
  );
}
