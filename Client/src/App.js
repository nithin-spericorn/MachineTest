
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Message from './Components/Message';

import MainHeader from './Components/MainHeader';

import Home from './Pages/Home';
import {Login} from './Pages/Login';
import Register from './Pages/Register';
import jwt from "jsonwebtoken"




function App() {

  const [showLogin,setLogin]=useState(true)

  const token=useSelector(state=>state.user.currentUser);
  
  var decoded = jwt.decode(token);
 let isAdmin
  
  if(decoded){
    isAdmin=decoded.isAdmin
  }
  const closeLogin=()=>{
    setLogin(false)
   }
  return (
  
      <Router>
        
      <MainHeader/>
       <Switch>
       <Route exact path="/" component={Home}/>
       
       
       <Route exact path="/login">
          
           {token?<Message/>:<Login/>}
         
       </Route>
         
       <Route exact path="/register">
       <Register/>
       </Route>
       
       <Route exact path="/c">
       <Message/>
       </Route>
      
    
      
       </Switch>
    </Router>
  );
}

export default App;