const Products = require("../model/product")


const addProduct = async(req,res)=>{
    const {id} = req.params
    const {products} = req.body
    const findUser = await Products.findOne({userId:id})
    try{    
        let product = []
        for (let key of products)
            product.push(key)
        if(findUser){
            findUser.products.push.apply(findUser.products,product)
            await findUser.save()
            res.status(200).json(true)
        }else{
            const newProducts = new Products({
                userId:id,
                products:product
            })
            await newProducts.save()
            res.status(200).json(true)
        }
    }catch(error){
        throw new Error(error)
    }
}


const allProduct = async(req,res)=>{
    const {id} = req.params
    try{
        const user = await Products.findOne({userId:id})
        res.json(user.products)
    }
    catch(error){
        throw new Error(error)
    }
}


const getaProduct = async(req,res)=>{
    let {userId,productId} = req.body
    const user = await Products.findOne({userId:userId})
    try{
        let product = user.products.find(element => element._id == productId)
        res.json(product)
    }catch{
        res.json(false).end()
    }
}


const editProduct = async(req,res)=>{
    let {userId,productId,productBrend,productName,categories,count,color,price} = req.body
    const findUser = await Products.findOne({userId:userId})
    try{
        let object = findUser.products
        const qidiruv = object.findIndex(element => element._id == productId)
        console.log(findUser.products[qidiruv]);
        findUser.products[qidiruv] = {
            productBrend:productBrend,
            categories:categories,
            productName:productName,
            count:count,
            color:color,
            price:price
        }
        findUser.save()
        res.json(true).end()
    }catch{
        res.json("nomalum hatolik").end()        
    }
}



const deleteProduct = async (req,res)=>{
    try{
        let {userId,productId} = req.body
        const findUser = await Products.findOne({userId:userId})
        let object = findUser.products
        const score = object.findIndex(element => element._id == productId)
        findUser.products.splice(score,score+1)
        findUser.save()
        res.json(true)
    }catch(error){
        throw new Error(error)
    }

}


module.exports = {
    addProduct,
    allProduct,
    getaProduct,
    deleteProduct,
    editProduct
}