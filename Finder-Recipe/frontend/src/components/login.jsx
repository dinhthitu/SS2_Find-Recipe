import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";

const Login = () => {

    const[email, setEmail] = useState();
    const[password, setPassword] = useState();

  return (
    <div className = "bg-white flex items-center justify-center min-h-screen ">
        <div className = "w-full max-w-sm bg-white border border-gray-200 p-8 rounded-xl shadow-md flex flex-col">
            <h1 className = "text-3xl text-center font-semibold mb-1">Login</h1>
            <span className = "text-sm text-gray-400 text-center mt-2"> Welcome to out website</span>
            <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
            </div>

            <form className = "space-y-4">
                <p className = "text-gray-500 text-left mb-1">Email</p>
                <input type="email"
                placeholder = "a@gmail.com"
                className = "w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-600" />
                <p className = "text-gray-500 text-left mb-1">Password</p>
                <input type="password"
                placeholder = "******"
                className = "w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-600" />
            </form>

            <button className = "border rounded-full w-full py-2 px-4 mt-4 bg-green-700 text-white font-semibold cursor-pointer hover:bg-green-600 transition">Continue</button>

            <span className = "text-gray-400 font-normal text-center mt-5">No account? <Link to="/signup" className = "text-green-700 font-medium" >Create an account</Link></span>
        </div>
       
        
    </div>
  )
}

export default Login