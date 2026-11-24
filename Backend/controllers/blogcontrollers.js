
const Blog = require("../models/Blog");
const User= require("../models/User");
// Add new blog
const addBlog = async (req, res) => {
    try {
        const { title, description } = req.body;

       const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const blog = new Blog({
            title,
            description,
            author: user.name,
            userId: req.userId
        });

        await blog.save();

        res.status(201).json({
            success: true,
            message: "Blog added successfully",
            blog
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding blog");
    }
};


// Get all blogs
const getblogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ _id: -1 });

        res.status(200).json({
            success: true,
            blogs
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching blogs");
    }
};
const getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ userId: req.userId });

        res.status(200).json({
            success: true,
            blogs
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching your blogs");
    }
};
const editBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        console.log("Blog ID:", id);
        console.log("User ID:", req.userId);

        const blog = await Blog.findOne({
            _id: id,
            userId: req.userId
        });

        console.log("Found Blog:", blog);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        blog.title = title;
        blog.description = description;

        await blog.save();

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating blog");
    }
};
const deleteBlog=async(req,res)=>{
    try{
        const blogId=req.params.id
        const blog = await Blog.findByIdAndDelete(blogId);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting blog");
    }
};


module.exports = { addBlog, getblogs,getMyBlogs, editBlog, deleteBlog };

