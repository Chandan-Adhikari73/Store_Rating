import React, { useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { UserPlus, Mail, Home, Lock, User } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const { data } = await API.post("/auth/signup", {
        name,
        email,
        address,
        password,
      });
      setMsg("✅ Signup successful! Please login.");
      setName("");
      setEmail("");
      setAddress("");
      setPassword("");
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Error during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <UserPlus className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-gray-500 text-sm mt-1">
            Join the Store Rating community today
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <User className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Full Name (2–60 chars)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full outline-none text-gray-700"
              minLength="3"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Address */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Home className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            {loading ? "Signing up..." : "Signup"}
          </motion.button>
        </form>

        {/* Message */}
        {msg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm font-medium text-gray-600"
          >
            {msg}
          </motion.div>
        )}

        <div className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Store Rating | Secure Signup
        </div>
      </motion.div>
    </div>
  );
}
