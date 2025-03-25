import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Github, Twitter, Linkedin, MessageSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8800/api/user/login", {
        username,
        password,
      });
      login(data.token); // Save token in Auth Context
      navigate("/"); // Redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed! Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative px-10 py-3">
      {/* Left Section - Animated Gradient Background */}
      <div className="hidden md:flex md:w-3/6 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-500 p-12 flex-col justify-center items-center text-center relative 
        [clip-path:polygon(0_0,100%_0,75%_100%,0%_100%)] shadow-lg">
        <div className="text-white text-4xl font-bold animate-pulse">FriendSpace App</div>
        <p className="text-white mt-4 text-lg opacity-90">Connect with friends and expand your network.</p>
        <div className="flex gap-4 text-white mt-6">
          <Github className="w-8 h-8 cursor-pointer hover:text-gray-300 transition-all duration-200" />
          <Twitter className="w-8 h-8 cursor-pointer hover:text-gray-300 transition-all duration-200" />
          <Linkedin className="w-8 h-8 cursor-pointer hover:text-gray-300 transition-all duration-200" />
          <MessageSquare className="w-8 h-8 cursor-pointer hover:text-gray-300 transition-all duration-200" />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative bg-white 
        [clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)] shadow-md rounded-lg">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Sign In</h1>
          <p className="text-gray-600 mb-8">Welcome back! Sign in to continue.</p>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Improved Sign In Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-md font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 font-semibold hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
