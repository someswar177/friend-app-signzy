import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, UserCheck, LogOut } from "lucide-react"; // Added Logout Icon

const Navbar = ({ logout }) => {
  const location = useLocation(); // Get current route

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between transition-all duration-300">
      {/* Left Side - Logo & Navigation */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-indigo-600">FriendSpace</h1>
        <Link
          to="/"
          className={`flex items-center gap-2 font-semibold transition-all duration-200 ${location.pathname === "/" ? "text-blue-600" : "text-gray-700 hover:text-indigo-500"
            }`}
        >
          <Home size={20} /> Home
        </Link>
        <Link
          to="/friend-requests"
          className={`flex items-center gap-2 font-semibold transition-all duration-200 ${location.pathname === "/friend-requests" ? "text-blue-600" : "text-gray-700 hover:text-indigo-500"
            }`}
        >
          <UserCheck size={20} /> Friend Requests
        </Link>
      </div>

      {/* Right Side - Logout Button */}
      <button
        onClick={logout}
        className="px-4 py-2 text-md font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center gap-2 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <LogOut size={18} /> Logout
      </button>
    </nav>
  );
};

export default Navbar;
