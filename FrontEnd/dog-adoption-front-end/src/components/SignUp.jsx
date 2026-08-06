import React, { useState } from 'react'
import dogHome from "../assets/home-image.jpg"
import { saveUser } from '../services/Api'
import "./SignUp.css" 
import Nav from './Nav'
import Footer from './Footer'

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  
  
  const [errorCofirmPassword, setErrorCofirmPassword] = useState(false);
  
  const [sucessMessage, setSucessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false)
  
  
  const [fieldRequired, setFieldRequired] = useState({
    name:"",
    email: "",
    password: "",
    confirmPassword:"",
    useTerms:""
   });


  
   const [accept, setAccept] = useState(false);




   const handleClick = async (e) => {

      setAccept(!accept);
      
   }


  const handleSubmit = async(e) => {
    e.preventDefault();
    setSucessMessage(false)


const newErrors ={
  name:"",
  email:"",
  password:"",
  confirmPassword:"",
  useTerms:"",
}

   if(name === "" ){
      newErrors.name="Nome obrigatório";
      
      
      
      
      
      setErrorMessage(false);
    }else if(email === "" ){
    newErrors.email = "E-mail obrigatório";
      setErrorMessage(false);

    }else if(password === "" ){
    newErrors.password="Senha obrigatória";
             setErrorMessage(false);

    }else if(confirmPassword === "" ){
     newErrors.confirmPassword="Confirmação de senha obrigatória";
      setErrorMessage(false);

    }
    else if(confirmPassword !== password || password !== confirmPassword){
      console.log("Password diferrent")
      
      setErrorCofirmPassword(true);
      
      setErrorMessage(true);
      setSucessMessage(false);

    } else if(accept === false){
      newErrors.useTerms="Aceite os termos de uso";
      setErrorMessage(false);
      setErrorCofirmPassword(false)
  
    }
    
    else{
    await saveUser(name, email,password,confirmPassword)
    setName("");
    setEmail("");
    setPassword("");
    setconfirmPassword("");
    setAccept(false)
     
    setErrorCofirmPassword(false)
    
    setSucessMessage(true);
   
    

    console.log("Cadastrado")
    }
  setFieldRequired(newErrors);
    
  }

  return (
<div>
      <Nav/>

  
    <div className='col-12 d-md-flex justify-content-center borde mt-2'>
    
    
    <div className='col-md-6'>



    <form className='p-5 border rounded-3 h-100' onSubmit={handleSubmit}>
      <div className='mb-4'>
      <p className='fs-2 text-center fw-semibold'><em>Criar uma<span className='bg-body-secondary bg-opacity-25'> conta</span></em></p>
    </div>
    <div className="row  justify-content-center">
  
    <div className="col-sm-6">
        <label htmlFor="name" className="col-form-label ">Nome:</label>
      <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
  
    {fieldRequired &&(
        <p className='text-danger fs-6 fw-medium mb-0'>{fieldRequired.name}</p>
    )}
    </div>
  </div>
 <div className="row  justify-content-center">
  
  <div className="col-sm-6">
      <label htmlFor="email" className="col-form-label ">E-mail:</label>
      <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      {fieldRequired &&(
        <p className='text-danger fs-6 fw-medium mb-0'>{fieldRequired.email}</p>
    )}
    </div>
  </div>
 <div className="row justify-content-center">
  
     <div className="col-sm-6">
        <label htmlFor="password" className="col-form-label ">Senha:</label>
      <input type="password" className="form-control" id="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
    {fieldRequired &&(
    <p className='text-danger fs-6 fw-medium mb-0'>{fieldRequired.password}</p>
    )}
    </div>
  </div>
    <div className="row justify-content-center">
 
  <div className="col-sm-6">
       <label htmlFor="passwordConfirm" className="col-form-label">Confirme a senha:</label>
      <input type="password" className={`form-control ${errorCofirmPassword? "border border-danger" : ""}`} id="passwordConfirm" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}/>
    {errorMessage && (<p className="fw-semibold text-danger mb-0">{`${errorMessage? "As senhas não coincidem!" : ""}`}</p>)}
    {fieldRequired &&(
       <p className='text-danger fs-6 fw-medium mb-0'>{fieldRequired.confirmPassword}</p>
    )}

    </div>
  </div>









    <div className="row justify-content-center mt-3">
    <div className="col-sm-6">
    <input type="checkbox" className="form-check-input me-2" id="exampleCheck1" checked={accept} onChange={handleClick} />
    <label className="form-check-label" htmlFor="exampleCheck1"><span className='text-dark fw-medium'>Aceito os <a href='#.' className='text-dark'>termos de uso</a></span></label>
     {fieldRequired &&(
       <p className='text-danger fs-6 fw-medium mb-0 mt-1'>{fieldRequired.useTerms}</p>
    )}
</div>
 </div>










<div className="row justify-content-center mt-3">
  <div className="col-sm-6 ">
  <button type="submit" className="btn btn-primary">Registrar-se</button>
  
  </div>
</div>

{sucessMessage && (
  <div className="row justify-content-center mt-3">

   <div className="col-sm-6">
  <p className="fw-semibold text-success fs-6">{`${sucessMessage? "Usuário cadastrado com sucesso!" : ""}`}</p>
  </div>
  </div>
)}




</form>
</div>
 <div className='border col-6'>
<img src={dogHome} className='home-image d-none d-md-block img-form' />
</div>
</div>


<Footer/>
</div>

  )
  
}
<Footer/>

export default SignUp