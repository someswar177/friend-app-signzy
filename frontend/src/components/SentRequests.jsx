import React from "react";
import UserCard from "./UserCard";
import { Clock } from "lucide-react"; // Clock icon for pending requests

const SentRequests = ({ sentRequests }) => {
  return (
    <div className="mb-6">
      {/* <h2 className="text-2xl font-semibold mb-2">Sent Friend Requests</h2> */}
      <div className="flex flex-col items-center gap-4">
      {sentRequests.length === 0 ? (
        <p className="text-gray-500">No pending requests</p>
      ) : (
        <div className="w-full max-w-[80%]">
          {sentRequests.map((request) => (
            <UserCard key={request._id} user={request} isPending={true} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default SentRequests;
