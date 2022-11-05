import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../../Context/UserContext'
import { ApplicationContext } from '../../../Context/ApplicationContext'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Rejected() {

    const Navigate = useNavigate()
    const { applications, setApplications } = useContext(ApplicationContext)
    const [forms, setForms]=useState([])

    useEffect(() => {
        console.log('use effecttt');
      let admin = localStorage.getItem('admin')
      console.log(admin,'admin');
      if(admin){
        console.log('dfghj');
        Navigate('/admin/rejected')
      }else Navigate("/adminLogin")
        axios.get('http://localhost:4000/admin/rejected').then((res)=>{
            if(res){
                setApplications(res.data)
                setForms(res.data)
                console.log(res.data,'dataa res ');
            }
        })
      
    
      
    }, [Navigate])

    /* --------------------------- REJECT APPLICATION --------------------------- */

    


    

  return (
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
                    User Id
                </th>
                <th scope="col" class="py-3 px-6">
                    Applicant
                </th>
                <th scope="col" class="py-3 px-6">
                    Company Name
                </th>
                <th scope="col" class="py-3 px-6">
                   Status
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
                <td class="py-4 px-6 ">
                    {data.userId}
                </td>
                <td class="py-4 px-6">
                    {data.name}
                </td>
                <td class="py-4 px-6">
                    {data.company_name}
                </td>
                <td class="py-4 px-6 text-red-400">
                    {data.status}
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
  )
}

export default Rejected