const express = require ("express");
const {createPost} = require("../../controllers/posts/postsController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const postsRouter = express.Router();

//?create POST route
postsRouter.post("/", isLoggedIn,createPost);

module.exports = postsRouter;