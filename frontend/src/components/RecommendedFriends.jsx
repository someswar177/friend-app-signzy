import React from "react";
import UserCard from "./UserCard";
import { UserPlus } from "lucide-react";

const RecommendedFriends = ({ recommendedFriends, handleSendRequest }) => {
  return (
    <div className="mb-6">
      {/* <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recommended Friends</h2> */}

      {recommendedFriends.length === 0 ? (
        <p className="text-gray-600 text-center">No recommendations yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendedFriends.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              actionButton={
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all"
                  onClick={() => handleSendRequest(user._id)}
                >
                  <UserPlus size={18} />
                  Send Request
                </button>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedFriends;
