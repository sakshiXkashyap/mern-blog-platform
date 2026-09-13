const bcrypt = require("bcryptjs");
const User = require("../../models/Users/User");
const generateToken = require("../../utils/generateToken");
//@desc Register new user
//@route POAT /api/v1/user/register
//@access public

exports.register = async (req, resp) => {
    try {
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
        message: "Use registered successfully",
        _id: newUser?.id,
        username:newUser?.username,
        email:newUser?.email,
        role: newUser?.role,
       });
    } catch (error) {
        resp.json({status:"Failed", message: error?.message });
    }
};
//@desc Login new user
//@route POAT /api/v1/user/login
//@access public
exports.login = async (req, resp) => {
    try{
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
    }catch (error) {
       resp.json({status: "failed", message: error?.message });
    }
};
//@desc Profile view
//@route GET /api/v1/user/profile/:id
//@access private
exports.getProfile = async(req, resp) => {
    try {
        resp.json({
            status:"success",
             message: "Profile fetched",
             data:"dummu user"
            });
    }catch (error) {
        resp.json({
            status:"error",
            message: error?.message,
            });
    }
};