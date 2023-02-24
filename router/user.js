const router = require("express").Router()
const Auth = require("../model/auth")

router.get("/allUser",async(req,res)=>{
    try{
        const user = await Auth.find()
        if(user){
            res.json(user).end
        }else{
            res.json("users not found").end
        }
    }catch{
        res.json("server bilan hatolik").end
    }
})

router.get("/findUser",async(req,res)=>{
    try{
        const user = await Auth.findOne({username:req.body.username})
        user ? res.json(user).end : res.json("user not found")
    }catch{
        res.json("server bilan hatolik").end        
    }
})


router.delete("/delete/:id",async(req,res)=>{
    try{
        const user = await Auth.findByIdAndDelete(req.params.id)
        res.json("success").end
    }catch{
        res.json("server bilan hatolik").end
    }
})




router.put("/change/:id",async(req,res)=>{
    try{
        const user = await Auth.findById(req.params.id)
        if(user){
            user.username = req.body.username,
            user.save()
            res.json("changed").end            
        }else{
            res.json("user not found").end
        }
    }catch{
        res.json("server bilan hatolik").end
    }    
})



module.exports = router