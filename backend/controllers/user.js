const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { getToken } = require("../middlewares/token");
const bcrypt = require("bcrypt");


exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
      username: username,
    });

    await newUser.save();

    res.status(201).json({
      status: "Success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Registration failed:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        type: "Login",
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = getToken(user);

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = (req, res) => {
  res.json({ message: `Welcome ${req.user.name}!`, user: req.user });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged Out" });
};
