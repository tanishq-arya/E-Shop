import React, { useState, useEffect } from 'react';
// import { Navbar, Products, Cart } from './Components';
import { CssBaseline } from '@material-ui/core';
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
import PastOrders from './Components/PastOrders/PastOrders';
import { PrivateRoute } from './Components/UpdateProfile/PrivateRoute';

import {Container} from "react-bootstrap";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <AuthProvider>
            <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
            <Switch>
              <Route exact path="/">
                <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
              </Route>
              <Route exact path="/cart">
                <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
              </Route>
              <Route exact path="/checkout">
                <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
              </Route>
              <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
              <div className="w-100" style={{position: "realtive", maxWidth:"400px"}}>  
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <PrivateRoute path="/past-orders" component={PastOrders} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </div>
              </Container>
            </Switch>
          </AuthProvider>
        </div>
      </Router>
    </>
  );
};

export default App;