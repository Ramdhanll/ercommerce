import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'

import useStyles from './styles'

const Product = ({product, onAddToCart}) => {
   const classes = useStyles()

   return (
         <Card className={classes.root}  >
         <CardMedia className={classes.media} image={product.media.source} title={product.name} />
         <CardContent>
            <div className={classes.cardContent}>
               <Typography variant="h6" gutterBottom>
                  {product.name}
               </Typography>
               <Typography variant="h6">
                  {product.price.formatted_with_symbol}
               </Typography>
            </div>
            <Typography 
               variant="body2" 
               color="textSecondary" 
               dangerouslySetInnerHTML={{ 
                  __html: product.description.length > 100 ? 
                     `${product.description.substring(0, 100)}...` : product.description}} />
         </CardContent>
         <CardActions>
            <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
               <AddShoppingCart/>
            </IconButton>
         </CardActions>
      </Card>
   )
}

export default Product
