import React, { useState } from "react";
import API, { setAuthToken } from "../services/api";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const { data } = await API.post("/auth/login", { email, password });
      setAuthToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setMsg("✅ Login successful! Redirecting...");
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <LogIn className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to your Store Rating Dashboard
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

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

          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

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
          © {new Date().getFullYear()} Store Rating | Secure Login
        </div>
      </motion.div>
    </div>
  );
}
