import React from 'react'
import Rejected from '../../components/Admin/Rejected/Rejected'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'

function AdminRejectedPage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <Rejected/>
    </div>
  )
}

export default AdminRejectedPage