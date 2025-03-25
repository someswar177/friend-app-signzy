import React from "react";
import UserCard from "./UserCard";
import { Clock } from "lucide-react"; // Clock icon for pending requests

const SentRequests = ({ sentRequests }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Sent Friend Requests</h2>
      {sentRequests.length === 0 ? (
        <p className="text-gray-500">No pending requests</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sentRequests.map((request) => (
            <UserCard key={request._id} user={request} isPending={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SentRequests;
