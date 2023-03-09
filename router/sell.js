const router = require("express").Router()
const sellProduct = require("../controller/sellCtrl")

router.post("/sellBasket",sellProduct)

module.exports = router