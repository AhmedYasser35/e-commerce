"use server"
import { getAccessToken } from "@/schema/access-token";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers"

export async function addToCart(productId:any) {
    const Id=productId.productId
    const token:any = await getAccessToken()
    if(!token){
        throw new Error("unauthorized");
    }
    const response=await fetch(`${process.env.API}/cart`,{
        cache:'no-store',
        method:'POST',
        headers:{
            token:token,
            'content-type':'application/json'
        },
        body:JSON.stringify({
            productId:Id
        })
    })
    const payload= await response.json()
    console.log(payload)
    return payload
}