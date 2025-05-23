import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Correct package
import { FaBars, FaTimes } from 'react-icons/fa';


const Navbar = () => {
     const [isopen,setisopen] = useState(false);
  return (
    <nav className='bg-gray-800 p-4 shadow-md'> {/* ✅ 'shhadow-md' typo fixed */}
      <div className='container mx-auto flex justify-between items-center'>
        <Link to="/dashboard" className='text-white text-xl font-bold'> {/* ✅ Correct class and tag structure */}
          QR Generator
        </Link>
         
         <ul className='hidden md:flex space-x-6 text-white'> {/* ✅ 'md-flex' corrected to 'md:flex' */}
        
         <Link to="/dashboard" className='hover:text-gray-400'>Dashboard</Link>
         <Link to="/loginqr" className='hover:text-gray-400'>Add link</Link>
         <Link to="/showqr" className='hover:text-gray-400'>Show Qr</Link>
          </ul>
          
             <button className='text-white text-2xl ' onClick={()=> setisopen(!isopen)}>
         {isopen?<FaTimes/>:<FaBars/>}
      </button>
      </div>

        {isopen &&  (<ul className='mx-hidden bg-gray-800 text-white p-4 space-y-4 absolute ml-0 w-full shadow-md'> 

            <Link to="/dashboard" className='block py-2' onClick={()=>setisopen(false)}>Dashboard</Link>
     
            <Link to="/loginqr" className='block py-2' onClick={()=>setisopen(false)}>Add link</Link>
         <Link to="/showqr" className='block py-2' onClick={()=>setisopen(false)}>Show Qr</Link>

        </ul>)}
    </nav>
  );
};

export default Navbar;
