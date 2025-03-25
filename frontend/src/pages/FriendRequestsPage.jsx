import React, { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Bell, Send } from "lucide-react";
import Navbar from "../components/Navbar";

// Lazy load components
const FriendRequests = lazy(() => import("../components/FriendRequests"));
const SentRequests = lazy(() => import("../components/SentRequests"));

const FriendRequestsPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8800/api";
  const { token, logout } = useAuth();
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  // Fetch Friend Requests
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/user/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFriendRequests(data.incomingRequests);
        setSentRequests(data.outgoingRequests);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    fetchFriendRequests();
  }, [token]);

  // Accept Friend Request
  const handleAcceptRequest = async (userId) => {
    try {
      await axios.post(
        `${apiUrl}/user/${userId}/accept-request`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFriendRequests(friendRequests.filter((req) => req._id !== userId));
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  // Reject Friend Request
  const handleRejectRequest = async (userId) => {
    try {
      await axios.delete(`${apiUrl}/user/${userId}/reject-request`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriendRequests(friendRequests.filter((req) => req._id !== userId));
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navbar */}
      <Navbar logout={logout} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Incoming Requests Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Bell className="w-6 h-6 text-indigo-500 mr-2" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm">
                Incoming Requests
              </span>
              {friendRequests.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                  {friendRequests.length}
                </span>
              )}
            </h2>
            <Suspense fallback={<p>Loading...</p>}>
              <FriendRequests
                friendRequests={friendRequests}
                handleAcceptRequest={handleAcceptRequest}
                handleRejectRequest={handleRejectRequest}
              />
            </Suspense>
          </div>

          {/* Sent Requests Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Send className="w-6 h-6 text-green-500 mr-2" />
              <span className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-1 rounded-full text-sm">
                Sent Requests
              </span>
              {sentRequests.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                  {sentRequests.length}
                </span>
              )}
            </h2>
            <Suspense fallback={<p>Loading...</p>}>
              <SentRequests sentRequests={sentRequests} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestsPage;
