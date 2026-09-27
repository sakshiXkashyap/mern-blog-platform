const asyncHandler = require("express-async-handler");
const Post = require ("../../models/Posts/Post");
const User = require ("../../models/Users/User");
const Category = require("../../models/Categories/Categories");

//@desc create a new post
//@route POST /api/v1/posts
//@access private

exports.createPost = asyncHandler(async(req,resp, next) =>{
    //get the payload
    const {title, content, category } = req.body;

    console.log("Request body:", req.body);
    console.log (category,"received:", category );

    //check if the post is present 
    const postFound = await Post.findOne({title});
    if (postFound) {
        let error = new Error("Post already existing");
        next (error);
        return;
    }
    //create post object
    const post = await Post.create({ 
                  title,
                  content, 
                  category: category, 
                  author: req?.userAuth?._id
    });
    //update user by add ing post in it 
    const user = await User.findByIdAndUpdate(
        req?.userAuth?._id, 
        {$push:{posts: post._id } }, 
        {new: true} 
    );

    //update category by adding post in it
    const catg = await Category.findByIdAndUpdate(
         category,
        { $push:{ posts: post._id } }, 
        {new: true} 
    );
    //send the response
    resp.json({
        status: "success",
        message:"Posts successfully created",
        post,
        user,
        catg,
    });
});

//@desc get all posts
//@route get /api/v1/posts
//@access public
exports.getAllPosts = asyncHandler(async (req, resp) => {
    //fetch all the posts from the DB
    const allPosts = await Post.find({})
    //send the response
    resp.json({
        status: "success",
        message: "all posts successfully fetched",
        allPosts,
    });
});

 //@desc get single posts
//@route get /api/v1/posts/:id
//@access public
exports.getPost = asyncHandler(async (req, resp) => {
    //get the id
    const postId = req.params.id;
    //fetch the post corresponding to this id 
    const post = await Post.findById(postId);
    if(post) {
        resp.json({
          status: "success",
          message:" Post successfully fetched",
          post,
        });
    } else {
        resp.json({
          status: "success",
          message:"No post available for given id",
        });
    }
});

//@desc delete post
//@route DELETE /api/v1/posts/:id
//@access private
exports.deletePost = asyncHandler(async (req, resp) => {
    //get the id
    const postId = req.params.id;

    //delete this post from the DB
    await Post.findByIdAndDelete(postId);
    //send the response
    resp.json({
        status: "success",
        message: "Post successfully deleted",
    });
});

//@desc Update Post
//@route PUT /api/v1/posts/:id
//@access private
exports.updatePost = asyncHandler(async (req, resp) => {
    //get the id
    const postId = req.params.id;

    //Get the post object from req
    const post = req.body;

    //update this post in the DB
    const updatedPost = await Post.findByIdAndUpdate(postId, post, {new:true,runValidators:true});
    //send the response
    resp.json({
        status: "success",
        message: "Post successfully updated",
        updatedPost,
    });
});