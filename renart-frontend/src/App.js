import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import { useCallback } from "react";
import './Fonts/fonts.css'

function App() {
  const [products, setProducts] = useState([]);
const [selectedColors,setSelectedColors] = useState({})
const [minPrice,setMinPrice] = useState('');
const [maxPrice,setMaxPrice] = useState('');
const [minScore,setMinScore] = useState('');
const BACKEND_BASE_URL = "https://renart-backend.onrender.com";


  



    const fetchProducts = useCallback(async () =>{
      try{
        let productsFilteredUrl = BACKEND_BASE_URL+"/products"
        const params = []
        if (minPrice) params.push(`minPrice=${minPrice}`);
        if (maxPrice) params.push(`maxPrice=${maxPrice}`);
        if (minScore) params.push(`minScore=${minScore}`);
        if (params.length > 0) {
        productsFilteredUrl += `?${params.join('&')}`;
      }
        const response = await fetch(productsFilteredUrl);
        const data = await response.json();
        console.log("Parsed JSON data:", data);  
        setProducts(data);

      
      }

      catch(err){
        console.error("Error while fetching the products",err);
      }
    },[minPrice,maxPrice,minScore]);
     
     

    const handleFilter = () => {
    fetchProducts(); // inputlara göre yeni veri çek
  };
   


  const handleColorSelect = (productIndex,color)=>{
    setSelectedColors((prev)=>({
      ...prev,
      [productIndex]:color
    }))
  };
  useEffect(() => {
  fetchProducts(); // tüm ürünler gelir
}, []);
   
  
  
 return (
  <div className="app-container">
    <h1>Product List</h1>
    <div className='filter-bar'>

      <input
      type='number'
      placeholder='Min Price(USD)'
      value={minPrice}
      onChange={(e)=> setMinPrice(e.target.value)}
      />
       <input
      type='number'
      placeholder='Max Price(USD)'
      value={maxPrice}
      onChange={(e)=> setMaxPrice(e.target.value)}
      />
       <input
          type="number"
          step="0.1"
          placeholder="Min Rating (1-5)"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
        />
      <button onClick={handleFilter}>Apply Filter</button>

    </div>
   <div className="carousel-wrapper">
   {products.length===0 ?(
      <p className="no-results">No products found matching your criteria.</p>

   ): (
    <div className="product-list">
      {products.map((p, index) => (
        <div className="product-card" key={index}>
          <img
            src={
              p.images[
                selectedColors[index] ? selectedColors[index] : 'yellow'
              ]
            }
            alt={p.name}
            className="product-img"
          />

     <h2 className="product-name">{p.name}</h2>
     <p className="product-price">${p.price} USD</p>


          {/* Color selector */}
          <div className="color-picker">
            {['yellow', 'white', 'rose'].map((color) => (
              <div
                key={color}
                className={`color-circle ${color} ${
                  selectedColors[index] === color ? 'selected' : ''
                }`}
                onClick={() => handleColorSelect(index, color)}
              ></div>
            ))}
          </div>

         {/* Selected color name */}
        <div className="selected-color-label">
        {selectedColors[index] ? selectedColors[index].charAt(0).toUpperCase() + selectedColors[index].slice(1) + " Gold" : "Yellow Gold"}
        </div>

         <div className="product-rating">
            <StarRating score={(p.popularityScore * 5).toFixed(1)} />
            <span className="score-text">
              {(p.popularityScore * 5).toFixed(1)} / 5
            </span>
          </div>
        </div>
      ))}
    </div>
   )}
  </div>
</div>
)

}
export default App;