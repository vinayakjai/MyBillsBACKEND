const mongoose=require("mongoose");
async function connectToDb(){
    const dbMessage=await mongoose.connect(process.env.MONGO_URI);
    
    if(!dbMessage){
        console.log("unable to connect to database");
    }else{
        console.log("connected to database");
    }
}

module.exports=connectToDb;