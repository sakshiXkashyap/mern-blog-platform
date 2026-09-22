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
        message:"Post successfully created",
        post,
        user,
        catg,
    });
});