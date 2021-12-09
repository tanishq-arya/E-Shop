import React from 'react'
import { Card, CardHeader, CardContent, Typography, Container } from '@material-ui/core';
import { useAuth } from '../../contexts/AuthContext';
import useStyles from './styles';

const PastOrders = () => {
  const classes = useStyles();  
  const { getPastOrders } = useAuth();
  const orders = getPastOrders();
  console.log(orders)
  return (
    <main className={classes.content}>
      <h1>PAST ORDERS</h1>
      {orders.forEach(function (order) {
        // console.log(order)
        <Card elevation={2} >
          <CardHeader
            title={order.data.orderId}
            subheader={order.amount}
          />
          <CardContent>
            <Typography variant="body2" color="textPrimary">
              List
            </Typography>
          </CardContent>
        </Card>
      })
    }
    </main>
  )
}

export default PastOrders
