const bcrypt = require("bcryptjs");
const User = require("../../models/Users/User");
const generateToken = require("../../utils/generateToken");
//@desc Register new user
//@route POAT /api/v1/user/register
//@access public

exports.register = async (req, resp, next) => {
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
        next(error); //goto global error handler
    }
};
//@desc Login new user
//@route POAT /api/v1/user/login
//@access public
exports.login = async (req, resp, next) => {
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
       next(error); //goto global error handler
    }
};
//@desc Profile view
//@route GET /api/v1/user/profile/:id
//@access private
exports.getProfile = async(req, resp, next) => {
    //console.log("Rec:", req.userAuth);

    try {
        const user = await User.findById(req.userAuth.id);
        resp.json({
             status:"success",
             message: "Profile fetched",
             user,
            });
    }catch (error) {
        next(error); //goto global error handler
    }
};