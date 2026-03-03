"use server"
import { getAccessToken } from "@/schema/access-token";

export async function updateCart({productId,count}:{productId:string,count:number}) {
    console.log(productId)
    const token:any = await getAccessToken()
    if(!token){
        throw new Error("unauthorized");
    }
    const response=await fetch(`${process.env.API}/cart/${productId}`,{
        method:'PUT',
        headers:{
            token:token,
            'content-type':'application/json'
        },
        body:JSON.stringify({
            count:count
        })
    })
    const payload= await response.json()
 
    console.log(productId)
    return payload
}