import { useEffect, useState } from "react";
import axios from "../api/axiosClient";

export default function ManageStores() {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState("");

  const fetchStores = async () => {
    try {
      const res = await axios.get("/stores");
      setStores(res.data);
    } catch (err) {
      setError("Failed to load stores.");
    }
  };

  const deleteStore = async (id) => {
    if (!window.confirm("Are you sure you want to delete this store?")) return;

    try {
      await axios.delete(`/stores/${id}`);
      setStores(stores.filter((store) => store.id !== id));
    } catch (err) {
      alert("Failed to delete store");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Stores</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <table className="w-full border text-left rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4">Store Name</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Rating</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (
            <tr key={store.id} className="border-b">
              <td className="py-3 px-4">{store.name}</td>
              <td className="py-3 px-4">{store.description}</td>
              <td className="py-3 px-4">
                ⭐ {store.averageRating || "No rating"}
              </td>

              <td className="py-3 px-4 space-x-3">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Edit
                </button>

                <button
                  onClick={() => deleteStore(store.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {stores.length === 0 && (
        <p className="text-center text-gray-600 mt-4">
          No stores found. Add some!
        </p>
      )}
    </div>
  );
}
