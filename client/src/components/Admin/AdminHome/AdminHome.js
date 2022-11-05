import React,{ useState, useEffect , useContext} from 'react'
import axios from 'axios'
import { ApplicationContext } from '../../../Context/ApplicationContext'
import {useNavigate} from 'react-router-dom'
import {confirmAlert} from 'react-confirm-alert'

function AdminHome() {
  const [boolean,setBoolean] =useState(false)
  const {applications, setApplications} = useContext(ApplicationContext)
  const Navigate = useNavigate();
  const [ forms, setForms] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: '', address: '', email: '',
    phone: '', company_name: '', Incubation: '',
    image: '', status: ''
});
 

  /* ---------------------------------- MODAL --------------------------------- */

  const openModal = (id) => {
    forms.filter((obj) => {
        if (obj._id === id) {
            setModalData({
                name: obj.name, address: obj.address, email: obj.email,
                phone: obj.phone, company_name: obj.company_name, Incubation: obj.Incubation,
                image: obj.image, status: obj.status
            })
            setShowModal(true)
        }
    })
}

  

  /* ------------------------------ APPROVE FORM ------------------------------ */

  const approve =(id)=>{
    console.log(id,'itd');
    confirmAlert({
      title: 'Approve Application',
      message: 'Are you sure to Approve this Application.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.post('http://localhost:4000/admin/applications/approve'+id).then((res)=>{
      if(res.status == 200){
        alert('Application Approved')
        setBoolean(!boolean)
      }else{
        alert(`Can't Approve Application, Try Again!`)
      }
    })
          }
        },
        {
          label: 'No',
         
        }
      ]
    });
    
  }

  /* --------------------------- REJECT APPLICATION --------------------------- */

  const reject = (id)=>{
    console.log(id,'id r');
    confirmAlert({
      title: 'Reject Application',
      message: 'Are you sure to Reject this Application.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
      axios.post('http://localhost:4000/admin/applications/reject'+id).then((res)=>{
      if(res.status == 200){
        alert('Application Rejected')
        setBoolean(!boolean)
      }else{
        alert(`Can't Reject Application, Try Again!`)
      }
    })
    }
  },
  {
    label: 'No',
   
  }
]
    });
  }

  /* ------------------------------- USE EFFECT ------------------------------- */

  useEffect(() => {
 console.log('use effect 1');
    axios.get('http://localhost:4000/admin/applications').then((response)=>{
      if(response.data){
        const { data } = response      
          setForms(data)
          setApplications(data)           
      }else{
        alert('some error occured')
      }  
    })
  },[boolean])

 
  

  useEffect(() => {
    console.log('use effect 2');
    let userData = localStorage.getItem('admin')
    console.log(userData,'udata');
    if (userData) {
        Navigate('/admin')
    } else Navigate("/adminLogin")   
  },[]) 
  
    
  return (
    
    <>
    <div className='w-full h-screen '>
    <h2 className='text-2xl font-semibold mt-8'>Applications</h2>
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
                    Company Name
                </th>
                <th scope="col" class="py-3 px-6">
                   Status
                </th>
                <th scope="col" class="py-3 px-6">
                    Action
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
                    {data.company_name}
                </td>
                <td class="py-4 px-6">
                    {data.status}
                </td>
                <td class="py-4 px-6 ">
                  <button type="button" class="  inline-block px-4 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" onClick={(e)=>{openModal(data._id)}} >Open</button>
                  <button type="button" class=" m-2  inline-block px-4 py-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-400 hover:shadow-lg focus:bg-purple-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-200 active:shadow-lg transition duration-150 ease-in-out" onClick={(e)=>{approve(data._id)}} >Approve</button>
                  <button type="button" class="  inline-block px-4 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-400 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" onClick={(e)=>{reject(data._id)}} >REJECT</button>
                  
                </td>
            </tr>
              )
            })
            
            }
        </tbody>
    </table>
</div>

{showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-2xl font-semibold">{modalData.company_name}</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto bg-white-300">
                                    <table>
                                        <tbody className='flex flex-col '>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Applicant : </th>
                                                <td width="200px">{modalData.name}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Email : </th>
                                                <td width="200px">{modalData.email}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Phone : </th>
                                                <td width="200px">{modalData.phone}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%] align-top'>Address : </th>
                                                <td width="200px">{modalData.address}</td>
                                            </tr>
                                          
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Status : </th>
                                                <td width="200px">{modalData.status}</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
</div>
    </>

  )
}

export default AdminHome