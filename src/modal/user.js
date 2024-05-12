const mongoose=require("mongoose");
const jsonwebtoken=require("jsonwebtoken");
const userSchema = new mongoose.Schema({ 
    name:{
        type:String,
        required:[true,"please enter name"],
    },
    email:{
        type:String,
        required:[true,"please enter email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"please enter password"],
    },
   
});

userSchema.methods.generateToken = async function (){

    const token=await jsonwebtoken.sign({ _id: this._id }, process.env.JWT_SECRET,{
        expiresIn:"24hr",
    });
   
    return token;
}
const User = mongoose.model('User', userSchema);
module.exports=User;