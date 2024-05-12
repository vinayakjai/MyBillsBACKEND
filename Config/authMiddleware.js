const jwt=require("jsonwebtoken");
const User = require("../modal/user");

async function isLogin(req,res,next){
   try{

    const {billToken}=req.cookies;
    if(!billToken){
        return res.status(404).json({
            success:false,
            error:"Please login"
        })
    }

    let userInfo=await jwt.verify(billToken,process.env.JWT_SECRET);
    
    req.user=await User.findById(userInfo._id);
    next();

    

   }catch(err){
    console.log(err)
    return res.status(500).json({
        success:false,
        error:"Internal server error",
    })
   }
}

module.exports=isLogin;