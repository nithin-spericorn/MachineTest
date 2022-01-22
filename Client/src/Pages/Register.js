import { setUseProxies } from '@reduxjs/toolkit/node_modules/immer'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Banner from '../Components/Banner'
import Hero from '../Components/Hero'
import { publicRequest } from '../requestMethods'

const Register = () => {
    const [message,setMessage]=useState("")
    const [name,setName]=useState("")
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const dispatch=useDispatch()
    const [details,setDetails]=useState()
   
   console.log(name,email,password)
   
    const submitHandler=(event)=>{
     event.preventDefault();
     
     
        setDetails(name,email,password)
        console.log(details,"d")
       
     }
   
      
    
    
    

   
    useEffect(()=>{
     
        const Res= async ()=>{
          try{
            
            const res = await publicRequest.post("user/sign-up",{name,email,password})
            console.log("hhhh")
            console.log(res.data)
            setMessage(res.data.message)
            console.log(message)
            setName("")
            setEmail("")
            setPassword("")
          }catch(err){
            console.log("kkkk")
          }
        }
        Res()
      },[details])
      

      const nameChangeHandler=(event)=>{
        
       setName(event.target.value)
      }
      const emailChangeHandler = (event) => {
       
        setEmail(event.target.value);
    
      };
    
      const passwordChangeHandler = (event) => {
        
        setPassword(event.target.value); 
      };
    
  
    return (
        <Hero>
            <Banner
          title="Register"
          subtitle="Create Your Account"
        >
            <form>
            <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={nameChangeHandler}
          />
            <label>Email</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
           
          />
            <label>Password</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
           
          />
            <button onClick={submitHandler} >SUBMIT</button>
            </form>
            {message &&  <section>{message}</section>}
            
            
         
        </Banner>
        
        </Hero>
    )
}

export default Register
