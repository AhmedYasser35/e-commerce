"use server"
import { getAccessToken } from "@/schema/access-token";

export async function delWishlistItem(productId:string) {
    console.log(productId)
    const token:any = await getAccessToken()
    if(!token){
        throw new Error("unauthorized");
    }
    const response=await fetch(`${process.env.API}/wishlist/${productId}`,{
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