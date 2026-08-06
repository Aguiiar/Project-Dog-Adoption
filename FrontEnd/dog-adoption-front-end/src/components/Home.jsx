import React from 'react'
import "./Home.css"
import dogHome from "../assets/home-image.jpg"
import Nav from './Nav'
import Footer from './Footer'


const Home = () => {
  return (
    <div>


    <Nav />


<div className='boxHomeImgAndText'>


    <div className='col-12 d-md-flex d-none justify-content-center'>
    <div className='col-10 col-sm-6 boxTextImg d-flex justify-content-end  ms-4'>
    <div className='col-5 col-sm-7 text-black '>
          <p className='fw-medium mb-1 mt-2'>Os animais precisam</p>
          <p className='fs-1 fw-bolder mb-3'>Sua Ajuda</p>
            <p className='fst-italic fs-6 border-start '>Adote um animal, faça a diferença, mude a vida dele, seja uma pessoa melhor.</p>
        </div>
      
        </div>


 </div>





<img src={dogHome} className='home-image' />
</div>


  <Footer />
    </div>
    
  )
}

export default Home