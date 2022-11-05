import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import {UserContext} from '../../../Context/UserContext'
import axios from 'axios'

function Application() {

    const navigate=useNavigate()

    const logout = () => {
        alert('Are you Sure to Logout?')
        localStorage.removeItem('user');
        setUserDetails(null)
        removeCookie("token");
        navigate("/signin");
    };
    
    const [errorMessage, setErrorMessage] = useState('')
    const { userDetails, setUserDetails ,removeCookie} = useContext(UserContext)
    const [application, setApplication] = useState({
      name: "",
      phone: "",
      email: "",
      address: "",
      company_name: "",
    })

    function handleChange(e){ 
       console.log(e.target.value);
        setApplication({ ...application, [e.target.name]: e.target.value })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!application.name){
            setErrorMessage("Name is required")
          } else if (application.name.length < 3) {
            setErrorMessage("Name must be atleast 3 characters");
          } else if (!application.name.match(/^[A-Za-z][A-Za-z ]*$/)) {
            setErrorMessage("Enter a valid name");
          } 
          else if (!application.address) {
            setErrorMessage("Address is required");
          }
          else if (!application.email) {
            setErrorMessage("Email is required");
          } else if (!application.email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
            setErrorMessage("Enter a valid email");
         
          }else if (!application.phone) {
            setErrorMessage("Phone is required");
          } else if (application.phone.match(/[^0-9]/g)) {
            setErrorMessage("Enter a valid Phone number");
          } else if (application.phone.length !== 10) {
            setErrorMessage("Phone must be 10 characters");
          }   else if (!application.company_name) {
            setErrorMessage("Company name is required");
          }  else{
            console.log(userDetails._id,'userdetails');
            axios.post(`http://localhost:4000/application/${userDetails._id}`,{...application})
            .then((response) => {
              console.log(response,'responseerrr');
              
                
                console.log(response.data,'its response');
                console.log(response.data , "this is response after update");
                navigate('/success')
              
            }).catch((err) => { 
              alert('Your One Application Already In pending.... Please try again later') 
                console.log('error')
            })
          }
       }
    

    


  return (
    
    <div className="p-10  justify-center">
    <button onClick={logout} type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out float-right">Log Out</button>
<div className='flex justify-center'>
  <div className='flex justify-center border rounded-lg w-fit bg-gradient-to-r from-violet-500 to-fuchsia-500'>

    <form className='m-20 '  >
        <h1 className='text-blue-600 font-bold text-2xl mb-8 border-b-2  border-blue-300'>Application Form </h1>
                  <div className="grid-cols-1   w-full flex-col md:grid-cols-2 gap-2 p-5">
                      <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                          <input type="text" name="name"     id="name" placeholder='Name *' onChange={(e)=>{handleChange(e)} }  className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
                      </div>
                      <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                          <input type="text" name="address"  onChange={(e)=>{handleChange(e)} }  id="address" placeholder='Address*' className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
                      </div>
                   
                      <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                          <input type="text" name="email"   onChange={(e)=>{handleChange(e)} }  id="email" placeholder='Email *' className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
                      </div>
                      <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                          <input type="text" name="phone"  onChange={(e)=>{handleChange(e)} }  id="phone" placeholder='Phone no*' className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
                      </div>
                     <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                          <input type="text" name="company_name"   onChange={(e)=>{handleChange(e)} }  id="company_name" placeholder='Company Name*' className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
                      </div>
                     


                     
                  </div>
                  {errorMessage && <div className="p-2 mb-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>}
                  <div className='px-5 w-fit mx-auto pb-5'>
                      <button onClick={(e)=>handleSubmit(e)}  className='border-2 text-blue-800 border-blue-200 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-400 hover:text-white'>Submit</button>
                  </div>
                 

              </form>
</div>
</div>
</div>

)
  
}

export default Application