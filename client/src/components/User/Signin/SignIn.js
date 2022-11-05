import React,{ useState, useContext, useEffect } from 'react'
import trees from '../../../assets/trees.jpg'
import {Link , Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';


function SignIn() { 

  const url ='http://localhost:4000'

 
  const navigate = useNavigate()

  const initialFormValues ={email:'',password:''}
  const [formValues,setFormValues] = useState(initialFormValues)
  const {userDetails, setUserDetails, setCookie, cookies}=useContext(UserContext)
  const [errorMessage, setErrorMessage] = useState('')


  useEffect( () => {

    axios.post(url,{...cookies}).then((res)=>{
      console.log(res.data,'dataa');
      const goToHomePage = () => navigate('/');
      if(res.data.status == 'error' ){
        console.log('JWT ERROR, Signin to Continue');             
      }else{
        console.log('login success no issue');
        goToHomePage()
      }
    })
   
   },[navigate])


  const handleChange=(e)=>{
    const {name,value} = e.target;
    setFormValues({...formValues, [name]: value})
  }

  const handleSubmit = async(e)=>{
      e.preventDefault()
      try {

        if(!formValues.email){
          setErrorMessage("Email is required");
        } else if (!formValues.password) {
        setErrorMessage("Password is required");
        } else{
          console.log(userDetails,'userDetails');
          const res = await axios.post('http://localhost:4000/signin',{...formValues})
          console.log('axios result');
              console.log(res.data,'req send');
              let token = res.data.token
              console.log(token);
              if(res){
                console.log(res.data.user);
                console.log('in res');
                if(res.data.user){
                  console.log(res.data.user);
                  setCookie('token',token, {path: '/' })
                  localStorage.setItem('user', JSON.stringify(res.data.user))
                  let user = res.data.user
                  setUserDetails(user)
                  if(user){
                    navigate("/");
                  }
                }else{
                  console.log('in else res,o');
                  console.log(res.data,'resooo');
                  setErrorMessage(res.data)
                }
              }else{
                setErrorMessage('Something went wrong')
              }
             
        }
              
                      
      } catch (error) {
        // alert(error.message)
        console.log(error);
        
      }
     

        // const authAxios = axios.create({
        //   baseURL:url ,
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
          
        // })
        // authAxios.get('http://localhost:4000').then((res)=>{
        //   console.log(res,'resoooooopppppp');
        //   if(res.status){
        //     navigate('/') 
        //   }
        // })
     

  }


  return (
    <div className="w-full h-screen flex">
    <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]">
      <div className="w-full h-[550px] hidden md:block">
        <img className="w-full h-full" src={trees} alt="logo" />
      </div>
      <div className="p-4 flex flex-col justify-around">
        <form onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold text-center mb-8">Login</h2>
          <div className="flex flex-col">
          {errorMessage && <p className="p-3 mb-4 text-sm text-red-700 bg-red-200 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</p>}
              <div className="mb-3">
                  <label htmlFor="username" className="flex flex-col mb-2">Email</label>
                  <input className="border p-2 " name='email' type="email" placeholder="email..." value={formValues.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                  <label htmlFor="username" className="flex flex-col mb-2">Password</label>
                  <input className="border p-2 " name='password' type="password" placeholder="password..." value={formValues.password} onChange={handleChange} />
              </div>
          </div>
          <button className="w-full py-2 my-4 bg-green-600 hover:bg-green-400">Sign In</button>
          {/* <p className="text-center">Forgot Username or Password?</p> */}
        </form>
        <Link to={'/signup'}><p className="text-center">Sign Up</p></Link>
        
      </div>
    </div>
  </div>
  )
}

export default SignIn