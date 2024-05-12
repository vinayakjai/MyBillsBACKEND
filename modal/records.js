const mongoose = require("mongoose");
const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter record name"],
  },
  prices: {
    type: [Number],
  },
  priceEachDay: [
    {
      price: Number,
      date: String,
    },
  ],
  priceRecord:[
    {
      amountList: [Number],
      date: String,
    }
  ],
  user_id: {
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  },
});
const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
