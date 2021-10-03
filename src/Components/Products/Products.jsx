import React from 'react';
import Grid from '@material-ui/core/Grid';

import Product from './Product/Product';

import useStyles from './styles';

//array for products - temporary until commerce products are imported
//const products = [
  //  {id: 1, name: 'Mobile Phone', description: 'iPhone', price:'$100', image:''},
    //{id: 2, name: 'Bag', description: 'Laptop Bag', price:'$30', image:''},
   // {id: 3, name: 'Book1', description: 'Fiction', price:'$10', image:''},
 //   {id: 4, name: 'Book2', description: 'Fiction', price:'$10', image:''},
//    {id: 5, name: 'Book3', description: 'Fiction', price:'$10', image:''},
  //  {id: 6, name: 'Book4', description: 'Fiction', price:'$10', image:''},
  //  {id: 7, name: 'Book5', description: 'Fiction', price:'$10', image:''}
//];

const Products = ({ products,onAddToCart }) => {
    const classes = useStyles();
    return(
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart = {onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
    )
}

export default Products;