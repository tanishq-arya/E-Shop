import React, { useState, useEffect } from 'react';
// import { Navbar, Products, Cart } from './Components';
import Products from './Components/Products/Products';
import Navbar from './Components/Navbar/Navbar';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/CheckoutForm/Checkout/Checkout';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { commerce } from './library/commerce'
// state is used to store the product's list so it can be rendered

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
    <Router>
      <div style={{ display: 'flex' }}>
        {/* <CssBaseline /> */}
        <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          <Route path="/checkout" exact>
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
/*
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
      <Router>
        <div>
            
            <Navbar totalItems = {cart.total_items} />
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
              
              <Route exact path = "/checkout">
                <Checkout cart = {cart} />
              </Route>
            </Switch>
        </div>
      </Router>
    )
}

export default App;
*/