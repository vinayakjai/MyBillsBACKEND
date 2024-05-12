const mongoose = require("mongoose");
const billSchema = new mongoose.Schema({
  productName:{
    type:String,
    required:[true,"please enter product name"]
  },
  quantity:{
    type:Number,
    required:[true,"please enter quantity"],
  },
  price:{
    type:Number,
    required:[true,"please enter price of product"]
  },
  
});
const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
