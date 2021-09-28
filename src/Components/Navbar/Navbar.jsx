import React from 'react';
import { AppBar, Toolbar, IconButton, Typography,Badge, MenuItem, Menu } from '@material-ui/core';

import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

import logo from '../../assets/shop.jpg'

//nav bar on the top of the website
const Navbar = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt="E-Commerce" height="25px" className={classes.image} />
                        E-Commerce
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                        <IconButton aria-label="Show Cart Items" color='inherit'>
                            <Badge badgeContent='' color="secondary">
                            <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;
