import React from 'react'
import not from './not-found';
import img from '../../assets/images/error.svg'
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className='flex justify-center items-center'><Image src={img} alt='not found'/></div>
  )
}
