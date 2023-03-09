const mongoose = require("mongoose")
const dbConnect = () => {
    mongoose.set('strictQuery',false)
    mongoose.connect("mongodb://127.0.0.1:27017/report")
    .then(()=>{
        console.log("connect ot mongoose");
    })
    .catch((err)=>{
        console.log("wrong to connect mongoose");
    })
}
module.exports = dbConnect