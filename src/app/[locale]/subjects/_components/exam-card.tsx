"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function ExamsCard(){
    const [exams,setExams]=useState();
    const id=useParams();
    async function getExams( ){
        const response = await fetch(`http://localhost:3000/api/exams?subject=${id}`)
        const payload = await response.json();
        console.log(payload);
        setExams(payload.exams);
        console.log(exams);
        }
  useEffect(()=>{
      getExams();
  },[])
  return(
    <div>
        exam by catogery
    </div>
  )
  }