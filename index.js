const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const billRouter = require("./routes/billoutes");
require("dotenv").config();
const connectToDb = require("./Config/dbDriver");
const userRouter = require("./routes/user");

const app=express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
//"https://mybillsapp.netlify.app"
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}))

app.use(cookieParser());
connectToDb();

app.use('/api/v1/bill',billRouter);
app.use("/api/v1/user",userRouter)




app.listen(3000,()=>{
    console.log("server is up");

})