"use client"

import { useEffect ,useState} from "react";
import Profile from "@/components/common/profile";
import Link from "next/link";
export default  function Subjects(){

        const [subjects,setSubjects]=useState<Subject[]>([]);
        async function getSubjects( ){
            const response = await fetch("http://localhost:3000/api/subjects")
            const payload = await response.json();
            console.log(payload);
            setSubjects(payload.subjects);
            }
       useEffect(()=>{
          getSubjects();  
       },[]);
      
       console.log(subjects);
       return(
 
        <>
         <div>
            <Profile></Profile>
         </div>
        <div className="Catogries bg-white rounded border-gray-800 shadow-gray px-4 py-3 mt-10 me-10 shadow-gray-900">
 <div  className="flex justify-between">
  <p className="bg-color">Quizes</p>
 </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-10 ">
        {subjects?.map((subject)=>{
  
  return <Link href={`${subject._id}`} key={subject._id}><div key={subject._id}>
        <img src={subject.icon} alt="exam_img" />
        <div className="card-info bg-[#1935CA66] p-3 text-white ">
           <h3 className="font-bold">{subject.name}</h3>
           <p>Voluptatem aut</p>
        </div>
  </div></Link>
})}
       </div>
       </div>
        </>

          
       );
}

