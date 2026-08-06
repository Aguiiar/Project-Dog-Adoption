import React, { useState, useEffect } from 'react'
import { getDogs } from '../services/Api'
import "./Dogs.css"
import Nav from './Nav'
import Footer from './Footer'

const Dogs = () => {


    
    const [search, setSearch] = useState("");
    const [searchDog, setSearchDog] = useState("");


    
    const [dogs, setDogs] = useState([]);


   

    
    const handleSearch=()=>{
      setSearchDog(search);
    }

  
    
    
    
    const filterDogs = searchDog === "" ? dogs : dogs.filter(dog => dog.breed.toLowerCase().includes(searchDog.toLowerCase()));
 





  
   const marginResultCardClass =
  filterDogs.length <= 3 
  ? "me-sm-4"
  : "me-sm-4";
  

 






const handleInputChange = (e)=>{
  const value = e.target.value;

  setSearch(value);

  if(value ===""){
    setSearchDog("");
  }
}




useEffect(() => {
  const loadDogs = async() =>{
    const data = await getDogs();
    console.log(data);
    setDogs(data);
  }
  loadDogs();
},[]);


    

  return (
    <div>
<Nav />

<div className='d-flex flex-column border'>




<div className="col-12 d-flex justify-content-center justify-content-sm-start px-5 mt-3">
<div className='me-2'>
<input className='inputSearch p-2' type='text' placeholder='Digite a raça' value={search} onChange={handleInputChange}/>
</div>
<div className='ms-2'>
<button className='button btn btn-info  btn-md'  onClick={handleSearch}>Buscar</button>
</div>
</div>





<div className="col-12 d-flex flex-wrap justify-content-center justify-content-sm-start px-5 mt-3">
{filterDogs.map(dog => (

<div className={`card ${marginResultCardClass}`} key={dog.name}  >
    <p className='text-uppercase bg-white text-black dogTextadoptionTop mt-1'>Adote Adote Adote Adote Adote</p>
    <div className='borderAroundDogImg'>
 
  <img src={dog.imageUrl} className="card-img-top teste" alt="..."/>
  </div>
  <div className="card-body">
    <h5 className='dogName text-black fw-bolder fst-italic'>{dog.name}</h5>
    <p className="dogText mb-2 p-2">{dog.breed} <span className='text-white'>|</span> {dog.age}  <span className='text-white'>|</span> {dog.description}</p>
  </div>
      <p className='text-uppercase bg-white text-black dogTextadoptionBottom'>Adote Adote Adote Adote Adote</p>
</div>



))

}

</div>



</div>
<Footer />


    </div>
  )
}

export default Dogs