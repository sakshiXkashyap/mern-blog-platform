const express = require ("express");
const {
    createComment,
    deleteComment,
    updateComment
} = require("../../controllers/comments/commentsController");

const isLoggedIn = require("../../middlewares/isLoggedIn");

const commentsRouter = express.Router();
//?create comment route
commentsRouter.post("/:postId", isLoggedIn, createComment);

//?delete comment route
commentsRouter.delete("/:commentId", isLoggedIn, deleteComment);

//?create comment route
commentsRouter.put("/:commentId", isLoggedIn, updateComment);

module.exports = commentsRouter;

