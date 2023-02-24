const router = require("express").Router();
const Auth = require("../model/auth");
const nodemailer = require("nodemailer");
const passport = require("passport")
let password="",userEmail=""
router.post("/registration",async(req,res)=>{
    const userfind = await Auth.findOne({username:req.body.username})
    if(!userfind){
        const user = new Auth({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        })
        await user.save()
        res.status(200).json(true).end
    }else{
        res.json("This username is already in use").end
    }
})
router.post("/login",async(req,res)=>{
    const user = await Auth.findOne({username:req.body.username})
    if(user && user.password === req.body.password){
        res.json(user).end
    }else{
        res.json(false).end
    }
})
router.post("/forget",async(req,res)=>{
    const email = req.body.email
    userEmail = email
    for(let index=1;index<=6;index++){
        var c=Math.floor(Math.random()*6)
        password+=c
    }
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'restart.parol@gmail.com',
            pass: 'olohjtdhjrwhyijb'
        }
    });  
    var mailOptions = {
        from: 'restart.parol@gmail.com',
        to: `${email}`,
        subject: 'Restart Password',
        text:`${password}`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
    res.json(true).end()
})
router.post("/veryfiy",async(req,res)=>{
    if(req.body.password == password){
        res.json(true).end()
    }else{
        res.json(false).end
    }
})
router.post("/change",async(req,res)=>{
    const user = await Auth.findOne({email:userEmail})
    user.password = req.body.password
    user.save()
    res.json(true).end
})
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))
//Google callback route
router.get('/google/secrets', passport.authenticate('google'), (req, res) => {
    // if authentication is successfully 
    const user = require("../config/passport-setup")
    res.json(user).end; 
})
module.exports = router