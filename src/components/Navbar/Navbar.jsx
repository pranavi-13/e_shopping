import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, Typography} from "@material-ui/core";
import { ShoppingCart} from "@material-ui/icons";
import {Link, useLocation} from "react-router-dom";
import logo from "../../assets/shopping-bag.png";
import useStyles from "./styles";

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="ShopAway" height="25px" className={classes.image} />
                        ShopAway
                   </Typography>
                   <div className={classes.grow} />

                   {/*render cart icon only on home page */}
                   {(location.pathname ==="/") && (
                   <div className={classes.button}>
                   {/*Link is used to add a hyperlink to the component. IN this case we redirect to /cart which displays cart content*/ }
                       <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                           <Badge badgeContent={totalItems} color="secondary">
                               <ShoppingCart />
                           </Badge>
                       </IconButton>
                   </div> )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
