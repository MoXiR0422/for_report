const router = require("express").Router()
const Buxgaltery = require("../model/buxgaltery")
const Products = require("../model/product")


router.post("/sellBasket/:id",async(req,res)=>{
    let vaqt =new Date()
    let clock=[vaqt.getUTCFullYear(),vaqt.getMonth()+1,vaqt.getDate(),vaqt.getHours(),vaqt.getMinutes,vaqt.getDay()]
    const productsId = req.body.productsId
    const ombor = await Buxgaltery.findOne({userId:req.params.id})
    const user = await Products.findOne({userId:req.params.id})
    let object = user.products
    for(let i=0;i<productsId.length;i++){
        console.log("kelitti");
        const qidiruv = object.findIndex(element => element._id == productsId[i].productId)    
        console.log(qidiruv);
        let debit = user.products[qidiruv].price*productsId[i].count
        if(ombor){
            let sell = {
                productName:productsId[i].productName,
                size:productsId[i].size,
                price:user.products[qidiruv].price,
                count:productsId[i].count,
                debit:debit,
                date:clock
            }
            ombor.alldebit = ombor.alldebit + debit
            ombor.allSellProduct.push(sell)
            ombor.save()
            res.json(true).end
        }else{
            const newUser= new Buxgaltery({
                userId:req.params.id,
                allSellProduct:[{
                    productName:productsId[i].productName,
                    size:productsId[i].size,
                    price:user.products[qidiruv].price,
                    count:productsId[i].count,
                    debit:debit,
                    date:clock
                    }],
                alldebit:user.products[qidiruv].price*productsId[i].count
            })
            await newUser.save()
            res.end()
}
    }
    // products:[
    //     {productId:id ,size,count:number},
    //     {productId:id ,size,count:number},
    //     {productId:id ,size,count:number},
    //     {productId:id ,size,count:number},
    // ]
})



router.post("/sell/:id",async(req,res)=>{
    let vaqt =new Date()
    let clock=[vaqt.getUTCFullYear(),vaqt.getMonth()+1,vaqt.getDate(),vaqt.getHours(),vaqt.getMinutes,vaqt.getDay()]
    const productId = req.body.productId
    const ombor = await Buxgaltery.findOne({userId:req.params.id})
    const user = await Products.findOne({userId:req.params.id})
    let object = user.products
    const qidiruv = object.findIndex(element => element._id == productId)
    let debit = user.products[qidiruv].price*req.body.count
    if(ombor){
        let sell = {
            productName:user.products[qidiruv].productName,
            size:req.body.size,
            price:user.products[qidiruv].price,
            count:req.body.count,
            debit:user.products[qidiruv].price*req.body.count,
            date:clock
        }
        ombor.alldebit = ombor.alldebit + debit
        ombor.allSellProduct.push(sell)
        ombor.save()
        res.json(true).end
    }else{
        const newUser= new Buxgaltery({
            userId:req.params.id,
            allSellProduct:[{
                productName:user.products[qidiruv].productName,
                size:req.body.size,
                price:user.products[qidiruv].price,
                count:req.body.count,
                debit:debit,
                date:clock
            }],
            alldebit:user.products[qidiruv].price*req.body.count
        })
        console.log(user.products[qidiruv].price);
        await newUser.save()
        res.end()
    }
})



router.post("/reportDay/:id" , async(req,res)=>{
    let vaqt = new Date()
    let month = vaqt.getMonth()+1
    let day = vaqt.getDate()
    const user = await Buxgaltery.findOne({userId:req.params.id})
    let ol=[],debit = 0,count=0
    if(user){
        let obj = user.allSellProduct
        const result = obj.map(key => {if(key.date[1] === month && key.date[2] === day){
            ol.push(key)
            debit += key.debit 
            count += key.count           
        }})
        let info = {
            debitDay:debit,
            count:count,
            sellProduct:ol
        }
        res.json(info).end
    }else{
        res.json("sell not yet the day").end
    }
})
router.post("/reportMonth/:id",async (req,res)=>{
    let vaqt = new Date()
    let month = vaqt.getMonth()+1
    let year = vaqt.getFullYear()
    const user = await Buxgaltery.findOne({userId:req.params.id})
    let ol=[],debit = 0,count=0
    if(user){
        let obj = user.allSellProduct
        const result = obj.map(key => {if(key.date[0] === year && key.date[1] === month){
            ol.push(key)
            debit += key.debit 
            count += key.count           
        }})
        let info = {
            monthDebit:debit,
            count:count,
            sellProduct:ol
        }
        res.json(info).end
    }else{
        res.json("sell not yet the day").end
    }
})

router.post("/reportYear/:id",async (req,res)=>{
    let vaqt = new Date()
    let year = vaqt.getFullYear()
    const user = await Buxgaltery.findOne({userId:req.params.id})
    let ol=[],debit = 0,count=0
    if(user){
        let obj = user.allSellProduct
        const result = obj.map(key => {if(key.date[0] === year){
            ol.push(key)
            debit += key.debit 
            count += key.count           
        }})
        let info = {
            monthDebit:debit,
            count:count,
            sellProduct:ol
        }
        res.json(info).end
    }else{
        res.json("sell not yet the day").end
    }
})


module.exports = router