import React, {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Progress() {

    const [forms, setForms] = useState([])

    const Navigate = useNavigate()
     /* --------------------------- PROGRESS APPLICATION --------------------------- */
 useEffect(() => {
  
     let admin = localStorage.getItem('admin')
         console.log(admin,'adminnnnn');
     if(admin) Navigate('/admin/progress')
 
     else Navigate('/admin/adminLogin');
 
     axios.get('http://localhost:4000/admin/progress').then((res)=>{
         console.log(res.data,'progress res');
         if(res){
             setForms(res.data)
         }
     }).catch( error => console.log(error))
   
 }, [])
  console.log(forms,'jkl');


  return (
    <div className='w-full'>
         <>
    <div className='w-full h-fit mt-8'>
          <h2 className='text-2xl font-semibold'>Rejected Applications</h2>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg m-4 mt-10 h-fit">  
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    No.
                </th>
                <th scope="col" class="py-3 px-6">
                    Applicant
                </th>
                <th scope="col" class="py-3 px-6">
                    Email
                </th>
                <th scope="col" class="py-3 px-6">
                    Company Name
                </th>
                <th scope="col" class="py-3 px-6">
                   Status
                </th>
                <th scope="col" class="py-3 px-6">
                   Progress
                </th>
                
            </tr>
        </thead>
        <tbody className='text-center'>
          {
            forms.map((data,index)=>{

              return(

                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="py-4 px-6 ">
                    {index +1}
                </td>
                
                <td class="py-4 px-6">
                    {data.name}
                </td>
                <td class="py-4 px-6">
                    {data.email}
                </td>
                <td class="py-4 px-6">
                    {data.company_name}
                </td>
                <td class="py-4 px-6 text-red-400">
                    {data.status}
                </td>
                <td class="py-4 px-6 text-red-400">
                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-900 ">
                    <div class={` h-2.5 rounded-full ${data.status === "approved" ? "w-[75%] bg-blue-600 dark:bg-blue-500" : data.status === "rejected" ? "w-[25%] bg-red-600 dark:bg-red-500" : data.status === "pending" ? "w-[45%] bg-yellow-600 dark:bg-yellow-500" : data.status === "Booked" ? "w-[100%] bg-green-600 dark:bg-green-500": ''}`}></div>
                </div>
                </td>

               
            </tr>
              )
            })
            
            }
        </tbody>
    </table>
</div>
</div>

</>
    </div>
  )
}

export default Progress