import styled from "styled-components";
import React, { useEffect, useState } from 'react'
//import {categories} from "../data"
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken"



/*const Container=styled.div`
display:flex;
padding:20px;
justify-content: space-between;
`;
const sdiv=styled.div`
flex:1;
justify-content:space-between;`;

const adiv=styled.div`
flex:1;
justify-content:space-between;`;*/
const Container=styled.div`
display:flex;
padding:20px;
flex-wrap: wrap;
flex-direction:column;
justify-content:space-between;`;
const Img=styled.img`
height:8rem;
`;


const Message = () => {
    const [Message,setMessage]=useState("")
    const [Value,setValue]=useState("")
    const [show,setShow]=useState(false)
    const [responseMessage,setResponse]=useState([])
    const [editedValue,setNewValue]=useState()
    const [view,setView]=useState(true)
    const [Id,setId]=useState()
    const [s,setS]=useState(true)
    const token=useSelector(state=>state.user.currentUser);
    var decoded = jwt.decode(token);
    let email=decoded.email;
    useEffect(async()=>{
        if(s===true){
          const res=await publicRequest.get("/user/display")
          console.log("final message",res.data.message)
          setResponse(res.data.message)
        }
    },[])

    useEffect(async()=>{ 
        if(Message!==""){
       const res=await publicRequest.post(`/user/createmsg`,{message:Value})
        
       setShow(true)
       console.log(res)
       setResponse(res.data.message)
       setMessage("")
        }
        
    },[Value])
    
    const enable=()=>{
        setView(true)
    }
    const disable=()=>{
        setView(false)
    }

    const showMessage=(e)=>{
        setMessage(e.target.value)
        console.log(Message)
    }
   
   const deletemsg=async(id)=>{
    console.log("id",id)
    const res=await publicRequest.delete(`/user/d?id=${id}`)
    console.log("deleted",res.data.message)
    setValue(res.data.message)
   }
   const editmsg=async(id)=>{
    setId(id)
    console.log("id",id)
    const res=await publicRequest.get(`/user/msg?id=${id}`)
    console.log(res.data.message.message)
    setMessage(res.data.message.message)
    setView(false)
   }
   const update=async()=>{
       console.log(Id,Message)
       const res=await publicRequest.put(`/user/msg?id=${Id}&message=${Message}`)
       console.log(res.data.message.message)
       setValue(res.data.message.message)
       setView(true)
       
   }

    return (
       <>
        <Container>

<sdiv>     <h2>welcome {email}</h2>
           <h1>Generate your message  </h1>
           <input type="text" value={Message} onChange={showMessage}/>
           {view ? <button onClick={()=>setValue(Message)}>Ok</button>:<button onClick={update}>update</button>}
           </sdiv>
          
          {responseMessage.map((item)=>(
            
            <div>
        <div>
          <h1>{item.message}</h1>
        </div>
        <button onClick={()=>editmsg(item.message_id)}  className="btn-primary" key={item.message_id}>
          Edite
        </button>
        <button onClick={()=>deletemsg(item.message_id)}  className="btn-primary" key={item.message_id}>
          Delete
          </button>
    </div>
    ))}
      
   
    
        </Container>
        <Container>
         NB:Delete functionality working in backend but in front end i 
         not more confortable in frontend withh react js<br></br>
         but it effect when you again login
        </Container>
        </>
    )
}

export default Message