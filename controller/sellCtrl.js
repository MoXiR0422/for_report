const SellProduct = require("../model/sell")
const sellTime = require("../config/time")

const sellProduct = async(req,res) => {
    let clock = sellTime()
    const {userId,sellProducts} = req.body
    const userSale = await SellProduct.findOne({userId:userId})
    sellProducts.map(elem => elem.date=clock)
    try{
        if(userSale){
            userSale.allSellProducts.push(...sellProducts)
            await userSale.save()
            res.json(true)
        }else{
            let sale = {
                userId:userId,
                allSellProducts:sellProducts
            }
            await SellProduct.create(sale)
            res.json(true)
        }
    }catch(error){
        throw new Error(error)
    }
}


module.exports = sellProduct