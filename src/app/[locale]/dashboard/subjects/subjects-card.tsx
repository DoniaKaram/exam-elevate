"use client"

import { useEffect ,useState} from "react";

    
    function Subjects(){
        const [subjects,setSubjects]=useState([]);
       useEffect(()=>{
          getSubjects();  
       },[]);
      async function getSubjects( ){
       const response = await fetch("http://localhost:3000/api/subjects")
       const payload = await response.json();
       console.log(payload);
       setSubjects(payload);
       }
       console.log(subjects);
}
export default Subjects;
