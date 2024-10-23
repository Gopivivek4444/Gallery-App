import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("cars");

  const inputRef = useRef();


 
  useEffect(() => {
    axios.get(`https://api.pexels.com/v1/search?query=${search}`, {
      headers: {
        Authorization: 'plm3T9CeZvIBdriUjhLhEJYBRzicln86kQ8L0W3uIcao73wKE65C7Lz1'
      }
    })
    .then(res => {
      setData(res.data.photos);
      // console.log(res.data.photos);
    })
    .catch(err => {
      console.error("Error fetching data from Pexels API:", err);
    });
  }, [search]);

  function HandleOnSubmit(event) {
    event.preventDefault();
    const text = event.target.elements.inputName.value;
    setSearch(text);
    // console.log(search);
    inputRef.current.value="";
  }

  return (
    <div className="container_1">
     
        <h1 style={{color:'black'}}>Photo Gallery</h1>
        <br />
        <form onSubmit={HandleOnSubmit}>
          <div className='justify-content-center'>
            <input  type='text' name='inputName' placeholder='Search' ref={inputRef}/>
            <button type='submit'> Search</button>
          </div>
        </form>
        <br />
        {data.length > 0 ? <Gallery data={data} /> : <p style={{color:'red'}}>No Results Found</p>}
      
    </div>
  );
};

export default App;

function Gallery({ data }) {
  return (
    <div className='card-container'>
      
        {data.map((image) => (
           <div className='card_1' key={image.id}>
              <div className='card-img'>
                 <img  src={image.src.medium} alt={image.alt}  style={{height:'200px',objectFit:'cover',width:'280px'}}/>
              </div>
              <div className="card-body">
                <h5 className="card-title">{image.photographer}</h5>
                <p className="card-text" style={{fontSize:'130%'}}>
                 {image.alt}
                </p>
                <a href={image.photographer_url} className="btn btn-dark">
                  <button style={{height:'30px',backgroundColor:'	#be29ec',borderRadius:'8px',border:'none',minWidth:'130px'}}>
                  {image.photographer}
                  </button>
                </a>
              </div>
            </div>
          
        ))}
     
    </div>
  );
}



