import React, { useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import dogHome from "../assets/home-image.jpg"


import { useNavigate, useSearchParams } from 'react-router-dom'

import { resetPassword } from '../services/Api'

const ResetPassword = () => {

    const [newPassword, setNewPassword] =useState("");
    const [confirmNewPassword, setConfirmNewPassword]=useState("");

    

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token")
    const navigate = useNavigate();


    const [fieldPasswordDifferent, setFieldPasswordDifferent] = useState(false);
    const [fieldPasswordSuccess, setFieldPasswordSuccess] = useState(false);

    const [fieldRequired, setFieldRequired] = useState({
      newPassword:"",
      confirmNewPassword:""
    });
    
    const handleSubmit = async(e)=>{
      e.preventDefault();

      const newErros={
        newPassword:"",
        confirmNewPassword:"",
      }
        if(newPassword ===""){
            newErros.newPassword = "Senha obrigatória ";
            setFieldPasswordDifferent(false);
        }else if (confirmNewPassword ===""){
          newErros.confirmNewPassword = "Confirmação de senha obrigatória"
                   setFieldPasswordDifferent(false);
        }else if(newPassword !== confirmNewPassword){
        setFieldPasswordDifferent(true);
        setFieldRequired(false);
      }else{
          await resetPassword(token, newPassword);
          setFieldPasswordSuccess(true);
          setFieldPasswordDifferent(false);
          setTimeout(() => {
             navigate("/Login")
          }, 5000);
         
      }
    
        
       setFieldRequired(newErros);
      }
    
  
  return (
   
    <div>
         <Nav/>
            <div className='col-12 d-md-flex justify-content-center borde mt-2'>
    
    
    <div className='col-md-6'>

    <form className='p-5 border rounded-3 h-100' onSubmit={handleSubmit}>
      <div className='mb-4'>
      <p className='fs-2 text-center fw-semibold'><em>Nova<span className='bg-body-secondary bg-opacity-25'> Senha</span></em></p>
    </div>
  
 <div className="row  justify-content-center">
    <div className="col-6 col-sm-4">
        <label htmlFor="newPassword" className="col-form-label ">Nova senha:</label>
      <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
      {fieldRequired &&(
        <p className='text-danger fs-6 fw-medium mb-0'>{`${fieldRequired.newPassword}`}</p>
      )}
    </div>
    </div>
     <div className="row justify-content-center">
     <div className="col-6 col-sm-4">
        <label htmlFor="confirmNewPassword" className="col-form-label ">Confirme a nova senha:</label>
      <input type="password" className="form-control" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
      {fieldRequired &&(
        <p className='text-danger fs-6 fw-medium mb-0'>{`${fieldRequired.confirmNewPassword}`}</p>
      )}

      <p className='text-danger fs-6 fw-medium mb-2'>{`${fieldPasswordDifferent ? "As senhas não coincidem!" : ""}`}</p>
      <p className='text-success fs-6 fw-medium mb-2'>{`${fieldPasswordSuccess? "Senha alterada com sucesso!" : ""}`}</p>
    </div>
    </div>
    <div className="row justify-content-center">
  <div className="col-6 col-sm-4">
  <button type="submit" className="btn btn-primary">Alterar senha</button>
  
  </div>
</div>

</form>
</div>
 <div className='border col-6'>
<img src={dogHome} className='home-image d-none d-md-block img-form'  />
</div>
</div>
<Footer/>
    </div>
  )
}



export default ResetPassword