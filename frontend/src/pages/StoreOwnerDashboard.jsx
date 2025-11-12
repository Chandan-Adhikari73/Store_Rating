import React, { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { Store, Star, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function OwnerDashboard() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      const res = await API.get("/owner/stores");
      setStores(res.data);
    } catch (err) {
      console.error(err);
      alert("⚠️ Error loading your stores");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
            <Store className="w-8 h-8 text-blue-600" />
            <span>Owner Dashboard</span>
          </h2>
          <button
            onClick={load}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition flex items-center space-x-2"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
            Loading stores...
          </div>
        ) : stores.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            You don’t own any stores yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {s.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{s.address}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-5 h-5 ${
                          idx < Math.round(s.averageRating)
                            ? "fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    Avg: {Number(s.averageRating || 0).toFixed(2)}
                  </span>
                </div>

                <Link
                  to={`/owner/dashboard?store=${s.id}`}
                  className="w-full inline-block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex justify-center items-center space-x-2"
                >
                  <Eye className="w-5 h-5" />
                  <span>View Ratings</span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
