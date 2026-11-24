const router = require("express").Router()
const blogcontrollers = require("../controllers/blogcontrollers")
const authmiddleware = require("../middlewares/authmiddleware")


router.get("/getblogs", blogcontrollers.getblogs)


router.post("/addblog", authmiddleware, blogcontrollers.addBlog)
router.get("/myblogs", authmiddleware, blogcontrollers.getMyBlogs)
router.put("/editblog/:id", authmiddleware, blogcontrollers.editBlog)
router.delete("/deleteblog/:id", authmiddleware, blogcontrollers.deleteBlog)

module.exports = router