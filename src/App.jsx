import React, { useState, useEffect } from 'react';
import './App.css';
import Product from './Product';

function App() {

  const [data, setData] = useState([]);
  const [allProducts, setAllProducts] = useState(true);
  const [categoryData, setCategoryData] = useState([]);

  const getData = async() => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if(response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error("Failed");
      }
    } catch(error) {
      console.error(error);
    }
  };

  const getCategoryData = (category) => {
    console.log(category);
    setAllProducts(false);
    if(category==="electronics") {
      setCategoryData(data.filter(product => product.category==="electronics"));
    }
    if(category==="jewelery") {
      setCategoryData(data.filter(product => product.category==="jewelery"));
    }
    if(category==="men's clothing") {
      setCategoryData(data.filter(product => product.category==="men's clothing"));
    }
    if(category==="women's clothing") {
      setCategoryData(data.filter(product => product.category==="women's clothing"));
    }
    if(category==="") {
      setCategoryData(data);
    }
  };

  useEffect(()=>{
    getData();
    // console.log(data);
  },[data]);


  return (
    <div>
      <div className="top-container">
        <div>
          New Products
        </div>
        <div className="categories">
        <button className="categories-div" onClick={() => { getCategoryData(""); }}>
          All
        </button>
        <button className="categories-div" onClick={() => { getCategoryData("women's clothing"); }}>
          Women's
        </button>
        <button className="categories-div" onClick={() => { getCategoryData("men's clothing"); }}>
          Men's
        </button>
        <button className="categories-div" onClick={() => { getCategoryData("electronics"); }}>
          Elctronics
        </button>
        <button className="categories-div" onClick={() => { getCategoryData("jewelery"); }}>
          Jewelery
        </button>
        </div>
      </div>
      <div className="product-list">
        {
          allProducts ? (data.map((product) =>
            <Product
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          )) : (categoryData.map((product) =>
          <Product
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
        />
          ))
        }
    </div>
    </div>
  );
}

export default App;
