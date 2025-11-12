import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, RefreshCcw, Search } from "lucide-react";
// import API, { setAuthToken } from "../services/api"; // ⛔ comment out if API not ready

// const token = localStorage.getItem("token");
// if (token) setAuthToken(token);

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [qname, setQname] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  async function fetchStores() {
    try {
      setLoading(true);
      // const res = await API.get("/user/stores");
      // setStores(res.data);

      // ✅ Demo Data (no backend needed)
      const sampleStores = [
        {
          id: 1,
          name: "BlueSky Electronics",
          address: "MG Road, Dehradun, Uttarakhand",
          averageRating: 4.3,
          totalRatings: 128,
          myRating: 5,
        },
        {
          id: 2,
          name: "Cafe Aroma",
          address: "Mall Road, Nainital, Uttarakhand",
          averageRating: 4.8,
          totalRatings: 95,
          myRating: 4,
        },
        {
          id: 3,
          name: "SmartStyle Salon",
          address: "Rajpur Road, Dehradun",
          averageRating: 4.1,
          totalRatings: 63,
          myRating: 0,
        },
        {
          id: 4,
          name: "Mountain View Bakery",
          address: "Clock Tower, Mussoorie",
          averageRating: 4.6,
          totalRatings: 81,
          myRating: 3,
        },
      ];

      setStores(sampleStores);
    } catch (err) {
      console.error(err);
      alert("⚠️ Error loading stores");
    } finally {
      setLoading(false);
    }
  }

  const filteredStores = stores.filter((s) =>
    s.name.toLowerCase().includes(qname.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            🏪 Store Ratings
          </h2>
          <div className="flex space-x-2">
            <div className="flex items-center bg-white rounded-lg shadow px-3 py-2 w-full sm:w-72">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search store by name..."
                value={qname}
                onChange={(e) => setQname(e.target.value)}
                className="w-full outline-none text-gray-700"
              />
            </div>
            <button
              onClick={fetchStores}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center space-x-1 transition"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            Loading stores...
          </div>
        ) : filteredStores.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">No stores found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {s.name}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{s.address}</span>
                </div>

                <div className="flex items-center justify-between">
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
                  <span className="text-gray-600 text-sm font-medium">
                    Avg: {Number(s.averageRating).toFixed(2)}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mt-2">
                  Your Rating:{" "}
                  <span className="font-semibold text-blue-600">
                    {s.myRating || "-"}
                  </span>
                </p>

                <Link
                  to={`/stores/${s.id}`}
                  className="mt-4 inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
