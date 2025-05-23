import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    
  const navigate = useNavigate();
    const [error, setError] = React.useState("");

        const msg = () => {
            toast.error(error || "An error occurred", {
                 position: "top-right",
                  autoClose: 2000,
                    hideProgressBar: false,
                       closeOnClick: true,
                         pauseOnHover: false,
                      draggable: true,
                       theme: "dark",
            });
        };
     
    const [userdt,setuserdt] = React.useState({
         uemail: '',
         pass: ''

    });

    const handleinputtchange = (e) => {
        const  {name,value} = e.target;
        setuserdt({
            ...userdt,
            [name]: value
        })
    }
    console.log("Login payload:", userdt);


    const  handelsubmit = async(e) => {
        e.preventDefault();

        try{
            const logindt = await axios.post('http://localhost:5000/testuser/loguser', userdt)
             
            if(logindt.data.loginsts==="0"){
               localStorage.setItem("utoken",logindt.data.token);
               toast.success("Login successful!");
               navigate('/dashboard');
            }
            else
            {
               setError(logindt.data.msg); 
                msg();

            }
        }
        catch(error){
          
            console.error("❌ Error:", error);
             toast.error("Something went wrong. Please try again.");
        }
    }

  return (
     <div className='flex justify-center items-center h-screen bg-gray-100'>
      <Helmet>
          <title> login page</title>
      </Helmet>
      
        <div className='bg-white shadow-md p-6 rounded-lg w-96'> 
            <h2 className='text-2xl font-bold mb-4 text-center'>Login </h2>


            <input type="email" name="uemail" id="" placeholder='enter your email' required className='w-full border rounded mb-3' onChange={handleinputtchange}/>


           <input type="password" name="pass" id="" placeholder='enter password' required className='w-full border rounded mb-3' onChange={handleinputtchange}/>

           <button className='w-full bg-yellow-300 text-white py-2 font-bold hover:bg-blue-900 rounded' onClick={handelsubmit}>
             Submit
           </button>




        

           <p>
             dont have account yet
             <Link to={"/register"} className='text-red-400  hover:bg-red-300' >register </Link>
             
           </p>
        </div>
      
    </div>
  )

}
export default Login;
