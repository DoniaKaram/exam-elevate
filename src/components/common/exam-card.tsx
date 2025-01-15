"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import StartModal from "./start-modal";
export default function ExamsCard(){
    const [exams,setExams]=useState<Exam[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const openModal=()=>setIsModalVisible(true);
    const subject=useParams();
    console.log(subject.id)
    async function getExams( ){
        const response = await fetch(`http://localhost:3000/api/exams?subject=${subject.id}`)
        const payload = await response.json();
        console.log(payload);
        setExams(payload.exams);
        console.log(exams);
        }
  useEffect(()=>{
      getExams();
  },[])
  return(
    <>
         <h5>Front-End Quiz</h5>
         {exams?.map((exam)=>{
  
  return <div className="bg-white px-3 py-2 flex justify-between items-center shadow-gray-900 m-10"  key={exam._id}> 
           <div className="flex flex-col justify-center items-center">
              <p>{exam.title}</p>
              <p>{exam.numberOfQuestions}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
            <p>{exam.duration}</p>
              <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={openModal}
                type="button"
              >
                Start Quiz
              </button >
              {isModalVisible&&(
                <StartModal examId={exam._id}/>
              )}
            </div>
        </div>
})}
   </>
  );
 }
