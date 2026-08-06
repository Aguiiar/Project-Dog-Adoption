import React, {useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import "./Nav.css"
import dogLog from "../assets/logo-dog.png"
import { getLogginUser } from '../services/Api';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Nav = () => {


  
  const [userName, setUserName] = useState("");

  
  const navigate = useNavigate();
  const [token, setToken] = useState(false);

  
  
  
  const handleVerifyToken = async() =>{
    const token = localStorage.getItem("token");

    if(token === null){
      setToken(false);
    }else{
      setToken(true);
    }
  }

  
  const handLogoff = async ()=>{
    localStorage.removeItem("token");
    navigate("/Login")
  }




useEffect(() =>{
  const loadUser = async () =>{
    try{
      const user = await getLogginUser();
      setUserName(user.nome);
    }catch(error){
      console.log(error.message);
    }
  }
  handleVerifyToken();
  loadUser();
},[]);


  
  
  
  
  
  
  
 
  return (
    <nav className='navbar navbar-expand-md bg-light'>
      <div className="container-fluid">
    <img src={dogLog} alt='dog' width="64" height="64"/>
    <button
  className="navbar-toggler"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarNav"
  aria-controls="navbarNav"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
     <ul className='justify-content-center d-flex list-unstyled flex-wrap mt-3'>
           <li><Link to="/home" className='me-2 me-md-5 text-decoration-none text-black'>Home</Link></li>
            <li><Link to="/dogs" className='me-2 me-md-5 text-decoration-none text-black'>Cachorros</Link></li>
            <li><Link to="/contact" className='me-2 me-md-5 text-decoration-none text-black'>Contato</Link></li>
           
            {!token &&(<li><Link to="/Login" className='me-2 me-md-5 text-decoration-none text-black'>Login</Link></li>)}
            {token &&(<li className='click' onClick={handLogoff } >{` ${token? " Logout " : " " } ` }</li>)} 
            {userName &&(<span className='ms-2 fw-bolder text-secondary'> - {`${userName? userName : ""}`} </span>)}
          </ul>
          </div>
</div>
</nav>

  )
}

export default Nav