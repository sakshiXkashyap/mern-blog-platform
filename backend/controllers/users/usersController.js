const bcrypt = require("bcryptjs");
const User = require("../../models/Users/User");
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
        
    }catch (error) {

    }
};