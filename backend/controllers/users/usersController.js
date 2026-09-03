//@desc Register new user
//@route POAT /api/v1/user/register
//@access public
exports.register = async (req, resp) => {
    resp.json({message:"User registration controller executed!"})    
};
