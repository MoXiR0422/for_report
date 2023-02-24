const router = require("express").Router()
const Products = require("../model/product")


router.post("/addProduct/:id",async(req,res)=>{
    try{
        let sizes=[]
        for(let i=0;i<req.body.size.length;i++){
            let ma={
                name:req.body.size[i].name,
                count:req.body.size[i].count
            }
            sizes.push(ma)
        }
        const user = await Products.findOne({userId:req.params.id})
        if(user){
            const newProduct = {
                productName:req.body.productName,
                categories:req.body.categories,
                size:sizes,
                price:req.body.price,
                allCount:req.body.allCount
            }
            await user.products.push(newProduct)
            user.save()
            res.status(200).json(true).end
        }else{
            const newProducts = new Products({
                userId:req.params.id,
                products:{
                    productName:req.body.productName,
                    categories:req.body.categories,
                    size:[{
                        name:req.body.name,
                        count:req.body.count
                    }],
                    price:req.body.price,
                    allCount:req.body.allCount
                }
            })
            await newProducts.save()
            res.status(200).json(true).end
        }
    }catch{
        res.json("nomalum hatolik").end()
    }
})


router.get("/allProduct/:id",async(req,res)=>{
    try{
        const user = await Products.findOne({userId:req.params.id})
        res.json(user.products).end
    }
    catch{
        res.json("nomalum hatolik").end()
    }
})





// soroq ostida


router.get("/viewProduct/:id",async(req,res)=>{
    try{
        let useri = req.body.userId
        const user = await Products.findOne({userId:useri})
        let object = user.products
        const qidiruv = object.findIndex(element => element._id == req.params.id)
        res.json(user.products[qidiruv]).end
    }catch{
        res.json(false).end()
    }
})



router.put("/editProduct/:id",async(req,res)=>{
    try{
        let useri = req.body.userId
        const user = await Products.findOne({userId:useri})
        let object = user.products
        const qidiruv = object.findIndex(element => element._id == req.params.id)
        user.products[qidiruv] = {
            productName:req.body.productName,
            categories:req.body.categories,
            size:[{
                name:req.body.name,
                count:req.body.count
            }],
            price:req.body.price,
            allCount:req.body.allCount
        }
        user.save()
        res.json(true).end()
    }catch{
        res.json("nomalum hatolik").end()        
    }
})



router.delete("/deleteProduct/:id",async(req,res)=>{
    let useri = req.body.userId
    const user = await Products.findOne({userId:useri})
    let object = user.products
    const qidiruv = object.findIndex(element => element._id == req.params.id)
    user.products.splice(qidiruv,qidiruv+1)
    user.save()
    res.end()
})




module.exports = router