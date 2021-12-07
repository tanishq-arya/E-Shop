import React, { useState, useEffect } from 'react';
// import { Navbar, Products, Cart } from './Components';
import Products from './Components/Products/Products';
import Navbar from './Components/Navbar/Navbar';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/CheckoutForm/Checkout/Checkout';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { commerce } from './library/commerce'
// state is used to store the product's list so it can be rendered

// importing the Auth Provider
import AuthProvider from './contexts/AuthContext';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import { PrivateRoute } from './Components/UpdateProfile/PrivateRoute';

import {Container} from "react-bootstrap";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  // const refreshCart = async () => {
  //   const newCart = await commerce.cart.refresh();

  //   setCart(newCart);
  // };
  
  useEffect(() => {
    fetchProducts();
    fetchCart();
    // commerce.products.list().then(res => {
    //   setProducts(res.data);
    // });
  }, []);
  
  console.log(products); 
  console.log(cart);

  return (
    <>
      <Router>
        <Navbar totalItems = {cart.total_items} />
        
        <AuthProvider>
        <Switch>
          <Route exact path = "/">
            <Products products={products} onAddToCart ={handleAddToCart} />
          </Route>

          <Route exact path = "/cart">
            <Cart 
              cart = { cart } 
              handleUpdateCartQty = { handleUpdateCartQty }
              handleRemoveFromCart = { handleRemoveFromCart }
              handleEmptyCart = { handleEmptyCart }
            />
          </Route>
          <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
          <div className="w-100" style={{position: "realtive", maxWidth:"400px"}}>  
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </div>
          </Container>
        </Switch>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App;
