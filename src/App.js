import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("cars");

  const inputRef = useRef();


 
  useEffect(() => {
    axios.get(`https://api.pexels.com/v1/search?query=${search}`, {
      headers: {
        Authorization: 'plm3T9CeZvIBdriUjhLhEJYBRzicln86kQ8L0W3uIcao73wKE65C7Lz1' // Replace with your actual Pexels API key
      }
    })
    .then(res => {
      setData(res.data.photos);
      console.log(res.data.photos);
    })
    .catch(err => {
      console.error("Error fetching data from Pexels API:", err);
    });
  }, [search]);

  function HandleOnSubmit(event) {
    event.preventDefault();
    const text = event.target.elements.inputName.value;
    setSearch(text);
    console.log(search);
    inputRef.current.value="";
  }

  return (
    <div className="container">
      <center>
        <h1>Photo Gallery</h1>
        <br />
        <form onSubmit={HandleOnSubmit}>
          <div className='input-group mb-3'>
            <input size="50" type='text' name='inputName' placeholder='Search' ref={inputRef}/>
            <button className="btn btn-primary" type='submit'> Search</button>
          </div>
        </form>
        <br />
        {data.length > 0 ? <Gallery data={data} /> : <p className='text-danger'>No Results Found</p>}
      </center>
    </div>
  );
};

export default App;

function Gallery({ data }) {
  return (
    <div>
      <div className='row'>
        {data.map((image) => (
          <div className='col-md-4' key={image.id}>
            <div className="card" style={{ width: "20rem", height:"25rem" }}>
              <img className='card-img-top' src={image.src.medium} alt={image.alt} style={{ objectFit: 'cover', height: '200px' }} />
              <div className="card-body">
                <h5 className="card-title">{image.photographer}</h5>
                <p className="card-text">
                 {image.alt}
                </p>
                <a href={image.photographer_url} className="btn btn-dark">{image.photographer}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



