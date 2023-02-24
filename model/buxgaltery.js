const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
    userId:String,
    allSellProduct:[{
        productName:String,
        size:Array,
        price:String,
        count:Number,
        date:Array,
        debit:Number
    }],
    alldebit:Number
})

module.exports = mongoose.model("bugaltery",Schema)