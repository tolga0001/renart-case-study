import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import StarRating from './StarRating';

function App() {
  const [products, setProducts] = useState([]);
const [selectedColors,setSelectedColors] = useState({})
const BACKEND_BASE_URL = "http://localhost:8000";
  useEffect(()=>{
    const fetchProducts = async () =>{
      try{
        const response = await fetch(BACKEND_BASE_URL+"/products");
        const data = await response.json();
        console.log("Parsed JSON data:", data);  

      setProducts(data);
        setProducts(data);
      }
      catch(err){
        console.error("Error while fetching the products",err);
      }
    };
    fetchProducts();
  },[])

  const handleColorSelect = (productIndex,color)=>{
    setSelectedColors((prev)=>({
      ...prev,
      [productIndex]:color
    }))
  };
  
  
 return (
  <div className="app-container">
    <h1>Product List</h1>
   <div className="carousel-wrapper">
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

          <h2>{p.name}</h2>
          <p>${p.price} USD</p>


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
  </div>
</div>
)

}
export default App;