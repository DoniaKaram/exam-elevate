import React from 'react';

function Nav() {
  return (
    <nav className="flex justify-between items-center mt-10">
  
    
   <div className="w-1/2">
   <input type="search" placeholder="search quiz" className="border-0 outline-0 rounded w-full shadow-gray-900 cols-span-2"/>
   </div>
  
       
      
       <div className="">
       <button className="rounded text-white bg-[#4461F2] px-3 py-2 ">start quiz</button>
       </div>
     
            
            <div className="">
            <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
            </div>
        
             
           
         
        
  

</nav>
  );
}

export default Nav;
