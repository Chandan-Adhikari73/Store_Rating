import React, { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { BarChart3, Users, Star, Store } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching dashboard data");
    }
  }

  if (!stats)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading Dashboard...
      </div>
    );

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users className="w-10 h-10 text-blue-500" />,
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Total Stores",
      value: stats.totalStores,
      icon: <Store className="w-10 h-10 text-green-500" />,
      color: "from-green-100 to-green-50",
    },
    {
      title: "Total Ratings",
      value: stats.totalRatings,
      icon: <Star className="w-10 h-10 text-yellow-500" />,
      color: "from-yellow-100 to-yellow-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="text-blue-600" /> Admin Dashboard
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`rounded-2xl bg-gradient-to-br ${card.color} shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-4">
                {card.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {card.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-10">
          © {new Date().getFullYear()} Store Rating Admin Panel
        </div>
      </div>
    </div>
  );
}
