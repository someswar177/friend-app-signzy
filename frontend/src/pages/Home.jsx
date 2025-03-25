import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { debounce } from "lodash";

// Lazy load components
const SearchBar = lazy(() => import("../components/SearchBar"));
const FriendRequests = lazy(() => import("../components/FriendRequests"));
const SentRequests = lazy(() => import("../components/SentRequests"));
const FriendsList = lazy(() => import("../components/FriendsList"));
const UsersList = lazy(() => import("../components/UsersList"));
const RecommendedFriends = lazy(() => import("../components/RecommendedFriends"));

const Home = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [search, setSearch] = useState("");
    const [friendRequests, setFriendRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [recommendedFriends, setRecommendedFriends] = useState([]);

    const handleSearchChange = debounce((event) => {
        setSearch(event.target.value);
    }, 300);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data } = await axios.get("http://localhost:8800/api/user/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUsers(data.users);
                setFriends(data.friends);
                setFriendRequests(data.incomingRequests);
                setSentRequests(data.outgoingRequests);
                setRecommendedFriends(data.recommendedFriends);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, [token]);

    // Send Friend Request
    const handleSendRequest = async (userId) => {
        try {
            await axios.post(`http://localhost:8800/api/user/${userId}/send-request`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSentRequests([...sentRequests, users.find(user => user._id === userId)]);
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    // Accept Friend Request
    const handleAcceptRequest = async (userId) => {
        try {
            await axios.post(`http://localhost:8800/api/user/${userId}/accept-request`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setFriends([...friends, friendRequests.find(req => req._id === userId)]);
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
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Friends Dashboard</h1>
            {/* Search Bar */}
            <SearchBar search={search} handleSearchChange={handleSearchChange} />

            {/* Friend Requests */}
            <FriendRequests
                friendRequests={friendRequests}
                handleAcceptRequest={handleAcceptRequest}
                handleRejectRequest={handleRejectRequest}
            />

            {/* Sent Requests */}
            <SentRequests sentRequests={sentRequests} />

            {/* Friends List */}
            <FriendsList friends={friends} />

            {/* Users List */}
            <UsersList
                users={users}
                friends={friends}
                sentRequests={sentRequests}
                handleSendRequest={handleSendRequest}
            />

            {/* Recommended Friends */}
            <RecommendedFriends
                recommendedFriends={recommendedFriends}
                handleSendRequest={handleSendRequest}
            />
        </div>
    );
};

export default Home;