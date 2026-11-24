
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

function Editblog() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()

    async function getBlog() {
        try {
            const token = localStorage.getItem("token")

            const response = await axios.get(
                `http://localhost:5550/api/blog/myblogs`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const blog = response.data.blogs.find(
                (item) => item._id === id
            )

            if (blog) {
                setTitle(blog.title)
                setDescription(blog.description)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBlog()
    }, [])

    async function handleUpdate(event) {
        event.preventDefault()

        try {
            const token = localStorage.getItem("token")

            const response = await axios.put(
                `http://localhost:5550/api/blog/editblog/${id}`,
                {
                    title,
                    description
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.data.success) {
                alert("Blog updated successfully")
                navigate("/dashboard")
            }

        } catch (error) {
            console.log("Update error:", error)
        }
    }

    return (
        <div>
            <h1>Edit Blog</h1>

            <form onSubmit={handleUpdate}>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                />

                <br />

                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                />

                <br />

                <button type="submit">
                    Update Blog
                </button>

            </form>
        </div>
    )
}

export default Editblog
