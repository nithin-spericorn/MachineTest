import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { login } from '../redux/apiCall';

import {mobile} from "../Responsive";
import {Link} from 'react-router-dom'
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: 
    url("https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?cs=srgb&dl=pexels-quark-studio-2507007.jpg&fm=jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color:green;
    cursor:not-allowed;
  }
`;

const Linkdiv = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error=styled.span`
color:red;
`;

export const Login = () => {
  
  const dispatch=useDispatch()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {isFetching,error}=useSelector(state=>state.user)
 const user=useSelector(state=>state.user.currentUser)
 
  
  
  const HandileClick =(e)=>{
e.preventDefault();

login(dispatch,{email,password})
console.log(email,password)


  }
   /* return (
      <Hero>
        <Container>
            <Wrapper>
                <Form>
                <Title>Login To an Account</Title>
                
                <Input placeholder="email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
              
                <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
               
                
          <Button onClick={HandileClick} disabled={isFetching}>Login</Button>
          {error&&<Error>Something Went wrong..</Error>}
          <Linkdiv>DO NOT YOU REMEMBER THE PASSWORD?</Linkdiv>
          <Linkdiv><Link to="/register">CREATE A NEW ACCOUNT</Link></Linkdiv>
                </Form>
            </Wrapper>
            
        </Container>
        </Hero>
    )*/
    return(
      <Hero>
        <Banner
          title="Login"
          subtitle="login to your Account"
        >
        <form type="submit">
        <Input placeholder="email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
              
        <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
              <Button onClick={HandileClick} >Login</Button>
        </form>
        </Banner>
      </Hero>
    )
}
