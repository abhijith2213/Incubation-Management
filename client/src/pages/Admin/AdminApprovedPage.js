import React from 'react'
import Approved from '../../components/Admin/Approved/Approved'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'

function AdminApprovedPage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <Approved/>
    </div>
  )
}

export default AdminApprovedPage