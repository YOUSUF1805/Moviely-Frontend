import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import bgImage from "../assets/images/bg3.jpg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  // const res = await fetch("http://localhost:5000/api/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password }),
  // });

  // const data = await res.json();

  // if (!res.ok) return alert(data.message);
  // localStorage.setItem("isLoggedIn", "true");
  // localStorage.setItem("user", JSON.stringify(data.user));
  
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem(
    "user",
    JSON.stringify({ name: email.split("@")[0] })
  );
  navigate("/");
};

  return (
    <div className='min-h-screen flex items-center justify-center bg-cover bg-center relative brightness-90 contrast-125' 
    style={{backgroundImage: `url(${bgImage})`}}>
      <div className="relative bg-white/90 p-8 rounded-2xl shadow-lg w-96">
        <h2 className='text-3xl text-black font-bold text-center mb-6'>Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5 text-black">
          <div>
          <label className='block text-sm font-medium mb-1'>Email</label>
          <input 
          type='email' 
          required 
          value={email} 
          onChange={(e)=>{setEmail(e.target.value)}} 
          placeholder='Enter Your Email' 
          className='w-full p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-black'/>
          </div>
          <div>
           <label className='block text-sm font-medium mb-1'>Password</label>
           <div className='relative'>
           <input
           type={showPassword?"text":"password"}
           required
           value={password}
           onChange={(e)=>{setPassword(e.target.value)}}
           placeholder='Enter your Password'
           className='w-full p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-black'/>
           <button 
           type='button' 
           onClick={()=>{setShowPassword(!showPassword)}}
           className='absolute right-4 top-3 text-gray-500'>
            {showPassword?<EyeOff size={20}/>:<Eye size={20}/>}
           </button>
          </div>
          </div>
          <button 
          type='submit' 
          className='w-full bg-black text-white p-3 rounded-xl text-lg font-semibold hover:bg-gray-800 transition'>
            Login
          </button>
        </form>
        <p className='text-center mt-4 text-gray-600'>
          Don't have an Account?<Link to='/signup' className='text-blue-600 hover:text-blue-800 font-semibold'>Signup</Link>
        </p>
      </div>
    </div>
  )
}

export default Login