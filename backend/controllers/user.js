const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { getToken } = require("../middlewares/token");
const bcrypt = require("bcrypt");


exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = getToken(user);
    return res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getUserProfile = (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!`, user: req.user });
};


exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged Out" });
};

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all users (excluding the current user)
    const users = await User.find({ _id: { $ne: userId } }).select("username");

    // Fetch friends
    const user = await User.findById(userId).populate("friends", "username");
    const friends = user.friends;

    // Fetch incoming & outgoing friend requests
    const incomingRequests = await User.find({ friends: userId }).select("username");
    const outgoingRequests = await User.find({ _id: userId }).select("friends");

    // Fetch recommended friends (example: users with mutual friends)
    const recommendedFriends = await User.find({
      _id: { $ne: userId, $nin: friends.map(f => f._id) }
    }).limit(5).select("username");

    res.status(200).json({
      users,
      friends,
      incomingRequests,
      outgoingRequests,
      recommendedFriends,
    });

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("friends", "username");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error fetching friends:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("incomingRequests", "username")
      .populate("outgoingRequests", "username");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      incomingRequests: user.incomingRequests,
      outgoingRequests: user.outgoingRequests,
    });
  } catch (error) {
    console.error("Error fetching friend requests:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.sendFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const senderId = req.user._id;

    if (id === senderId.toString()) {
      return res.status(400).json({ message: "You cannot send a request to yourself" });
    }

    const receiver = await User.findById(id);
    const sender = await User.findById(senderId);

    if (!receiver || !sender) return res.status(404).json({ message: "User not found" });

    if (receiver.incomingRequests.includes(senderId) || sender.outgoingRequests.includes(id)) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    receiver.incomingRequests.push(senderId);
    sender.outgoingRequests.push(id);

    await receiver.save();
    await sender.save();

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Error sending friend request:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const receiver = await User.findById(req.user._id);
    const sender = await User.findById(id);

    if (!receiver || !sender) return res.status(404).json({ message: "User not found" });

    if (!receiver.incomingRequests.includes(id)) {
      return res.status(400).json({ message: "No friend request from this user" });
    }

    receiver.incomingRequests = receiver.incomingRequests.filter(reqId => reqId.toString() !== id);
    sender.outgoingRequests = sender.outgoingRequests.filter(reqId => reqId.toString() !== receiver._id.toString());

    receiver.friends.push(id);
    sender.friends.push(receiver._id);

    await receiver.save();
    await sender.save();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error("Error accepting friend request:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.rejectFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const receiver = await User.findById(req.user._id);
    const sender = await User.findById(id);

    if (!receiver || !sender) return res.status(404).json({ message: "User not found" });

    receiver.incomingRequests = receiver.incomingRequests.filter(reqId => reqId.toString() !== id);
    sender.outgoingRequests = sender.outgoingRequests.filter(reqId => reqId.toString() !== receiver._id.toString());

    await receiver.save();
    await sender.save();

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    console.error("Error rejecting friend request:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (id === userId.toString()) {
      return res.status(400).json({ message: "You can't add yourself as a friend" });
    }

    const user = await User.findById(userId);
    const friend = await User.findById(id);
    if (!user || !friend) return res.status(404).json({ message: "User not found" });

    if (user.friends.includes(id)) {
      return res.status(400).json({ message: "Already friends" });
    }

    user.friends.push(id);
    friend.friends.push(userId);
    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error("Error adding friend:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const friend = await User.findById(id);
    if (!user || !friend) return res.status(404).json({ message: "User not found" });

    if (!user.friends.includes(id)) {
      return res.status(400).json({ message: "User is not in your friends list" });
    }

    user.friends = user.friends.filter((friendId) => friendId.toString() !== id);
    friend.friends = friend.friends.filter((friendId) => friendId.toString() !== userId.toString());

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    console.error("Error removing friend:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getRecommendedFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("friends", "friends");

    if (!user) return res.status(404).json({ message: "User not found" });

    const mutualFriendsMap = new Map();

    // Iterate through the user's friends and their friends
    user.friends.forEach((friend) => {
      friend.friends.forEach((friendOfFriend) => {
        if (
          friendOfFriend.toString() !== req.user._id.toString() && // Not the logged-in user
          !user.friends.some((f) => f._id.toString() === friendOfFriend.toString()) // Not already a friend
        ) {
          mutualFriendsMap.set(
            friendOfFriend.toString(),
            (mutualFriendsMap.get(friendOfFriend.toString()) || 0) + 1
          );
        }
      });
    });

    // Sort recommended users by number of mutual friends (descending order)
    const recommendedUsers = await User.find({ _id: { $in: [...mutualFriendsMap.keys()] } }).select(
      "username"
    );

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error fetching recommended friends:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
