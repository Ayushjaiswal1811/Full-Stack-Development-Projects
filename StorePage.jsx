import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosClient";

export default function StorePage() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchStore = async () => {
    try {
      const res = await axios.get(`/stores/${id}`);
      setStore(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load store details.");
    }
  };

  const submitRating = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!rating) return setError("Please select a rating.");

    try {
      await axios.post(`/ratings/add`, {
        storeId: id,
        rating,
        comment,
      });

      setSuccess("Rating submitted successfully!");
      setComment("");
      setRating(0);
      fetchStore(); // refresh
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit rating");
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  if (!store) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Store Header */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600">{store.name}</h1>
        <p className="text-gray-700 mt-2">{store.description}</p>

        <p className="mt-3 font-semibold text-yellow-600">
          ⭐ Average Rating: {store.averageRating || "No ratings yet"}
        </p>
      </div>

      {/* Rating Form */}
      <div className="max-w-3xl mx-auto bg-white p-6 shadow mt-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add a Rating</h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</p>
        )}

        {success && (
          <p className="bg-green-100 text-green-600 p-2 rounded mb-4">
            {success}
          </p>
        )}

        <form onSubmit={submitRating} className="space-y-4">
          <div>
            <label className="font-medium">Rating (1–5)</label>
            <select
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="0">Select Rating</option>
              <option value="1">1 - Very Bad</option>
              <option value="2">2 - Bad</option>
              <option value="3">3 - Okay</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <textarea
            className="w-full border rounded-lg p-3"
            placeholder="Write your review..."
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Rating
          </button>
        </form>
      </div>

      {/* Comments */}
      <div className="max-w-3xl mx-auto bg-white p-6 shadow mt-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>

        {store.ratings?.length === 0 && (
          <p>No reviews yet. Be the first!</p>
        )}

        <div className="space-y-4">
          {store.ratings?.map((r) => (
            <div
              key={r.id}
              className="border rounded-xl p-4 bg-gray-50 shadow-sm"
            >
              <p className="text-yellow-600 font-semibold">⭐ {r.rating}</p>
              <p className="mt-1 text-gray-800">{r.comment}</p>
              <p className="text-sm text-gray-500 mt-2">
                — {r.user?.fullname || "Anonymous"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
