
import axios from 'axios'
import {useState} from 'react'
import {useNavigate } from 'react-router-dom'

export default function Login(){

    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const navigate=useNavigate()

    async function handleLogin(event){
        event.preventDefault()

        try{
            const response=await axios.post("http://localhost:5550/api/auth/login",{
                email:email,
                password:password
            })

            if (response.data.success) {

                localStorage.setItem("token", response.data.token)
                localStorage.setItem("userid", response.data.userid)
                localStorage.setItem("name",response.data.name)

                setemail("")
                setpassword("")

                alert("Login successful")
                navigate("/viewblog", { replace: true })
            }
            else
            {
                alert("invalid credentials")
            }

        } catch(error) {
            const message = error.response?.data?.message

            if (error.response?.status === 401) {
                alert(message || "Invalid credentials. Please try again.")
            } else {
                alert(message || "Unable to log in. Please try again.")
            }
        }
    }

    return(
        <div>
            <h1>LOGIN</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="enter email" value={email} onChange={(e)=>setemail(e.target.value)}/><br/>
                <input type="password" placeholder="enter password" value={password} onChange={(e)=>setpassword(e.target.value)}/><br/>
                <button type="submit">Login</button>
                <button type="button" onClick={() => navigate("/Register")}> Register
</button>
            </form>
        </div>
    )
}
