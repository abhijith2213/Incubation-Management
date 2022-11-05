import React from 'react'
import AdminHome from '../../components/Admin/AdminHome/AdminHome'

import Sidebar from '../../components/Admin/Sidebar/Sidebar'

function AdminHomePage() {
  return (
    <div className='flex'> 
      
        <Sidebar/>
     

      
        <AdminHome/>
        
           
        
    </div>
  )
}

export default AdminHomePage