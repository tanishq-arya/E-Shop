import React, { useState, useEffect } from 'react';
import Products from './Components/Products/Products';
import Navbar from './Components/Navbar/Navbar';


import { commerce } from './library/commerce'
// state is used to store the product's list so it can be rendered


    
const App = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
    
        setProducts(data);
      };
    
    useEffect(() => {
        commerce.products.list().then(res => {
          setProducts(res.data);
        });
      }, []);
  console.log(products); 
    return (
        <div>
            
            <Navbar />
            <Products products={products} />
        </div>
    )
}

export default App;
