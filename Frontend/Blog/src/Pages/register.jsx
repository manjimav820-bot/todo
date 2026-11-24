
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Register() {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate()

    async function handleRegister() {
        try {
            const res = await axios.post("http://localhost:5550/api/auth/register", {
                name: name,
                email: email,
                password: password
            })

            setname("")
            setemail("")
            setpassword("")

            alert("User has been registered successfully")
            navigate("/login")
        }
        catch (error) {
            console.error("Error registering user:", error)
            alert("Error registering user")
        }
    }

    return (
        <div className="register">
            <h1>REGISTER page</h1>

            <input type="text" placeholder="username" value={name}
                onChange={(e) => setname(e.target.value)} /><br />

            <input type="email" placeholder="email" value={email}
                onChange={(e) => setemail(e.target.value)} /><br />

            <input type="password" placeholder="password" value={password}
                onChange={(e) => setpassword(e.target.value)} /><br />

            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default Register
