import React from "react";

const UsersList = ({ users, friends, sentRequests, handleSendRequest }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">All Users</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 bg-white shadow-md rounded-lg">
            <p>{user.username}</p>

            {friends.some((friend) => friend._id === user._id) ? (
              <button className="bg-gray-400 text-white px-4 py-1 mt-2 rounded" disabled>
                Friend
              </button>
            ) : sentRequests.some((req) => req._id === user._id) ? (
              <button className="bg-yellow-500 text-white px-4 py-1 mt-2 rounded" disabled>
                Pending
              </button>
            ) : (
              <button className="bg-blue-500 text-white px-4 py-1 mt-2 rounded"
                      onClick={() => handleSendRequest(user._id)}>
                Send Request
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
