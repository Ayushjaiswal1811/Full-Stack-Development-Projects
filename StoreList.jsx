import { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import { Link } from "react-router-dom";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStores = async () => {
    try {
      const res = await axios.get("/stores");
      setStores(res.data);
    } catch (err) {
      console.error("Failed to fetch stores:", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const filteredStores = stores.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Stores
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search stores..."
          className="px-4 py-2 w-full max-w-lg border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <div key={store.id} className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800">{store.name}</h2>

            <p className="text-gray-700 mt-1">{store.description}</p>

            {/* Rating */}
            <p className="mt-3 font-medium text-yellow-600">
              ⭐ {store.averageRating || "No ratings yet"}
            </p>

            <Link
              to={`/store/${store.id}`}
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
