import React,{useState} from "react";
import trees from '../../../assets/trees.jpg';
import {Link, useNavigate} from 'react-router-dom';
import axios from '../../../axios'

// import axios from 'axios'

function Signup() {
    const navigate = useNavigate()

    const initialValues = {name:'',email:'',phone:'',password:''}
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({})

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setFormValues({...formValues, [name]:value})
        console.log(formValues);
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        let error = validateForm(formValues)
        setFormErrors(error)
        if(Object.keys(error).length == 0){
          axios.post('/signup',{...formValues}).then(()=>{
              navigate('/signin') 
            })
        }
    }

    const validateForm=(values)=>{

      const errors ={};
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const userRegex = /^[A-Za-z0-9_-]{3,15}$/
  
      if(!values.name){
        errors.name = "Username is required"
      }else if(!userRegex.test(values.name)){
        errors.name= 'Enter a valid username'
      }
  
      if(!values.email){
        errors.email = "email is required"
      }else if(!regex.test(values.email)){
        errors.email='Enter a valid email'
      }
  
      if(!values.phone){
        errors.phone = "phone is required"
      }else if(values.phone.length !== 10){
        errors.phone = "phone must be 10 digits"
      }
      if(!values.password){
        errors.password = "password is required"
      }else if(values.password.length <6){
        errors.password ='Password must be more than 6 characters'
      }else if(values.password.length >10){
        errors.password ='Password cannot exceed more than 10 characters'
      }
  
      return errors;
      
    }

  return (
    <div className="w-full h-screen flex ">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-min shadow-lg shadow-gray-600 sm:max-w-[900px]">
        <div className="w-full h-min hidden md:block">
          <img className="w-full h-full" src={trees} alt="logo" />
        </div>
        <div className="p-4 flex flex-col justify-around">
          <form onSubmit={handleSubmit}>
            <h2 className="text-4xl font-bold text-center mb-8">Sign Up</h2>
            <div className="flex flex-col">
                <div className="mb-3">
                    <label htmlFor="username" className="flex flex-col mb-2">Username</label>
                    <input className="border p-2" name="name" type="text" placeholder="username..." value={formValues.userName} onChange={handleChange}/>
                    <p className='text-red-600'>{formErrors.name}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="flex flex-col mb-2">Email</label>
                    <input className="border p-2" name="email" type="email" placeholder="Email.." value={formValues.email} onChange={handleChange}/>
                    <p className='text-red-600'>{formErrors.email}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="flex flex-col mb-2">Phone</label>
                    <input className="border p-2" name="phone" type="number" placeholder="phone.." value={formValues.phone} onChange={handleChange}/>
                    <p className='text-red-600'>{formErrors.phone}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="flex flex-col mb-2">Password</label>
                    <input className="border p-2 " name="password" type="password" placeholder="password..." value={formValues.password} onChange={handleChange}/>
                    <p className='text-red-600'>{formErrors.password}</p>
                </div>
            </div>
            <button className="w-full py-2 my-4 bg-green-600 hover:bg-green-400">Sign Up</button>
          </form>
          <Link to={'/signin'}><p className="text-center mb-9">Sign In</p></Link>
         
          
        </div>
      </div>
    </div>
  );
}

export default Signup;
