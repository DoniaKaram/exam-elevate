import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('subject'); 
   const token=await getToken({req});
    const response=await fetch(`https://exam.elevateegy.com/api/v1/exams?subject=${id}`,{
        headers:{
            token:token?.accessToken||"",
        }
    });
    const payload=await response.json();
    console.log(payload);
    return NextResponse.json(payload)
   
    
}