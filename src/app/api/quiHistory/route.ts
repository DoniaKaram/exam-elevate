import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
   const token=await getToken({req});
    const response=await fetch('https://exam.elevateegy.com/api/v1/questions/history',{
        headers:{
            token:token?.accessToken||"",
        }
    });
    const payload=await response.json();
    console.log(payload);
    return NextResponse.json(payload)
   
    
}