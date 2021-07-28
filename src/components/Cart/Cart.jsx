import React from 'react';
import {Container, Typography, Button, Grid} from "@material-ui/core";
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";
import {Link} from "react-router-dom";

const Cart = ({ cart, updateQuantity, removeFromCart, emptyCart}) => {
    const classes = useStyles();
    if(!cart.line_items)
        return  '...Loading your Cart';

    const EmptyCart = () =>(
        <Typography variant="subtitle1">Looks like your cart is empty :(
        <Link to="/" className={classes.link}> Go ahead and add some items!</Link> 
        </Typography>
        
    );

    const FilledCart =() =>(
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) =>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateQty={updateQuantity} onRemove={removeFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal:{cart.subtotal.formatted_with_symbol}</Typography>
            </div>
            <div align='right'>
                <Button 
                className={classes.emptyButton} 
                size="large" type="button" 
                variant="contained" color="secondary" 
                onClick={emptyCart}>Empty Cart
                </Button>

                <Button 
                className={classes.checkoutButton} 
                size="large" type="button" 
                variant="contained" color="primary"
                component={Link} to="/checkout">Checkout
                </Button>
            </div>
        </>
    );

    return (
        <Container> 
            <div className={classes.toolbar}/>
            <Typography className= {classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {cart.line_items.length===0 ? <EmptyCart /> : <FilledCart /> }
        </Container>    
        
    );
}

export default Cart
