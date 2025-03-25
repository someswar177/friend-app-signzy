const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { validateToken } = require("../middlewares/token");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/profile", validateToken, userController.getUserProfile);
router.get("/dashboard", validateToken, userController.getDashboardData);
router.get("/all/users",validateToken,userController.getAllUsers);
router.get("/friends",validateToken,userController.getUserFriends);
router.post("/:id/add-friend", validateToken, userController.addFriend);
router.delete("/:id/remove-friend", validateToken, userController.removeFriend);
router.post("/:id/send-request", validateToken, userController.sendFriendRequest);
router.post("/:id/accept-request", validateToken, userController.acceptFriendRequest);
router.delete("/:id/reject-request", validateToken, userController.rejectFriendRequest);
router.get("/friend-requests", validateToken, userController.getFriendRequests);
router.get("/friend/recommendations", validateToken, userController.getRecommendedFriends);

module.exports = router;
