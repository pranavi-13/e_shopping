import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';


//template to display each product in products array
//destructuring product from props to prevent repetition
const Product = ({product, onAddToCart}) => {
    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5">
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                {/*dangerouslySetInnerHTML to render HTML tags */}
                <Typography dangerouslySetInnerHTML={{__html : product.description}} variant="body2" color="textSecondary" />
            </CardContent>

            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label='Add to cart' onClick={() =>onAddToCart(product.id, 1)}>  {/*displays aria-label incase icon doesn't show up*/}
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Product;
