import React, { useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import dogHome from "../assets/home-image.jpg"
import {sendEmailLinkResetPassword} from "../services/Api"




const ForgotPassword = () => {

  

    const [recoveryEmail, setRecoveryEmail] = useState("");
    const [messageSendEmailLink, setMessageSendEmailLink] = useState(false);

    const[fieldEmailRequired, setFieldEmailRequired ] = useState(false);


    const handleSubmit = async (e)=>{
        e.preventDefault();

          if(recoveryEmail === ""){
            setFieldEmailRequired(true);
            setMessageSendEmailLink(false)
          }else{
          await sendEmailLinkResetPassword(recoveryEmail);
          setMessageSendEmailLink(true);
          setRecoveryEmail("")
          }
          
        
    }
  return (
   
    <div>
         <Nav/>
    <div className='col-12 d-md-flex justify-content-center borde mt-2'>
    
    
    <div className='col-md-6'>
    <form className='p-5 border rounded-3 h-100' onSubmit={handleSubmit}>
      <div className='mb-4'>
      <p className='fs-2 text-center fw-semibold'><em>Recuperar<span className='bg-body-secondary bg-opacity-25'> Senha</span></em></p>
    </div>
  
   <div className="row  justify-content-center">
  
    <div className="col-sm-6">
        <label htmlFor="name" className="col-form-label">E-mail de recuperação:</label>
      <input type="email" className="form-control" id="name" value={recoveryEmail} onChange={(e) => setRecoveryEmail(e.target.value)}/>
       {fieldEmailRequired &&(
        <p className='text-danger fs-6 fw-medium mb-0 mt-1'>{`${fieldEmailRequired ? "E-mail de recuperação obrigatório" : ""}`}</p>
       )}
    
    </div>
  </div>

<div className="row justify-content-center mt-2">
  <div className="col-sm-6 ">
  <button type="submit" className="btn btn-primary">Enviar</button>
  
  </div>
</div>

<div className="row justify-content-center mt-3">
  <div className="col-sm-6 ">
{messageSendEmailLink && (
  <p className="fw-semibold text-success fs-6">{`${messageSendEmailLink? "Link enviado para o e-mail informado" : ""}`}</p>
)}

</div>
</div>


</form>
</div>
 <div className='border col-6'>
<img src={dogHome} className='home-image d-none d-md-block' alt='Dog Home' />
</div>
</div>
<Footer/>
    </div>
  )
}

export default ForgotPassword