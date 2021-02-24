import React, { useEffect, useState } from 'react'

import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'

import { commerce } from '../../lib/commerce'

import FormInput from './CustomTextField'

const AddressForm = ({ checkoutToken }) => {
   const methods = useForm()
   const [shippingCountries, setShippingCountries] = useState([])
   const [shippingCountry, setShippingCountry] = useState('')
   const [shippingSubdivisions, setShippingSubdivisions] = useState([])
   const [shippingSubdivision, setShippingSubdivision] = useState('')
   const [shippingOptions, setShippingOptions] = useState([])
   const [shippingOption, setShippingOption] = useState('')

   useEffect(() => {
      if(checkoutToken) fetchShippingCountries(checkoutToken.id)
      
      // console.log('check', checkoutToken)
   }, [])

   const fetchShippingCountries = async (checkoutTokenId) => {
      const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
      console.log('countries', countries)
      setShippingCountries(countries)
   }

   return (
      <>
         <Typography variant="h6" gutterBottom>Shipping Adress</Typography>
         <FormProvider {...methods}>
            <form onSubmit=''>
               <Grid container spacing={3}>
                  <FormInput required name="firstName" label="First name" />
                  <FormInput required name="lastName" label="Last name" />
                  <FormInput required name="address1" label="Adress" />
                  <FormInput required name="email" label="Email" />
                  <FormInput required name="city" label="City" />
                  <FormInput required name="zip" label="ZIP / Postal code" />

                  {/* <Grid item xs={12} sm={6}>
                     <InputLabel>Shipping Country</InputLabel>
                     <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}>
                           Select Me
                        </MenuItem>
                     </Select>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                     <InputLabel>Shipping Subdivision</InputLabel>
                     <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}>
                           Select Me
                        </MenuItem>
                     </Select>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                     <InputLabel>Shipping Options</InputLabel>
                     <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}>
                           Select Me
                        </MenuItem>
                     </Select>
                  </Grid> */}

               </Grid>
            </form>
         </FormProvider>
      </>
   )
}

export default AddressForm
