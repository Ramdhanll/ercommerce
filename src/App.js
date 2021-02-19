import React, { useEffect, useState } from 'react'
import { commerce } from './lib/commerce'

import { Navbar, Products, Cart } from './components'

const App = () => {
   const [products, setProducts] = useState([])
   const [cart, setCart] = useState({})

   const fetchProducts = async () => {
      const {data} = await commerce.products.list()
      setProducts(data)
   }

   const fetchCard = async () => {
      setCart(await commerce.cart.retrieve())
   }

   const handleAddToCart = async (productId, quantity) => {
      const item = await commerce.cart.add(productId, quantity)

      setCart(item.cart)
   }

   useEffect(() => {
      fetchProducts()
      fetchCard()
   }, [])

   console.log(cart)
   return (
      <div>
         <Navbar totalItems={cart.total_items} />
         {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
         <Cart cart={cart} />
      </div>
   )
}

export default App
