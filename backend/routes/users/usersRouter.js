const express = require("express");
const {register}=require("../../controllers/users/usersController")

const usersRouters = express.Router()
usersRouters.post("/api/v1/user/register", register);

module.exports = usersRouters;