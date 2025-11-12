import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StoreList from "./pages/StoreList";
import StoreDetails from "./pages/StoreDetails";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/StoreOwnerDashboard";
import "./index.css"; 

function App() {
  const linkClasses =
    "px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white";
  const activeClass = "bg-blue-600 text-white";

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Navbar */}
        <nav className="flex flex-wrap justify-between items-center p-4 bg-white shadow-md">
          <div className="text-2xl font-semibold text-blue-600">
            Store Rating App
          </div>
          <div className="flex flex-wrap gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClass : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/stores"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClass : ""}`
              }
            >
              Stores
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClass : ""}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClass : ""}`
              }
            >
              Signup
            </NavLink>
          </div>
        </nav>

        {/* Page Content */}
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<StoreList />} />
            <Route path="/stores" element={<StoreList />} />
            <Route path="/stores/:id" element={<StoreDetails />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
