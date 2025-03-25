import React, { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

// Lazy load components
const FriendRequests = lazy(() => import("../components/FriendRequests"));
const SentRequests = lazy(() => import("../components/SentRequests"));

const FriendRequestsPage = () => {
    const { token, logout } = useAuth();
    const [friendRequests, setFriendRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);

    // Fetch friend requests
    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const { data } = await axios.get("http://localhost:8800/api/user/dashboard", {
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
            await axios.post(`http://localhost:8800/api/user/${userId}/accept-request`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setFriendRequests(friendRequests.filter(req => req._id !== userId));
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    // Reject Friend Request
    const handleRejectRequest = async (userId) => {
        try {
            await axios.delete(`http://localhost:8800/api/user/${userId}/reject-request`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setFriendRequests(friendRequests.filter(req => req._id !== userId));
        } catch (error) {
            console.error("Error rejecting friend request:", error);
        }
    };

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <div className="min-h-screen p-6">
                <Navbar logout={logout} />
                <h1 className="text-3xl font-bold mb-4">Friend Requests</h1>

                {/* Friend Requests Component */}
                <FriendRequests
                    friendRequests={friendRequests}
                    handleAcceptRequest={handleAcceptRequest}
                    handleRejectRequest={handleRejectRequest}
                />

                <h1 className="text-3xl font-bold mb-4">Sent Friend Requests</h1>

                {/* Sent Requests Component */}
                <SentRequests sentRequests={sentRequests} />
            </div>
        </Suspense>
    );
};

export default FriendRequestsPage;
