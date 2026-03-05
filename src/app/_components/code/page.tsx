'use server'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Code({code}:{code:string}) {
        console.log(code)
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
          {
            method: "POST",
            body: JSON.stringify({ code }),
            headers: {
              "content-type": "application/json",
            },
          },
        );
    
            redirect('/login')

    
  return (
    <div>Code</div>
  )
}
