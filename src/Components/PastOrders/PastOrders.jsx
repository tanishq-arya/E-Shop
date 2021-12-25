import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { database } from '../../library/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Typography, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
const PastOrders = () => {
  const {getUserID} = useAuth();
  
  const [orderData, setOrderData] = useState([]);
  
  useEffect(() => {
    // effect
    const getData = async () => {
      const uid = getUserID();
      const databaseRef = collection(database, 'orders-data');
      
      const q = query(databaseRef, where('user', "==", uid));
      const data = await getDocs(q);
      // console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      setOrderData(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
  
    getData()
    // console.log(orderData)
  }, [orderData, getUserID])
  return (
    <div>
      <Typography variant="h4" justifyContent="center" gutterBottom>Past Orders</Typography>
      <Divider/>
      <Divider/>
      {orderData.length>0 &&
      <List disablePadding>
      {orderData.map((order) => {
        return(
          <>
          <ListItem style={{ padding: '10px 0' }}>
            <ListItemText primary="Order ID" />
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>{order.id}</Typography>
          </ListItem>
          
          <ListItem disableGutters style={{ padding: '0px 0' }}>
            <List>
              <ListItem disableGutters>
                <ListItemText primary="Products" />
                {/* <Typography variant="body2">Products</Typography> */}
              </ListItem>  
              {order.products.map((product) =>{
                return(
                  <div>
                    <ListItem disableGutters style={{ padding: '10px 0' }} key={product.name}>
                      <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity} Amount:${product.amount}`} />
                      {/* <ListItemText primary="Amount" />
                      <Typography variant="body2">{product.amount}</Typography> */}
                    </ListItem>
                  </div>
                  )
                })
              }
            </List>
          </ListItem>
          <ListItem style={{ padding: '10px 0 20px 0' }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>{order.total}</Typography>
          </ListItem>

          <Divider />  
          <Divider />  
          </>
        )
      })}
      </List>}
      {orderData.length ===0 && 
        <Typography variant="h6" justifyContent="center" gutterBottom>No Orders Placed</Typography>
      }
      {orderData.length ===0 && 
        <Link to="/">Home</Link>
      }
    </div>
  )
}

export default PastOrders
