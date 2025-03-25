import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import UserCard from "./UserCard"; // Import the UserCard component

const FriendsList = ({ friends, setFriends }) => {  
  const { token } = useAuth();
  const [friendList, setFriendList] = useState([]);

  // Sync local state with friends prop
  useEffect(() => {
    if (Array.isArray(friends)) {
      setFriendList(friends);
    }
  }, [friends]);

  const handleRemoveFriend = async (friendId) => {
    try {
      await axios.delete(`http://localhost:8800/api/user/${friendId}/remove-friend`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Remove friend from both state lists immediately
      setFriendList((prevFriends) => prevFriends.filter((friend) => friend._id !== friendId));
      setFriends((prevFriends) => prevFriends.filter((friend) => friend._id !== friendId));

    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Your Friends</h2>
      {friendList.length === 0 ? (
        <p>No friends yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {friendList.map((friend) => (
            <UserCard
              key={friend._id}
              user={friend}
              isFriend={true} // Since these are friends
              onUnfriend={handleRemoveFriend}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsList;
