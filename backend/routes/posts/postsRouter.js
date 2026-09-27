const express = require("express");

const {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
} = require("../../controllers/posts/postsController");

const isLoggedIn = require("../../middlewares/isLoggedIn");

const postsRouter = express.Router();

//?create POST route
postsRouter.post("/", isLoggedIn, createPost);

//?get all POST route
postsRouter.get("/", getAllPosts);

//?get a single POST route
postsRouter.get("/:id", getPost);

//?delete POST route
postsRouter.delete("/:id",isLoggedIn,deletePost);

//?update POST
postsRouter.put("/:id",isLoggedIn, updatePost);

module.exports = postsRouter;