'use server'
import { redirect } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

export default async function Password({email}:{email:string}) {
    console.log(email)
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        body: JSON.stringify({email}),
        headers: {
          "content-type": "application/json",
        },
      },
     );
    const data = await response
    console.log(data)
    if(response.ok){

        redirect('/resetPassword')
    }
  return (
    <div>Password</div>
  )
}
