const nodemailer = require("nodemailer");
let password=""
const sendMessage = (email) =>{
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
    return true;
}
module.exports = sendMessage