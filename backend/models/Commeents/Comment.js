const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
    {
      message: {
          type: String,
          required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
      },
      postTd: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
      },
    },
    {
      timestamps: true,
    }
);
//!convert schema to model 

const Comment= mongoose.model("Comment", commmentSchema);
module.exports = Comment;
