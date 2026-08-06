import React from 'react'
import "./Footer.css"
import logoFacebook from "../assets/logo-facebook.png"
import logoInstagram from "../assets/logo-instagram.png"
const Footer = () => {
  return (
    <div>
 <footer className="d-flex justify-content-center col-12 bg-light border py-2">
    <div className='boxFooter mt-2'>
        <div className='ImgFooterRodape px-5  text-center '>
            <img className='me-2' src={logoInstagram}/>
            <img className='ms-2'  src={logoFacebook}/>
        </div>
<p className='mt-2 text-black '>Termos de Uso Política de Privacidade</p>
<p className=' text-black text-center '>@ 2026 - Adoption Dogs</p>
    </div>
</footer>
</div>
  )
}

export default Footer