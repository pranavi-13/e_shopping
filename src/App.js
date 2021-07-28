import React, {useState, useEffect} from 'react';
import {Products, Navbar, Cart, Checkout} from "./components"
import {commerce} from './lib/commerce'; //deals with all the backend stuff like handlong product inventory etc.
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({}); 
    const [order, setOrder] = useState({});
    const [error, setError] = useState('');


    //Products page functionality
    const fetchProducts = async () =>{
        const { data } = await commerce.products.list();  /* retrieve products added and display them */ 

        setProducts(data);
    }

    //Cart page functionality
    const fetchCart = async ()=>{
        setCart(await commerce.cart.retrieve());  /*retrieve items added to cart */
    }

    const handleAddToCart = async(productId, quantity) =>{
        const response = await commerce.cart.add(productId, quantity); //add item to cart
        setCart(response.cart); //update cart
    }

    const updateQty = async(productId, quantity) =>{
        const response = await commerce.cart.update(productId, {quantity}); //update item quantity
        setCart(response.cart);
    }

    const handleRemove = async(productId) =>{
        const response = await commerce.cart.remove(productId);
        setCart(response.cart);
    }

    const handleEmptyCart = async()=>{
        const response = await commerce.cart.empty();
        setCart(response.cart);
    }

    const refreshCart = async() =>{
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }
    //to know current order details
    const handleCaptureCheckout = async(checkoutTokenId, newOrder) =>{
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setError(error.data.error.message);
        }
    }
    useEffect(() =>{
        fetchProducts();
        fetchCart();
    }, []); //dependency array set empty which means it'll only run at start

    //console.log(products);
    console.log(cart);
    return (
        <Router>
            <div>
            <Navbar totalItems={cart.total_unique_items}/>
            <Switch>
                <Route exact path="/">
                    <Products products={products} onAddToCart={handleAddToCart}/>
                </Route>
                <Route exact path="/cart">
                    <Cart 
                    cart={cart} 
                    updateQuantity ={updateQty} 
                    removeFromCart ={handleRemove}
                    emptyCart = {handleEmptyCart}
                    />
                </Route>
                <Route exact path="/checkout">
                    <Checkout 
                        cart={cart}
                        order={order}
                        onCaptureCheckout = {handleCaptureCheckout}
                        emptyCart = {handleEmptyCart}
                        error={error}
                        />
                </Route>
            </Switch>
            </div>
        </Router>
        
    )
}

export default App;