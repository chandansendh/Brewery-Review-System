const jwt = require("jsonwebtoken");
const User = require("../Model/user-model");

const authMiddleware = async(req,res,next)=>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message:"Unauthorazed HTTP, Token not provided"});
    }
    const jwtToken = token.replace("Bearer","").trim();

    try {
        const isToken = jwt.verify(jwtToken,process.env.JWT_TOKEN);
        const userData = await User.findOne({email:isToken.email}).select({password:0});

        req.user=userData;
        req.token = token;
        req.userId=userData._id;
        next();
        
    } catch (error) {
        return res.status(400).json({message:"Unathorized. Invalid token"})
    }
}

module.exports = authMiddleware;