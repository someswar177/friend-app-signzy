import React from "react";

const RecommendedFriends = ({ recommendedFriends, handleSendRequest }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-blue-500">Recommended Friends</h2>
      {recommendedFriends.length === 0 ? (
        <p className="text-gray-500">No recommendations yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendedFriends.map((user) => (
            <div key={user._id} className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
              {/* <img src={user.profilePicture || "/default-avatar.png"} alt="profile" className="w-12 h-12 rounded-full mb-2" /> */}
              <p className="font-medium">{user.username}</p>
              <button className="bg-blue-500 text-white px-4 py-1 mt-2 rounded-lg hover:bg-blue-600"
                      onClick={() => handleSendRequest(user._id)}>
                Add Friend
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedFriends;
