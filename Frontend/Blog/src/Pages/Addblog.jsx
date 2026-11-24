
import axios from 'axios'
import {useState} from 'react'
import {useNavigate } from 'react-router-dom'

export default function Addblog(){

    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [author,setAuthor]=useState("")
    const navigate=useNavigate()

    async function handleAddBlog(event){
        event.preventDefault()

        try{
            const token = localStorage.getItem("token")
            const author=localStorage.getItem("name")
            const blogData = {
                title,
                   description,
                 author
                };


            const response=await axios.post("http://localhost:5550/api/blog/addblog",
                blogData,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("Add Blog Response:", response.data)

            if(response.data.success){
                setTitle("")
                setDescription("")
                setAuthor("")

                alert("Blog added successfully")
                navigate('/dashboard')
            }

        }catch(error){
    console.log("Error:", error)
    console.log("Server response:", error.response?.data)
}
    }

    return(
        <div>
            <h1>Add Blog</h1>
            <form onSubmit={handleAddBlog}>
                <input type="text" placeholder="enter title" value={title} onChange={(e)=>setTitle(e.target.value)}/><br/>
                <input type="text" placeholder="enter description" value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>

                <button type="submit">Add Blog</button>
            </form>
        </div>
    )
}
