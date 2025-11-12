import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";

export default function StoreDetails() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [myRating, setMyRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStore();
  }, []);

  async function loadStore() {
    try {
      const res = await API.get("/user/stores/" + id);
      setStore(res.data.store);
      setMyRating(res.data.myRating || 0);
    } catch (err) {
      console.error(err);
      alert("Failed to load store details");
    } finally {
      setLoading(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      await API.post("/user/stores/" + id + "/rating", {
        rating: Number(myRating),
      });
      alert("✅ Rating saved successfully!");
      loadStore();
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting rating");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading Store Details...
      </div>
    );
  }

  if (!store) return <div className="p-6 text-center">No store found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full"
      >
        {/* Store Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{store.name}</h2>
          <p className="text-yellow-500 font-semibold mt-2 sm:mt-0">
            ⭐ {Number(store.averageRating).toFixed(2)} / 5 ({store.totalRatings} ratings)
          </p>
        </div>

        {/* Address */}
        <div className="flex items-center text-gray-600 mb-6">
          <MapPin className="w-5 h-5 mr-2 text-blue-500" />
          <span>{store.address}</span>
        </div>

        {/* Rating Form */}
        <form onSubmit={submit} className="space-y-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Your Rating:
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setMyRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                className={`w-8 h-8 cursor-pointer transition-transform duration-150 ${
                  (hover || myRating) >= star
                    ? "text-yellow-400 scale-110"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="mt-4 w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Submit Rating
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500 text-center">
          Thank you for sharing your feedback!
        </div>
      </motion.div>
    </div>
  );
}
