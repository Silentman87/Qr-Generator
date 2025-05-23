
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const Register = () => {
  const [userdt, setuserdt] = useState({
    uname: '',
    uemail: '',
    pass: ''
  });

  const handleinputchange = (e) => {
    const { name, value } = e.target;
    setuserdt({
      ...userdt,
      [name]: value
    });
  };

  const handelsubmit = async (e) => {
    e.preventDefault(); // ✅ fixed

    try {
      const res = await axios.post('http://localhost:5000/testuser/reguser', userdt);
      console.log("✅ Server Response:", res.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Registration failed.");
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        <Helmet>
           <title>
             Register page
           </title>
        </Helmet>
      <div className='bg-white shadow-md p-6 rounded-lg w-96'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Registration</h2>

        <input type="text" name="uname" placeholder='Enter your name' onChange={handleinputchange} className='w-full border rounded mb-3' />
        <input type="email" name="uemail" placeholder='Enter your email' onChange={handleinputchange} className='w-full border rounded mb-3' />
        <input type="password" name="pass" placeholder='Enter password' onChange={handleinputchange} className='w-full border rounded mb-3' />

        <button className='w-full bg-blue-300 text-white py-2 font-bold hover:bg-blue-900 rounded' onClick={handelsubmit}>
          Submit
        </button>

        <p>
          Already have an account? <Link to="/login" className='text-red-400 hover:bg-red-300'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
