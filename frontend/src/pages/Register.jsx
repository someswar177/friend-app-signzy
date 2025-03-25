import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Github, Twitter, Linkedin, MessageSquare } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/user/signup", {
        username,
        password,
      });
      navigate("/"); // Redirect to login after successful registration
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed! Try again.");
    }
  };

  return (
    <div className="min-h-screen flex relative px-10 py-3">
      {/* Left Section */}
      <div className="hidden md:flex md:w-3/6 bg-blue-600 p-12 flex-col justify-center items-center text-center relative 
        [clip-path:polygon(0_0,100%_0,75%_100%,0%_100%)]">
        <div className="text-white text-4xl font-bold">FRIEND FINDER APP</div>
        <div className="flex gap-4 text-white mt-6">
          <Github className="w-8 h-8" />
          <Twitter className="w-8 h-8" />
          <Linkedin className="w-8 h-8" />
          <MessageSquare className="w-8 h-8" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-8 relative bg-white 
        [clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)]">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
          <p className="text-gray-600 mb-8">Create a new account</p>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl">
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 rounded-lg border bg-gray-50"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-lg border bg-gray-50"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <a href="/" className="text-blue-600">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
