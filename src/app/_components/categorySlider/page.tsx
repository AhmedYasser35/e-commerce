import { Category } from '@/app/types/productInterface'
import React from 'react'
import Slider from '../slider/page'

export default async function CategorySlider() {
    const response = await fetch(`${process.env.API}/categories`)
    const payload = await response.json()
    const categories:Category[] = payload.data
  return (
    <Slider categories={categories}/>
  )
}
