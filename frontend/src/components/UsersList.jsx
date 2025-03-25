import React from "react";
import UserCard from "./UserCard";

const UsersList = ({ users, friends, sentRequests, handleSendRequest, handleUnfriend }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">All Users</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => {
          const isFriend = friends.some((friend) => friend._id === user._id);
          const isPending = sentRequests.some((req) => req._id === user._id);

          return (
            <UserCard
              key={user._id}
              user={user}
              isFriend={isFriend}
              isPending={isPending}
              onAddFriend={handleSendRequest}
              onUnfriend={handleUnfriend} // Pass Unfriend function
            />
          );
        })}
      </div>
    </div>
  );
};

export default UsersList;
