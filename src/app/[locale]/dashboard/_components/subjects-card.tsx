"use client"
import { useEffect ,useState} from "react";
import Profile from "@/components/common/profile";
import Link from "next/link";
import Image from "next/image";
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
        <div className="Catogries bg-white rounded border-gray-800 shadow-gray-600 px-4 py-3 mt-10 me-10">
 <div  className="flex justify-between">
  <p className="bg-color">Quizes</p>
 </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-10 ">
        {subjects?.map((subject)=>{
  
  return <Link href={`/dashboard/${subject._id}`} key={subject._id}>
  <div className="relative">
    {/* Card info */}
    <div className="absolute bottom-5  text-center w-full  bg-[#4461F2] bg-opacity-80 p-4 text-white">
      <h2 className="text-lg font-bold">{subject.name}</h2>
      <p className="text-sm ">Voluptatem aut</p>
    </div>
    
    {/* Image */}
    <img src={subject.icon} alt='subject' className="w-full h-auto" />
  </div>
</Link>
})}
       </div>
       </div>
        </>

          
       );
}

