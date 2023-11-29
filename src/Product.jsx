import React, {useState} from 'react';
import './App.css';
import { Description } from '@mui/icons-material';

function Product(props) {
    const {id, title, image,
        price} = props;
    const [open, setOpen] = useState(false);
    const [productData, setProductData] = useState();

    const getProductData = async(id) => {
        console.log("Function");
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          if(response.ok) {
            const result = await response.json();
            setProductData(result);
            console.log(result);
          } else {
            console.error("Failed");
          }
        } catch(error) {
          console.error(error);
        }
      };

    return (
        <>
        <div onClick={()=>{setOpen(true); getProductData(id)}} className="product">
              <img className="product-image" src={image} alt="Image"></img>
              {title}
              {price}
            </div>
        {
            open && <div className="modal">
            {title}
            {/* {description} */}
            <button onClick={()=>setOpen(false)}>Close</button>
            </div>
        }
        </>
    );
}

export default Product;