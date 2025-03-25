import React from "react";

const FriendsList = ({ friends }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-green-500">Your Friends</h2>
      {friends.length === 0 ? (
        <p className="text-gray-500">No friends yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <div key={friend._id} className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
              {/* <img src={friend.profilePicture || "/default-avatar.png"} alt="profile" className="w-12 h-12 rounded-full mb-2" /> */}
              <p className="font-medium">{friend.username}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsList;
