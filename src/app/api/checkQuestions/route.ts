import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest){
   
   const token=await getToken({req});
   const body=await req.json();
   const time=10;
   const {answers}=body;
    const response=await fetch('https://exam.elevateegy.com/api/v1/questions/check',{
        method:'POST',
        headers:{
           'Content-Type':'application/json' ,
            token:token?.accessToken||"",
        },
        body:JSON.stringify({answers,time})
    });
    const payload=await response.json();
    console.log(payload);
    return NextResponse.json(payload)
   
    
}