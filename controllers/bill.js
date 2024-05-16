const Record = require("../modal/records");


async function getTodayPrice(req, res) {
  try {
    let totalPriceOfDay = 0;
    let userId = req.user._id.toString();
    let record = await Record.findOne({ user_id: userId });

    if (!record) {
      return res.status(404).json({
        error: "unable to get total price of day",
      });
    }
    if (record.prices.length == 0) {
      console.log('sm')
      return res.status(201).json({
        success: true,
        totalPrice: 0,

      });
    }
    record.prices.map((price) => {
      totalPriceOfDay += price;
    });

    return res.status(201).json({
      success:true,
      totalPrice:totalPriceOfDay
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "internal server error",
    });
  }
}

async function createRecord(req, res) {
  try {
    console.log("hit");
    const { recordName } = req.body;
    if (!recordName) {
      return res.status(404).json({
        success: false,
        error: "please provide record name",
      });
    }

    let user_id = req.user._id.toString();
    const record = await Record.create({ name: recordName, user_id });

    if (!record) {
      return res.status(404).json({
        success: false,
        error: "unable to create record please try again",
      });
    }

    await record.save();

    return res.status(201).json({
      success: true,
      message: "record created successfully",
      data:record,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function addPrice(req, res) {
  try {
    const { val } = req.query;
    const record = await Record.findOne({ user_id: req.user._id.toString() });
    if (!record) {
      return res.status(404).json({
        success: false,
        error: "unable to add price,please try again",
      });
    }
    record.prices.push(val);
    await record.save();
    return res.status(201).json({
      message: "price added successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "internal server error",
    });
  }
}

async function updatePrice(req, res) {
  try {
    let { val } = req.query;
    if (!val) {
      return res.status(404).json({
        success: false,
        error: "please provide updated price value",
      });
    }

    const record = await Record.findOne({ user_id: req.user._id.toString() });
    if (record.prices.length == 0) {
      return res.status(404).json({
        success: false,
        error: "no price is added before",
      });
    }
    record.prices.pop();
    record.prices.push(val);
    await record.save();
    return res.status(201).json({
      success: true,
      message: "price updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "internal server error",
    });
  }
}

async function addTodayPrice(req, res) {
  try {
    const { date } = req.body;
    console.log(date);
    if (!date) {
      return res.status(404).json({
        success: false,
        error: "please enter date",
      });
    }

    let todayPrice = 0;
    const record = await Record.findOne({ user_id: req.user._id.toString() });
    record.prices.map((price) => {
      todayPrice += price;
    });
    record.priceEachDay.push({
      price: todayPrice,
      date,
    });

    await record.save();
    return res.status(201).json({
      success: true,
      message: "today's price added successfully",
      
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "internal server error",
    });
  }
}

async function resetPrice(req, res) {
  try {
    const record = await Record.findOne({ user_id: req.user._id.toString() });
    if (!record) {
      return res.status(404).json({
        success: false,
        error: "unable to reset price",
      });
    }

    record.prices = [];
    await record.save();
    return res.status(201).json({
      success: true,
      message: "price reset successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function getMonthlyAmount(req,res){
     try{
        
         let monthlyPriceSum=0;
         let record=await Record.findOne({user_id:req.user._id.toString()});
         if(record.priceEachDay.length==0){
          return res.status(201).json({
            success:true,
            monthlyPrice:0,
          })
         }
         record.priceEachDay.map((priceInfo)=>{
             monthlyPriceSum+=priceInfo.price;
         });
         return res.status(201).json({
          success:true,
          monthlyPrice:monthlyPriceSum,
         })
     }catch(err){
      return res.status(500).json({
        success:false,
        error:"Internal server error",
      })
     }
}

async function addTodayPriceRecord(req,res){
  try{
    let {date}=req.body;
   
    if(!date){
      return res.status(404).json({
        success:false,
        error:"please provide date",
      })
    }
    console.log(date)
    let record=await Record.findOne({user_id:req.user._id.toString()});
    let todayPrices=record.prices;
    record.priceRecord.push({amountList:todayPrices,date});
    await record.save();
    return res.status(201).json({
      success:true,
      message:"today's amount record stored successfully",
    });


  }catch(err){
    console.log(err)
    return res.status(500).json({
      success:false,
      error:"Internal server error",
    })
  }
}



async function getPriceRecordByDate(req,res){
  try{
  
    let {date}=req.query;
    if(!date){
      return res.status(404).json({
        success:false,
        error:"please provide date"
      })
    }
    console.log("date-->",date);
    let record=await Record.findOne({user_id:req.user._id.toString()});
    
    console.log(record)
    if(!record){
      return res.status(404).json({
        success:false,
        error:"unable to fetch record with given date provided"
      })
    }
    let amountRecord=null;
    record.priceRecord.filter((todayAmountList)=>{
        if(todayAmountList.date==date){
               amountRecord=todayAmountList.amountList;
        }
    })
    return res.status(201).json({
      success:true,
      amountRecord,
    });


  }catch(err){
    return res.status(500).json({
      success:false,
      error:"Internal server error",
    })
  }
}

module.exports = {
  getTodayPrice,
  addPrice,
  updatePrice,
  addTodayPrice,
  createRecord,
  resetPrice,
  getMonthlyAmount,
  addTodayPriceRecord,
  getPriceRecordByDate
};
