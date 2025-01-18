"use client"

function Nav() {
  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-white shadow-md md:px-10">
  
    
  <div className="flex-1 max-w-xs">
        <input
          type="search"
          placeholder="Search quiz"
          className="w-full p-2 border rounded-full outline-none shadow-gray-300 focus:ring-2 focus:ring-blue-400"
        />
      </div>
       
      
      

{/* Start Quiz Button */}
<div className="flex-shrink-0 mx-2">
  <button className="rounded-full text-white bg-blue-500 px-4 py-2 hover:bg-blue-600 transition">
    Start Quiz
  </button>
</div>

     
<div className="flex-shrink-0 ml-2">
        <img
          className="w-10 h-10 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user photo"
        />
      </div>
</nav>
  );
}

export default Nav;
