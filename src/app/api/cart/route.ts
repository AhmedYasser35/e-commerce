import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const token = await getToken({req})
    console.log('the full token', token)
    if(!token|| typeof token.token !=='string'){
        return NextResponse.json({error:'unauthorized' , status:401})
    }
    const resp = await fetch(`${process.env.API}/cart`,{
        method:'GET',
        headers:{
            token:token.token,
            'content-type':'application/json'
        }
    })
    const payload = await resp.json()
    return NextResponse.json(payload)
}