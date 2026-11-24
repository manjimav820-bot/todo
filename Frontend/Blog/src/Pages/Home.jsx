
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function Home() {

    const navigate = useNavigate()

    const [blogs, setBlogs] = useState([])

    async function getblogs() {
        try {
            const response = await axios.get("http://localhost:5550/api/blog/getblogs")

            console.log("Fetched blogs:", response.data)

            setBlogs(response.data.blogs)

        } catch (error) {
            console.log("Error fetching blogs:", error)
        }
    }

    useEffect(() => {
        getblogs()
    }, [])

    return (
        <div>

            <h1>Welcome to the Blog</h1>

            <div >
                <button onClick={() => navigate('/Login')}>Login</button>
                <button onClick={() => navigate('/Register')}>Register</button>
            </div>

            <nav >
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/Login')}>Add Blog</button>
            </nav>

            <div className='blog-list'>

                {blogs.length > 0 ? (

                    blogs.map((blog) => (
                        <div key={blog._id} className='blog-card'>

                            <h2>{blog.title}</h2>

                            <p>{blog.description}</p>

                            <p>Author: {blog.author}</p>

                        </div>
                    ))

                ) : (
                    <p>No blogs available</p>
                )}

            </div>

        </div>
    )
}

export default Home
