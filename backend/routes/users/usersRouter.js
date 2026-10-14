const express = require("express");
const { 
    register, 
    login, 
    getProfile, 
    blockUser,
    unblockUser,
    viewOtherProfile,
    followingUser,
    unFollowingUser
} = require("../../controllers/users/usersController");
const isLoggedIn = require("../../middlewares/isLoggedIn");

const usersRouters = express.Router();
//!Register Route
usersRouters.post("/register", register);

//!Login Route
usersRouters.post("/login", login);

//!Profile Route
usersRouters.get("/profile", isLoggedIn, getProfile);

//!Block user Route
usersRouters.put("/block/:userIdToBlock", isLoggedIn, blockUser);

//!UnBlock user Route
usersRouters.put("/unblock/:userIdToUnBlock", isLoggedIn, unblockUser);

//!view another profile user Route
usersRouters.get(
    "/view-other-profile/:userProfileId", 
    isLoggedIn, 
    viewOtherProfile
);

//!follow a user route
usersRouters.put(
    "/following/:userIdToFollow", 
    isLoggedIn, 
    followingUser
);

//!unfollow a user route
usersRouters.put(
    "/unfollowing/:userIdToUnFollow", 
    isLoggedIn, 
    unFollowingUser
);

module.exports = usersRouters;