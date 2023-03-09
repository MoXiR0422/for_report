const Auth = require("../model/auth");
const sendMessage = require("../config/nodemailer")


const registration =async(req,res)=>{
    const {username} = req.body
    const userfind = await Auth.findOne({username:username})
    try{
        if(!userfind){
            const user = await Auth.create(req.body)
            res.status(200).json(true)
        }else{
            res.json("This username is already in use").end
        }
    }
    catch(error){
        throw new Error(error)
    }
}


const login = async(req,res)=>{
    const {username,password} = req.body
    const user = await Auth.findOne({username:username})
    try{
        if(user && user.password === password){
            res.json(user).end
        }else{
            res.json(false).end
        }
    }catch(error){
        throw new Error(error)
    }
}


const forgetPassword = async (req,res)=>{
    const { email } = req.body
    let sendMsg = await sendMessage(email)
    try{
        sendMsg ? res.json(true).end() : res.json(false).end()
    }catch(error){
        throw new Error
    }
}


const changePassword = async(req,res)=>{
    const {email,password} = req.body
    const user = await Auth.findOne({email:email})
    try{
        user ? user.password = password : user.password
        user.save()
        res.json(true).end
    }catch(error){
        throw new Error(error)
    }

}


const allUser = async(req,res)=>{
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
}


const findUser = async(req,res)=>{
    const { username } = req.body
    try{
        const user = await Auth.findOne({username:username})
        user ? res.json(user) : res.json("user not found")
    }catch{
        res.json("server bilan hatolik").end        
    }
}


const deleteUser = async(req,res)=>{
    try{
        const user = await Auth.findByIdAndDelete(req.params.id)
        res.json("success").end
    }catch{
        res.json("server bilan hatolik").end
    }
}


const changeUser = async(req,res)=>{
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
}


const googleAuth = async(req,res) => {
    const user = require("../config/passport-setup")
    const userGoogle ={
        username:user.username,
        googleId:user.googleId
    }
    // await Auth.create(userGoogle)
    console.log(userGoogle); 
}


module.exports = {
    registration,
    login,
    forgetPassword,
    changePassword,
    allUser,
    findUser,
    deleteUser,
    changeUser,
    googleAuth
}