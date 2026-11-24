const mongoose=require("mongoose")

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
  author: {
    type: String
},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Blog=mongoose.model("Blog",blogSchema)

module.exports=Blog