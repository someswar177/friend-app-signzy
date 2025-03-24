import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("http://localhost:8800/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    };
    fetchUsers();
  }, [token]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Home</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Users..."
        className="w-full p-2 border rounded-lg mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Friends List */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Your Friends</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <div key={friend.id} className="p-4 bg-gray-100 rounded-lg">
              <p>{friend.username}</p>
              <button className="text-red-500 mt-2">Unfriend</button>
            </div>
          ))}
        </div>
      </div>

      {/* User List */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">All Users</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users
            .filter((user) => user.username.includes(search))
            .map((user) => (
              <div key={user.id} className="p-4 bg-white shadow-md rounded-lg">
                <p>{user.username}</p>
                <button className="bg-blue-500 text-white px-4 py-1 mt-2 rounded">
                  Add Friend
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;