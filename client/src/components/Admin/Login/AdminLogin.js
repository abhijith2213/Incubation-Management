import React,{ useState, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../../Context/UserContext'


function AdminLogin() {

    const initialValues={email:'',password:''}
    const [formValues,setFormValues]=useState(initialValues)
    const [errorMsg,setErrorMsg] = useState('')
    const {userDetails, setUserDetails, setCookie}= useContext(UserContext)
  
    const navigate=useNavigate()

    const handleChange=(e)=>{
        e.preventDefault()
        const{name,value}= e.target
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit=async (e)=>{
        console.log('in handle submit');
        e.preventDefault()
        try {
            if(!formValues.email){
                setErrorMsg('Email is Required!')
            }else if(!formValues.password){
                setErrorMsg('Password cannot be empty')
            }else{
             const {data} = await  axios.post('http://localhost:4000/admin/adminLogin',{...formValues})
             console.log(data,'admin Login response');
             if(data){
                if(data?.admin){
                    console.log('in Admin Data',data.admin);
                    let token = data.token
                    setCookie('AdminToken',token, {path:'/'})
                    localStorage.setItem('admin', JSON.stringify(data.admin))
                    navigate("/admin")
                }else{
                    setErrorMsg(data)
                }
             }else{
                setErrorMsg('Something Went wrong!')
             }
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
   
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-purple-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
                   Sign in
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800">
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                         name='email' value={formValues.email} onChange={handleChange}/>
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          name='password' value={formValues.password} onChange={handleChange}/>
                    </div>
                    
                    <div className="mt-6">
                        {errorMsg && <p className=" mb-4 text-sm text-red-700  rounded-lg  dark:text-red-800" role="alert">{errorMsg}</p>}
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                         >
                            Login
                        </button>
                    </div>
                </form>

                
            </div>
        </div>
    );
  
}

export default AdminLogin