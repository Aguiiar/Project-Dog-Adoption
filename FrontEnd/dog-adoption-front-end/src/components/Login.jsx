import React, { useState } from 'react'
import dogHome from "../assets/home-image.jpg"
import { login } from '../services/Api'
import "./Login.css"
import Nav from './Nav'
import Footer from './Footer'


import { useNavigate } from 'react-router-dom'





const Login = () => {


  

  const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [invalidLoginMessage, setIvalidLoginMessage ] = useState(false);
    
    const [filedsRequired, setFiledsRequired] = useState({
      email:"",
      password:""
    });
   
    


    
    
const handleSubmit = async(e) =>{
  e.preventDefault();
 
    const NewErros={
      email:"",
      password:"",
    }


if(email === ""){
      NewErros.email = "Insira um e-mail";
      setIvalidLoginMessage(false);
    }else if (password === ""){
      NewErros.password = "Insira uma senha";
      setIvalidLoginMessage(false);

    }else{
        
        
        
        
      try{
         const token = await login(email,password);
        localStorage.setItem("token", token.token);
        navigate("/Dogs")
      
     
   
        
    
      }catch(error ){
        console.log(error.message);
          setIvalidLoginMessage(true)
      }
     


     
        }
           setFiledsRequired(NewErros);
}


const handleRedirectSignUp = async () =>{
    navigate("/signUp");
}

const handleRedirectForgotPassword = async () =>{
  navigate("/forgotPassword")
}


  return (
    <div>
        <Nav/>


    <div className='col-12 d-md-flex justify-content-center borde mt-4 '>
    
    
    <div className='col-md-6'>
    <form className='p-5 border rounded-3 h-100' onSubmit={handleSubmit}>
      <div className='mb-4'>
      <p className='fs-2 text-center fw-semibold'><em>Faça o<span className='bg-body-secondary bg-opacity-25'> Login</span></em></p>
    </div>
    <div className="row  justify-content-center">
  
    <div className="col-sm-6">
        <label htmlFor="name" className="col-form-label ">Usuário:</label>
      <input type="text" className="form-control" id="name" value={email} onChange={(e) => setEmail(e.target.value)}/>   
      {filedsRequired &&(
    <p className='text-danger fs-6 fw-medium mb-0'>{filedsRequired.email}</p>
  )}
    </div>
  </div>
 <div className="row justify-content-center">
  <div className="col-sm-6">
      <label htmlFor="password" className="col-form-label ">Senha:</label>
      <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
    {filedsRequired &&(
    <p className='text-danger fs-6 fw-medium mb-0'>{filedsRequired.password}</p>
  )}
  <div className='d-lg-flex'>
  <p className='mb-0 text-decoration-underline click me-2 fw-medium mt-1' onClick={handleRedirectSignUp}><span className='TextButtomLogin'>Crie uma conta</span></p>
  <p className='mb-0 text-decoration-underline click me-2 fw-medium mt-1' onClick={handleRedirectForgotPassword}><span className='TextButtomLogin'>Esqueci a senha</span></p>
</div>

    </div>
  </div>
<div className="row justify-content-center mt-1">
  <div className="col-sm-6">
  <button type="submit" className="btn btn-primary mt-2">Login</button>
       {invalidLoginMessage &&(
         <p className='text-danger fs-6 fw-medium mt-2'>{`${invalidLoginMessage? "Usuário ou senha inválidos":"" }`}</p>
        )}
  </div>

</div>





</form>
</div>




 <div className='border col-6'>

<img src={dogHome} className='home-image d-none d-md-block teste' alt='teste' />
</div>
</div>

        <Footer/>
    </div>
  )
}

export default Login