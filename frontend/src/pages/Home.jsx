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

    // Fetch all required data on mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data } = await axios.get("http://localhost:8800/api/user/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUsers(data.users);
                setFriends(data.friends);
                console.log(data);
                setFriendRequests(data.incomingRequests);
                setSentRequests(data.outgoingRequests);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };
        const recommendFriendsData = async () => {
            try {
                const { data } = await axios.get("http://localhost:8800/api/user/friend/recommendations", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setRecommendedFriends(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
        recommendFriendsData();
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

    const handleRemoveFriend = async (friendId) => {
        try {
            await axios.delete(`http://localhost:8800/api/user/${friendId}/remove-friend`, {
                headers: { Authorization: `Bearer ${token}` }, // Ensure token is provided
            });
            setFriends((prevFriends) => prevFriends.filter((friend) => friend._id !== friendId));

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === friendId ? { ...user, isFriend: false } : user
                )
            );
        } catch (error) {
            console.error("Error removing friend:", error);
        }
    };

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <div className="min-h-screen p-6">
                <h1 className="text-3xl font-bold mb-4">Home</h1>

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
                    handleUnfriend={handleRemoveFriend}
                />

                {/* Recommended Friends */}
                <RecommendedFriends
                    recommendedFriends={recommendedFriends}
                    handleSendRequest={handleSendRequest}
                />
            </div>
        </Suspense>
    );
};

export default Home;