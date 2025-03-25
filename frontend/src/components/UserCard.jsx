import React from "react";
import Button from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { UserPlus, UserMinus, CheckCircle, XCircle, Clock, Users } from "lucide-react";

const UserCard = ({ user, isFriend, onAddFriend, onUnfriend, onAccept, onReject, requestActions, isPending }) => {
  return (
    <Card className="w-full max-w-sm bg-white shadow-md border border-gray-200 rounded-xl flex items-center p-4">
      {/* Profile Image */}
      <img
        src={user.avatar || "/images/default-avatar.png"}
        alt={user.username}
        className="w-12 h-12 rounded-full border border-gray-300"
      />

      {/* User Info */}
      <div className="ml-3 flex-1">
        <h3 className="text-gray-900 font-semibold">{user.username}</h3>
        {user.mutualFriends !== undefined && (
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Users size={14} />
            {user.mutualFriends} mutual friend{user.mutualFriends !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="ml-auto">
        {isPending ? (
          <Button variant="secondary" className="flex items-center gap-2 px-3 py-1 text-sm" disabled>
            <Clock size={16} /> Pending
          </Button>
        ) : requestActions ? (
          <div className="flex gap-2">
            <Button variant="success" className="flex items-center gap-2 px-3 py-1 text-sm" onClick={onAccept}>
              <CheckCircle size={16} /> Accept
            </Button>
            <Button variant="destructive" className="flex items-center gap-2 px-3 py-1 text-sm" onClick={onReject}>
              <XCircle size={16} /> Reject
            </Button>
          </div>
        ) : isFriend ? (
          <Button variant="destructive" className="flex items-center gap-2 px-3 py-1 text-sm" onClick={() => onUnfriend(user._id)}>
            <UserMinus size={16} /> Unfriend
          </Button>
        ) : (
          <Button variant="primary" className="flex items-center gap-2 px-3 py-1 text-sm" onClick={() => onAddFriend(user._id)}>
            <UserPlus size={16} /> Add Friend
          </Button>
        )}
      </div>
    </Card>
  );
};

export default UserCard;
