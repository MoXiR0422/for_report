const router = require("express").Router();
const passport = require("passport")
const {
    registration,
    login,
    forgetPassword,
    changePassword,
    allUser,
    findUser,
    deleteUser,
    changeUser,
    googleAuth
} = require("../controller/userCtrl");



router.post("/registration",registration)
router.post("/login",login)
router.post("/forgetPassword",forgetPassword)
router.post("/changePassword",changePassword)
router.get("/getAllUser",allUser)
router.get("/getaUser",findUser)
router.delete("/deleteaUser/:id",deleteUser)
router.put("/change/:id",changeUser)
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))
router.get('/google/secrets', passport.authenticate('google'), googleAuth)



module.exports = router