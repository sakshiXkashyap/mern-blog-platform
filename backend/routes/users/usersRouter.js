const express = require("express");
const { register, login, getProfile } = require("../../controllers/users/usersController");
const usersRouters = express.Router();
//!Register Route
usersRouters.post("/register", register);

//!Login Route
usersRouters.post("/login", login);

//!Profile Route
usersRouters.get("/profile/:id", getProfile);
module.exports = usersRouters;