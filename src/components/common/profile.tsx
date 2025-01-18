"use client"
import React from 'react';
import Image from 'next/image';
import profilePic from '../../../public/assets/Frame 40 (1).png'
function Profile() {
  return (
   
    <div className="containr mx-auto profile grid grid-cols-4 mt-10 me-10 bg-[#FFFFFF] rounded border-gray-800 shadow-gray-500 px-4 py-3">
 <div className="image">
 
<Image src={profilePic} alt="Elevate Logo"></Image>
   
 </div>
 <div className="profileInfo  col-span-2">
    <h3 className="bg-color text-2xl font-bold">Ahmed Mohamed</h3>
    <p className="text-gray-400">Voluptatem aut</p>
   
<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
  <div className="bg-blue-600 h-2.5 rounded-full w-45" ></div>
</div>

 </div>
    </div>
  );
}

export default Profile;
