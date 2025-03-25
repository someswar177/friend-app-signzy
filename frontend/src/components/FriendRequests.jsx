import React from "react";
import UserCard from "./UserCard";
import { CheckCircle, XCircle } from "lucide-react"; // Import icons

const FriendRequests = ({ friendRequests, handleAcceptRequest, handleRejectRequest }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Friend Requests</h2>
      {friendRequests.length === 0 ? (
        <p className="text-gray-500">No new friend requests</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {friendRequests.map((request) => (
            <UserCard
              key={request._id}
              user={request}
              onAccept={() => handleAcceptRequest(request._id)}
              onReject={() => handleRejectRequest(request._id)}
              requestActions={true} // Show Accept/Reject buttons
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
