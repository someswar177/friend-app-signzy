import React from "react";
import UserCard from "./UserCard";
import { CheckCircle, XCircle } from "lucide-react"; // Import icons

const FriendRequests = ({ friendRequests, handleAcceptRequest, handleRejectRequest }) => {
  return (
    <div className="mb-6">
      {/* <h2 className="text-2xl font-semibold mb-2">Friend Requests</h2> */}
      <div className="flex flex-col items-center gap-4">
        {friendRequests.length === 0 ? (
          <p className="text-gray-500">No new friend requests</p>
        ) : (
          <div className="w-full max-w-[90%]">
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
    </div>
  );
};

export default FriendRequests;
