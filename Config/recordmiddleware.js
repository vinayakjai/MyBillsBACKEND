const Record = require("../modal/records");
const User = require("../modal/user");

async function isRecordCreated(req,res,next){
     try{
       let user_id=req.user._id.toString();
    

       const record=await Record.findOne({user_id});
      
       if(!record){
        return res.status(401).json({
            success:false,
            error:"Please create record first",
        })
       }else{
        next();
       }
     }catch(err){
        return res.status(500).json({
            success:false,
            error:"Internal server error",
        })
     }
}

module.exports=isRecordCreated;