import React from 'react'
import CreateSlot from '../../components/Admin/CreateSlot/CreateSlot'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'

function AdminCreateSlot() {
  return (
    <div className='flex'>
        <Sidebar/>
        <CreateSlot/>
    </div>
  )
}

export default AdminCreateSlot