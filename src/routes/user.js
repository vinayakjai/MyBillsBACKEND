const app=require("express");
const { login, register, logout } = require("../controllers/user");

const userRouter=app.Router();

userRouter.post('/login',login);
userRouter.post('/register',register);
userRouter.get('/logout',logout);


module.exports=userRouter;