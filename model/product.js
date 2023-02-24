const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
    userId:String,
    products:[{
        productName:String,
        categories:String,
        size:[{
            name:String,
            count:Number
        }],
        price:Number,
        allCount:Number
    }]
})
module.exports = mongoose.model("Products",Schema)