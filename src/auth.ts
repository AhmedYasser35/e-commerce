import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { json } from "zod";
import { FailedLogin, SuccessLogin } from "./app/types/authInterface";

export const authOptions:NextAuthOptions = {
    pages:{
        signIn:'/login'
    },
    providers :[
        Credentials({
            name:'credentials',
            credentials:{
                email :{},
                password :{}
            },
            authorize:async(credentials)=>{
                    const response= await fetch(`${process.env.API}/auth/signin` , {
                        method:"POST",
                        body:JSON.stringify({
                            email:credentials?.email ,
                            password:credentials?.password
                        }),
                        headers:{
                            "Content-type":'application/json'
                        }
                    })
                    const payload:SuccessLogin|FailedLogin= await response.json()
                    console.log(payload)
                    if('token' in payload){
                        return{
                            id:payload.user.email,
                            user:payload.user,
                            token:payload.token
                        }
                    }else{
                        throw new Error("Incorrect email or password");
                    }
            }
        })
    ]

}