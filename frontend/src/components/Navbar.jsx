import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, UserCheck } from "lucide-react";

const Navbar = ({ logout }) => {
  const location = useLocation(); // Get current route

  return (
    <nav className="bg-white shadow-md p-3 flex items-center justify-between">
      {/* Left Side - Navigation */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className={`flex items-center gap-2 font-semibold ${
            location.pathname === "/" ? "text-blue-600" : "text-gray-700"
          }`}
        >
          <Home size={20} /> Home
        </Link>
        <Link
          to="/friend-requests"
          className={`flex items-center gap-2 font-semibold ${
            location.pathname === "/friend-requests" ? "text-blue-600" : "text-gray-700"
          }`}
        >
          <UserCheck size={20} /> Friend Requests
        </Link>
      </div>

      {/* Right Side - Logout Button */}
      <button
        onClick={logout}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
