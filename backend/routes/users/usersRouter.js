const express = require("express");
const { 
    register, 
    login, 
    getProfile, 
    blockUser
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

module.exports = usersRouters;