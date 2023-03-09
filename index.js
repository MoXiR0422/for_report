const express = require("express")
const app = express()
const bodyParser  = require("body-parser")
const UserRouter = require("./router/user")
const ProductsRouter = require("./router/product")
const reportRouter = require("./router/sell")
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const dbConnect = require("./config/dbconnect")
dbConnect()


app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());



app.use("/api/user",UserRouter)
app.use("/api/products",ProductsRouter)
app.use("/api/sell",reportRouter)


const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log("server is running");
})