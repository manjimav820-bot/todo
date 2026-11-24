const router=require("express").Router()
const authcontrollers=require("../controllers/authcontrollers")

router.post("/register",authcontrollers.registerUser)
router.post("/login",authcontrollers.loginUser)

module.exports=router