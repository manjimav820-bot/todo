import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function Dashboard() {

    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()

    async function getMyBlogs() {
        try {
            const token = localStorage.getItem("token")

            const response = await axios.get(
                "http://localhost:5550/api/blog/myblogs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setBlogs(response.data.blogs)

        } catch (error) {
            console.log("Error fetching blogs:", error)
        }
    }

    useEffect(() => {
        getMyBlogs()
    }, [])

   
    function handleEdit(blogId) {
        navigate(`/editblog/${blogId}`)

    }
    async function handleDelete(blogId) {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
        return;
    }

    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(
            `http://localhost:5550/api/blog/deleteblog/${blogId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.data.success) {
            alert("Blog deleted successfully!");
            getMyBlogs();
        }

    } catch (error) {
        console.log("Delete error:", error);
        console.log(error.response?.data);
    }
}
    return (
        <div>
            <h1>My Dashboard</h1>

            <button onClick={() => navigate("/addblog")}>
                Add Blog
            </button>

            <br></br>
            <h2>My Blogs</h2>
         <div className='blog-list'>
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                   
                    <div key={blog._id} className='blog-card'>
                        <h3>{blog.title}</h3>
                        <p>{blog.description}</p>
                        <p>Author: {blog.author || "Unknown"}</p>
                           <button onClick={() => navigate(`/editblog/${blog._id}`)}>edit</button>
                                  <button onClick={() => handleDelete(blog._id)}>delete</button>
                    </div>
                    
                ))
            ) : (
                <p>You haven't added any blogs yet.</p>
            )}
           
             </div>
         
           <button onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    )
}
    
export default Dashboard