import React from "react";

const SentRequests = ({ sentRequests }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-purple-500">Sent Friend Requests</h2>
      {sentRequests.length === 0 ? (
        <p className="text-gray-500">No pending requests</p>
      ) : (
        sentRequests.map((request) => (
          <div key={request._id} className="flex items-center p-4 bg-gray-100 rounded-lg">
            <p className="mr-2">{request.username}</p>
            <span className="text-sm text-gray-500">(Pending)</span>
          </div>
        ))
      )}
    </div>
  );
};

export default SentRequests;
