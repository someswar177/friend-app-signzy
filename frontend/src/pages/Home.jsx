import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { debounce } from "lodash";
import Navbar from "../components/Navbar";

// Lazy load components
const SearchBar = lazy(() => import("../components/SearchBar"));
const FriendRequests = lazy(() => import("../components/FriendRequests"));
const SentRequests = lazy(() => import("../components/SentRequests"));
const FriendsList = lazy(() => import("../components/FriendsList"));
const UsersList = lazy(() => import("../components/UsersList"));
const RecommendedFriends = lazy(() => import("../components/RecommendedFriends"));

const Home = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8800/api";
    // console.log(apiUrl);
    const { token } = useAuth();
    const { logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [search, setSearch] = useState("");
    const [friendRequests, setFriendRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [recommendedFriends, setRecommendedFriends] = useState([]);

    // Fetch all required data on mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/user/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUsers(data.users);
                setFriends(data.friends);
                // console.log(data);
                setFriendRequests(data.incomingRequests);
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
                // console.log(data);
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
            await axios.post(`${apiUrl}/user/${userId}/send-request`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSentRequests([...sentRequests, users.find(user => user._id === userId)]);
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    const handleRemoveFriend = async (friendId) => {
        try {
            await axios.delete(`${apiUrl}/user/${friendId}/remove-friend`, {
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

    const handleSearchChange = (value) => {
        setSearch(value); // Update state directly
    };

    // Filter users based on search query
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <div className="min-h-screen p-6">
                <Navbar logout={logout} />
                {/* <h1 className="text-3xl font-bold mb-4">Home</h1> */}

                {/* Search Bar */}
                <div className="p-4">
                    <SearchBar search={search} handleSearchChange={handleSearchChange} />
                    <div className="mt-5">
                        <div>
                            <h2 className="text-white text-2xl bg-green-600 px-4 py-2 my-4 rounded-md font-semibold">All Users</h2>
                            <UsersList
                                // users={users}
                                users={filteredUsers}
                                friends={friends}
                                sentRequests={sentRequests}
                                handleSendRequest={handleSendRequest}
                                handleUnfriend={handleRemoveFriend}
                            />
                        </div>

                        <div>
                            <h2 className="text-white text-2xl bg-blue-600 px-4 py-2 my-4 rounded-md font-semibold">Suggested Friends</h2>
                            <RecommendedFriends
                                recommendedFriends={recommendedFriends}
                                handleSendRequest={handleSendRequest}
                            />
                        </div>

                        <div>
                            <h2 className="text-white text-2xl bg-purple-600 px-4 py-2 my-4 rounded-md font-semibold">Your Friends</h2>
                            <FriendsList friends={friends} />
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Home;