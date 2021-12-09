import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography,Badge } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, AccountCircle } from '@material-ui/icons';
import useStyles from './styles';
// import Button from '@mui/material/Button';
import logo from '../../assets/shop.jpg'

//nav bar on the top of the website
const Navbar = ({totalItems}) => {

const classes = useStyles();
const location = useLocation();

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component = {Link} to = "/" variant='h6' className={classes.title} color='inherit'>
                        {/* <img src={logo} alt="E-Commerce" height="25px" className={classes.image} /> */}
                        E-Commerce
                    </Typography>
                    

                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                    <div className={classes.button}>
                        <Button
                            style={{fontFamily:"Roboto",fontSize:"1rem" }}
                            endIcon={<AccountCircle/>}
                            href="/update-profile"
                        >
                            Account
                        </Button>
                        {/* <Link to = "/cart">Go to cart</Link> */}
                        <IconButton component = {Link} to = "/cart" aria-label="Show Cart Items" color='inherit'>
                            <Badge badgeContent= {totalItems} color="secondary">
                            <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>)}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;