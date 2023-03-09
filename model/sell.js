const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
    userId:String,
    allSellProducts:[{
        productBrend:String,
        productName:String,
        categories:String,
        price:String,
        count:Number,
        date:Array,
        debit:Number
    }]
})

module.exports = mongoose.model("SellProduct",Schema)