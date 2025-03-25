import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";

// Lazy load components
const SearchBar = lazy(() => import("../components/SearchBar"));
const FriendsList = lazy(() => import("../components/FriendsList"));
const UsersList = lazy(() => import("../components/UsersList"));
const RecommendedFriends = lazy(() => import("../components/RecommendedFriends"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
  </div>
);

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8800/api";
  const { token, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [sentRequests, setSentRequests] = useState([]);
  const [recommendedFriends, setRecommendedFriends] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/user/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(data.users);
        setFriends(data.friends);
        setSentRequests(data.outgoingRequests);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const recommendFriendsData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/user/friend/recommendations`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRecommendedFriends(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchDashboardData();
    recommendFriendsData();
  }, [token]);

  const handleSendRequest = async (userId) => {
    try {
      await axios.post(`${apiUrl}/user/${userId}/send-request`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSentRequests([...sentRequests, users.find((user) => user._id === userId)]);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      await axios.delete(`${apiUrl}/user/${friendId}/remove-friend`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend._id !== friendId)
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === friendId ? { ...user, isFriend: false } : user
        )
      );
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Navbar logout={logout} />

        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <SearchBar search={search} handleSearchChange={handleSearchChange} />
          </div>

          {/* Grid Layout for Users, Friends, and Recommendations */}
          <div className="flex flex-col gap-4">
            {/* Users Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-101 transition-transform duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm mr-2">
                  All Users
                </span>
              </h2>
              <Suspense fallback={<LoadingSpinner />}>
                <UsersList
                  users={filteredUsers}
                  friends={friends}
                  sentRequests={sentRequests}
                  handleSendRequest={handleSendRequest}
                  handleUnfriend={handleRemoveFriend}
                />
              </Suspense>
            </div>

            {/* Recommended Friends Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-101 transition-transform duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-1 rounded-full text-sm mr-2">
                  Suggested Friends
                </span>
              </h2>
              <Suspense fallback={<LoadingSpinner />}>
                <RecommendedFriends
                  recommendedFriends={recommendedFriends}
                  handleSendRequest={handleSendRequest}
                />
              </Suspense>
            </div>

            {/* Friends Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-101 transition-transform duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm mr-2">
                  Your Friends
                </span>
              </h2>
              <Suspense fallback={<LoadingSpinner />}>
                <FriendsList friends={friends} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Home;