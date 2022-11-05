import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import './Home.css'
import success from '../../../assets/Success.jpg'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';


function Home() {

  const {setUserDetails, userDetails, removeCookie, cookies}=useContext(UserContext)
  const Navigate= useNavigate()

  /* --------------------------------- LOGOUT --------------------------------- */

  const logout = () => {
    console.log('on logout');
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            console.log('yess');
            localStorage.removeItem('user');
            setUserDetails(null)
            removeCookie("token");
            Navigate("/signin");
          }
        },
        {
          label: 'No',
          
        }
      ]
    });
    
  };



const url ='http://localhost:4000'



/* -------------------------- GET APPLICATION FORM -------------------------- */

const getApplicationForm= ()=>{
  console.log('in get application form');
  axios.get(`http://localhost:4000/applicationForm/${userDetails._id}`).then((res)=>{
    console.log(res);
   
      Navigate("/Application")
    
  }).catch((err)=>{
    console.log(err);
    alert(err.response.data)
  })

}

useEffect( () => {
  console.log(cookies,'cookieees');
  axios.post(url,{...cookies}).then((res)=>{
    console.log(res.data,'dataa');
    const goToHomePage = () => Navigate('/');
    if(res.data.status == 'error' ){
      console.log('JWT ERROR, Signin to Continue');
      setUserDetails(null)
      removeCookie("token");             
    }else{
      console.log('login success no issue');
      goToHomePage()
    }
  })
 
 },[Navigate])


  

   
    
  return (

    <div className='home h-screen'>
      <div className='flex justify-end p-3'>
        {userDetails ?
      <button onClick={logout} type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Log Out</button> : 
      <Link to='/signin'><button  type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Login</button></Link>
    }
      </div>
     <h1 className='text-3xl text-purple-600 font-bold m-1'> {userDetails ? `Hey,Welcome ${userDetails.name}`:'Welcome Entrepreneurs'}!</h1> 
      <h3 className='text-xl m-5'> Share your Million dollar Ideas!</h3>
      {userDetails ?
      <div>
       <button type="button" class="inline-block px-6 py-2.5 m-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={getApplicationForm}>Click Here</button>
      <p>For Application Form !</p>
      </div>:
      <div>
         <p className='p-3'>Login for Application form </p>

    <Link to='/signin'><button  type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Login</button></Link>

      </div>
     
}
      <div className=' flex  justify-center'>
      <img className='bgImg w-screen h-screen' src={success}></img>       
      </div>
    </div>

  )
}



export default Home