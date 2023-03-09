const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
    userId:String,  
    products:[{
        productBrend:{type:String},
        productName:{type:String},
        categories:{type:String},    
        count:{type:Number},
        color:{type:String},
        desc:{type:String},
        price:{type:Number},
    }]
})
module.exports = mongoose.model("Products",Schema)
