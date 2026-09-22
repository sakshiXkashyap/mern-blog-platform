const jwt = require("jsonwebtoken");
const User = require("../models/Users/User");
const { findById } = require("../models/Users/User");
const isLoggedIn = (req, resp, next) => {
    console.log("isLoggedIn executed!");
    //Fetch token from request
    const token = req.headers.authorization?.split(" ")[1];
    //Verify token
    jwt.verify(token, process.env.JWT_KEY , async (err,decoded) => {
        //if unsuccessfull then send the error message
       if(err) {
         const error = new Error(err?.message);
        next(err);
       }else {
          //if successfful, then pass the User object to next path
          const userid = decoded?.user?.id;
          const user = await User.findById(userid).select(
            "username email role _id"
          );
          req.userAuth = user;
          next();
       }
    });
}; 
module.exports = isLoggedIn;
