import React, { useEffect, useState } from 'react'
import { commerce } from './lib/commerce'
import { Navbar, Products, Cart, Checkout } from './components'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const App = () => {
   const [products, setProducts] = useState([])
   const [cart, setCart] = useState({})
   const [order, setOrder] = useState({})
   const [errorMessage, setErrorMessage] = useState('')

   const fetchProducts = async () => {
      const {data} = await commerce.products.list()
      setProducts(data)
   }

   const fetchCard = async () => {
      setCart(await commerce.cart.retrieve())
   }

   const handleAddToCart = async (productId, quantity) => {
      const { cart } = await commerce.cart.add(productId, quantity)
      setCart(cart)
   }

   const handleUpdateCartQty = async (productId, quantity) => {
      const { cart } = await commerce.cart.update(productId, {quantity})
      setCart(cart)
   }

   const handleRemoveFromCart = async (productId) => {
      const { cart } = await commerce.cart.remove(productId)
      setCart(cart)
   }

   const handleEmptyCart = async () => {
      const { cart } = await commerce.cart.empty()
      setCart(cart)
   }

   const refreshCart = async () => {
      const newCart = await commerce.cart.refresh()
      console.log('newcart', newCart)
      setCart(newCart)
   }

   const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
      console.log('running handle capture checkout!')
      refreshCart()

      // try {
      //    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      //    setOrder(incomingOrder)
      //    console.log('incomingOrder', incomingOrder)
      //    refreshCart()
      // } catch (error) {
      //    console.log('error', error)
      //    setErrorMessage(error.data.error.message)
      // }
   }

   useEffect(() => {
      fetchProducts()
      fetchCard()
   }, [])


   return (
      <Router>
         <div>
            <Navbar totalItems={cart.line_items ? cart.line_items.length : 0} />
            <Switch>
               <Route exact path="/">
                  <Products products={products} onAddToCart={handleAddToCart} />
               </Route>
               <Route exact path="/cart">
                  <Cart 
                     cart={cart}
                     handleUpdateCartQty={handleUpdateCartQty}
                     handleRemoveFromCart={handleRemoveFromCart}
                     handleEmptyCart={handleEmptyCart}
                  />
               </Route>
               <Route exact path="/checkout">
                  <Checkout 
                     cart={cart} 
                     order={order}
                     onCaptureCheckout={handleCaptureCheckout}
                     error={errorMessage}
                  />
               </Route>
            </Switch>
         </div>
      </Router>
   )
}

export default App
