"use server"
import { getAccessToken } from "@/schema/access-token";
import { NextResponse } from "next/server";

export async function delCartItem(productId:string) {
    console.log(productId)
    const token:any = await getAccessToken()
    if(!token|| typeof token.token !=='string'){
            return NextResponse.json({error:'unauthorized' , status:401})
        }
    const response=await fetch(`${process.env.API}/cart/${productId}`,{
        method:'DELETE',
        headers:{
            token:token,
            'content-type':'application/json'
        }
    })
    const payload= await response.json()
 
    console.log(productId)
    return payload
}