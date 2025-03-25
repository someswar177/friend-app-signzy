import React from "react";

const FriendRequests = ({ friendRequests, handleAcceptRequest, handleRejectRequest }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-blue-500">Friend Requests</h2>
      {friendRequests.length === 0 ? (
        <p className="text-gray-500">No new friend requests</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request._id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-2">
            <div className="flex items-center">
              {/* <img src={request.profilePicture || "/default-avatar.png"} alt="profile" className="w-10 h-10 rounded-full mr-3" /> */}
              <p className="font-medium">{request.username}</p>
            </div>
            <div>
              <button className="bg-blue-500 text-white px-4 py-1 rounded-lg mr-2 hover:bg-blue-600"
                      onClick={() => handleAcceptRequest(request._id)}>
                Accept
              </button>
              <button className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                      onClick={() => handleRejectRequest(request._id)}>
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequests;
