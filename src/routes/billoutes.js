const app=require("express");
const { getTodayPrice, addPrice, updatePrice, addTodayPrice, createRecord, resetPrice, getMonthlyAmount, addTodayPriceRecord, getPriceRecordByDate } = require("../controllers/bill");
const isLogin = require("../Config/authMiddleware");
const isRecordCreated = require("../Config/recordmiddleware");
const { myProfile } = require("../controllers/user");

const billRouter=app.Router();

billRouter.get('/today',isLogin,isRecordCreated,getTodayPrice);
billRouter.post('/price',isLogin,isRecordCreated,addPrice);
billRouter.put('/price',isLogin,isRecordCreated,updatePrice);
billRouter.post('/todayPrice',isLogin,isRecordCreated,addTodayPrice);
billRouter.post('/record',isLogin,createRecord);
billRouter.post('/reset',isLogin,isRecordCreated,resetPrice);
billRouter.get("/monthlyPrice",isLogin,isRecordCreated,getMonthlyAmount);
billRouter.post("/todayamountlist",isLogin,isRecordCreated,addTodayPriceRecord);
billRouter.post("/amountlist",isLogin,isRecordCreated,getPriceRecordByDate);
billRouter.get("/me",isLogin,myProfile);









module.exports=billRouter;