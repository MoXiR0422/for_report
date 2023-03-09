const router = require("express").Router()
const {
    addProduct,
    allProduct,
    getaProduct,
    deleteProduct,
    editProduct
} = require("../controller/productCtrl")

router.post("/addProduct/:id",addProduct)
router.get("/allProduct/:id",allProduct)
router.post("/getaProduct",getaProduct)
router.put("/editProduct",editProduct)
router.delete("/deleteProduct/",deleteProduct)

module.exports = router