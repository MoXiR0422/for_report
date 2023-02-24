const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser  = require("body-parser")
const AuthRouter = require("./router/auth")
const ProductsRouter = require("./router/product")
const reportRouter = require("./router/sell")
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const passport = require('passport');
const userRouter = require("./router/user")
require('dotenv').config();


mongoose.connect("mongodb+srv://moxirbek:dilshodbek0422@cluster0.fp1t4.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("connect ot mongoose");
})
.catch((err)=>{
    console.log("wrong to connect mongoose");
})

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine","ejs")




app.use("/auth",AuthRouter)
app.use("/products",ProductsRouter)
app.use("/report",reportRouter)
app.use("/user",userRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("server is running");
})