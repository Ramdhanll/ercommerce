import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStrip } from '@stripe/stripe-js'

import Review from './Review'

const PaymentForm = ({ shippingData, checkoutToken }) => {
   return (
      <>
         <Review checkoutToken={checkoutToken}>

         </Review>
      </>
   )
}

export default PaymentForm
