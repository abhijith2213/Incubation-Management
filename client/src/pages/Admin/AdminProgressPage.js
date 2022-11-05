import React from 'react'
import Progress from '../../components/Admin/Progress/Progress'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'

function AdminProgressPage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <Progress/>
    </div>
  )
}

export default AdminProgressPage