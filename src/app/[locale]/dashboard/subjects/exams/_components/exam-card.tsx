"use client"
import { useEffect, useState } from "react";
export default function ExamsCard(){
    const [exams,setExams]=useState();
    async function getExams( ){
        const response = await fetch(`http://localhost:3000/api/exams?examById`)
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