const bcrypt = require("bcryptjs");
const User = require("../../models/Users/User");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
//@desc Register new user
//@route POAT /api/v1/user/register
//@access public

exports.register = asyncHandler(async (req, resp, next) => {
       const {username,password,email } = req.body;
       const user = await User.findOne({ username });
       if (user) {
          throw new Error("User Alreay Existing");
       }
       const newUser = new User({ username, email, password });
       const salt = await bcrypt.genSalt(10);
       newUser.password = await bcrypt.hash(password, salt);
       await newUser.save();
       resp.json({
        status:"success",
        message: "User registered successfully",
        _id: newUser?.id,
        username:newUser?.username,
        email:newUser?.email,
        role: newUser?.role,
       });
});
//@desc Login new user
//@route POST /api/v1/user/login
//@access public 
exports.login = asyncHandler(async (req, resp, next) => {
        const {username,password} = req.body;
        const user = await User.findOne({username });
        if(!user) {
            throw new Error("Invalid credentials");
        }
        let isMatched = await bcrypt.compare(password,user?.password);
        if(!isMatched) {
            throw new Error("Invalid credentials");
        }
        user.lastLogin =  new Date();
        await user.save();
        resp.json({
                   status: "success",
                   email:user?.email,
                   _id:user?._id,
                   username:user?.username,
                   role:user?.role,
                   token:generateToken(user),
                });

});
       
//@desc Profile view
//@route GET /api/v1/user/profile/:id
//@access private
exports.getProfile = asyncHandler(async(req, resp, next) => {
    //console.log("Rec:", req.userAuth);
    
        const user = await User.findById(req.userAuth.id);
        resp.json({
             status:"success",
             message: "Profile fetched",
             user,
            });
});

//@desc Block user
//@route Put /api/v1/users/block/userIdToBlock
//@access private
exports.blockUser = asyncHandler(async(req,resp,next) =>{
    //!find the userid to be blocked
    const userIdToBlock = req.params.userIdToBlock;
    //!check whether the user is present in DB OR NOT 
    const userToBlock = await User.findById(userIdToBlock);
    if(!userToBlock) {
        let error = new Error("User to block not found!");
        next(error);
        return;
    }
    //!get the current user id 
    const userBlocking = req?.userAuth?._id;

    //!check if it is self blocking
    if(userIdToBlock.toString() === userBlocking.toString()) {
        let error = new Error("Cannot block yourself!");
        next(error);
        return;
    }
    //!get the current user object from DB
    const currentUser = await User.findById(userBlocking);

    //!check whether the userIdToBlock is already blocked
    if(currentUser.blockedUsers.includes(userIdToBlock)) {
        let error = new Error("This user has already been blocked!");
        next(error);
        return;
    }

    //!push the user to be blocked in the blockedUser array
    currentUser.blockedUsers.push(userIdToBlock);

    //!save changes to database
    await currentUser.save();

    resp.json({
      status:"success",
      message: "User blocked successfully",
    });
});
//@desc UnBlock user
//@route PUT /api/v1/users/unblock/:userIdToUnBlock
//@access private

exports.unblockUser = asyncHandler(async (req, resp, next) => {
    // Find the user ID to be unblocked
    const userIdToUnBlock = req.params.userIdToUnBlock;
    const userToUnBlock = await User.findById(userIdToUnBlock);
    if (!userToUnBlock) {
        let error = new Error("User to unblock not found!");
        next(error);
        return;
    }
    // Find the current user
    const userUnBlocking = req?.userAuth?._id;
    const currentUser = await User.findById(userUnBlocking);

    // Check if the user to unblock is already blocked
    if (!currentUser.blockedUsers.includes(userIdToUnBlock)) {
        let error = new Error("User not blocked!");
        next(error);
        return;
    }
    // Remove the user from the current user blockedUsers array
    currentUser.blockedUsers = currentUser.blockedUsers.filter((id) => {
        return id.toString() !== userIdToUnBlock.toString();
    });
    //update the DB
    await currentUser.save();

    // Send response
    resp.json({
        status: "success",
        message: "User Unblocked successfully",
    });
});

//@desc view another user profile
//@route GET /api/v1/users/view-another-profile/:userProffileId
//@acccess private

exports.viewOtherProfile = asyncHandler(async(req, resp, next) =>{
    //get the user id whose profile is to viewed
    const userProfileId = req.params.userProfileId;
    const userProfile = await User.findById(userProfileId);
    if (!userProfileId) {
        let error = new Error("User whose profile is to be viewed not present!");
        next(error);
        return;
    }
    const currentUserId = req?.userAuth?.id;
    // Check if we have already viewed the profile of userProfile
    if (userProfile.profileViewers.includes(currentUserId)){
        let error = new Error("You have already viewed the profile!");
        next(error);
        return;
    }

    //push the currentUserId innto array of userProfile
    userProfile.profileViewers.push(currentUserId);
    //update the DB
    await userProfile.save();
    //return the resp
     resp.json({
        status: "success",
        message: "Profile successfully viewed",
    });
});

//@desc Follow user 
//@route PUT /api/v1/users/uollowing/:userIdToFollow
//@acccess private

expressAsyncHandler.followingUser = asyncHandler(async (req, resp, next) =>{
    //Find the current user id
    const currentUserId = req?.userAuth?._id;
    //find the user to be followed
    const userIdToFollow = req.params.userIdToFollow;
    const userProfile = await User.findById(userIdToFollow);
    if (!userProfileId) {
        let error = new Error("User to be followed not present!");
        next(error);
        return;
    }

    
})