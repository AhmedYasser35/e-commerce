'use server'
import React from 'react'
import { CartResponse } from '../types/cart-response'
import Allorders from './page'

export default async function GetData(cartdata:CartResponse) {
    const id:string = await cartdata.data.cartOwner
    console.log('cart id is here',id)
    return (
      <Allorders id={id}/>
  )
}
