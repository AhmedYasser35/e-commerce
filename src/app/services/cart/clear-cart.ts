"use server"
import { getAccessToken } from "@/schema/access-token";

export async function clearCart() {

    const token:any = await getAccessToken()
    if(!token){
        throw new Error("unauthorized");
    }
    const response=await fetch(`${process.env.API}/cart`,{
        method:'DELETE',
        headers:{
            token:token,
            'content-type':'application/json'
        }
    })
    const payload= await response.json()
 

    return payload
}