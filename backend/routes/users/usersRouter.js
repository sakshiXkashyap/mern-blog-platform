const express = require("express");
const {register}=require("../../controllers/users/usersController")

const usersRouters = express.Router()
usersRouters.post("/register", register);

module.exports = usersRouters;