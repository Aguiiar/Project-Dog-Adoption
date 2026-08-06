import React, {useState} from 'react'
import "./Contact.css"
import Nav from './Nav'
import Footer from './Footer'
import {sendContact} from '../services/Api'


 const Contact = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [accept, setAccept] = useState(false);

    const[successMessage, setSuccessMessage] = useState("d-none")

    const[msgAcceptTerms,setMsgAcceptTerms] = useState(false);
    
    const[fieldsRequired, setFieldsRequired] = useState ({
      email:"",
      message:""
    });


  const handleClickAccept = async(e)=>{
    setAccept(!accept);
   
}



const handleSubmit = async(e)=>{
    e.preventDefault();



      
    const newErros ={
      email:"",
      message:""
    }

    if(email === ""){
      newErros.email="E-mail obrigatório";
      setMsgAcceptTerms(false);
    }else if(message === ""){
      newErros.message="Mensagem obrigatória";
      setMsgAcceptTerms(false);
    }else if(accept === true){
    await sendContact(email,message)
    setEmail("");
    setMessage("");
    
    
    setAccept(false)     
    setMsgAcceptTerms(false);
    setSuccessMessage("d-block")
    }
    else{
        setMsgAcceptTerms(true)
        setSuccessMessage("d-none")
    }
  
  setFieldsRequired(newErros);

}


  
  return (
    <div>
    <Nav/>


<form className='p-5 mb-5' onSubmit={handleSubmit}>
  <div className="col-sm-4 mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">E-mail</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='E-mail'  value={email} onChange={(e) => setEmail(e.target.value)}/>
    <div id="emailHelp" className="form-text">Nunca compartilharemos seu e-mail com ninguém.</div>
    {fieldsRequired &&(
      <p className='text-danger fs-6 fw-medium mb-0'>{fieldsRequired.email}</p>
    )}
  </div>
 <div className="form-floating">
  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"  minLength={2}  value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
  <label htmlFor="floatingTextarea">Mensagem</label>
    <div id="emailHelp" className="form-text">Envie uma mensagem para nós, vamos te ajudar!</div>
    {fieldsRequired &&(
      <p className='text-danger fs-6 fw-medium mb-0'>{fieldsRequired.message}</p>
    )}
</div>
  <div className="mb-1 mt-2 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={accept} onChange={handleClickAccept}/>
    <label className="form-check-label" htmlFor="exampleCheck1"><span className='text-dark fw-medium'>Aceito os <a href='#.' className='text-dark'>Termos de Uso</a></span></label>
  
  </div>
  <div className='form-floating'>
      {msgAcceptTerms &&(
      <p className='text-danger fs-6 fw-medium mb-1'>{`${msgAcceptTerms? "Aceite os temos para continuar" : ""}`}</p>
    )}
  </div>
  <button type="submit" className="btn btn-primary mt-2">Enviar</button>
  <p className={`message text-success fw-bolder mt-2 fs-6 ${successMessage}`}>Mensagem enviada com sucesso!</p>
  
</form>
    <Footer/>



    
    </div>
  )
  
}

export default Contact