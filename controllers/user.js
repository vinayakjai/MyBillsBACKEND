const User = require("../modal/user");

async function register(req,res){
    try{
     const {name,email,password}=req.body;
     
     if(!name || !email || !password){
        return res.statu(404).json({
            success:false,
            error:"please provide all details",
        })
     }
     const user=await User.create({
        name,email,password
     });
     

   

     if(!user){
        return res.status(404).json({
            success:false,
            error:"Unable to register user,please try again",
        })
     }
    
     const userToken=await user.generateToken();

     if(!userToken){
      return res.status(404).json({
        success:false,
        error:"unable to register please try again",
      })
     }

     
     await user.save();
     return res.cookie("billToken",userToken,{
      
        sameSite:"none",
        secure:true,
        maxAge:2592000000,//1month
        
     }).status(201).json({
        message:"user registered successfully",
        success:true,
     })
    }catch(err){
      console.log(err)
        return res.status(500).json({
            success:false,
            error:"Internal server error",
        })
    }
}

async function login(req,res){
    try{
      const {email,password}=req.body;
      if(!email || !password){
        return res.status(404).json({
            success:false,
            error:"please provide all details",
        })
      }
      const user=await User.findOne({email});
      
      if(!user){
        return res.status(404).json({
            success:false,
            error:"cannot find user with the given email id",
        })
      }

      if(password!=user.password){
        
         return res.status(401).json({
            success:false,
            error:"incorrect password",
         })
      }

    const userToken=await user.generateToken();
      return res.cookie("billToken",userToken,{
        
        sameSite:"none",
        secure:true,
        maxAge:2592000000,
      }).status(201).json({
        success:true,
        message:"user logged in successfully",
      })
    }catch(err){
      console.log(err)
        return res.status(500).json({
            success:false,
            error:"Internal server error",
        })
    }
}

function logout(req,res){
  try{
    return res.cookie("billToken",null).status(201).json({
      success:true,
      message:"user logged out successfully",
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      error:"Internal server error", 
    })
  }
}

async function myProfile(req,res){
  try{
    const user=await User.findById(req.user._id.toString());
    if(!user){
      return res.status(404).json({
        success:false,
        error:"unable to find user,please signup",
      })
    }
    

    return res.status(201).json({
      success:true,
      user,
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      error:"Internal server error",
    })
  }
}

module.exports={
    register,
    login,
    logout,
    myProfile,
    
}