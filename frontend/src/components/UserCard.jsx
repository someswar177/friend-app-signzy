import React from "react";
import Button from "../ui/button";
import { Card } from "../ui/card";
import { UserPlus, UserMinus, CheckCircle, XCircle, Clock, Users } from "lucide-react";

const UserCard = ({ user, isFriend, onAddFriend, onUnfriend, onAccept, onReject, requestActions, isPending }) => {
  return (
    <Card className="w-full bg-white shadow-md border border-gray-200 rounded-xl flex items-center p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Profile Image */}
      <img
        src={user.avatar || "/images/default-avatar.png"}
        alt={user.username}
        className="w-12 h-12 rounded-full border border-gray-300 flex-shrink-0"
      />

      {/* User Info */}
      <div className="ml-3 flex-1 min-w-0">
        <h3 className="text-gray-900  font-semibold truncate">{user.username}</h3>
        {user.mutualFriendsCount !== undefined && (
          <p className="text-sm text-gray-500 flex items-center gap-1 truncate">
            <Users size={14} className="text-indigo-500" />
            {user.mutualFriendsCount}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="ml-auto flex gap-2 flex-wrap justify-end min-w-0">
        {isPending ? (
          <button
            disabled
            className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-300 rounded-full flex items-center gap-2 cursor-not-allowed"
          >
            <Clock size={16} />
            Pending
          </button>
        ) : requestActions ? (
          <>
            <button
              onClick={onAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center gap-2 hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <CheckCircle size={16} />
              Accept
            </button>
            <button
              onClick={onReject}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center gap-2 hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <XCircle size={16} />
              Reject
            </button>
          </>
        ) : isFriend ? (
          <button
            onClick={() => onUnfriend(user._id)}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center gap-2 hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <UserMinus size={16} />
            Unfriend
          </button>
        ) : (
          <button
            onClick={() => onAddFriend(user._id)}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full flex items-center gap-2 hover:from-indigo-500 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <UserPlus size={16} />
            Add Friend
          </button>
        )}
      </div>
    </Card>
  );
};

export default UserCard;
