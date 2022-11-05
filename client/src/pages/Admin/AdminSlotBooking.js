import React from 'react'
import BookingSlots from '../../components/Admin/BookingSlots/BookingSlots'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'

function AdminSlotBooking() {
  return (
    <div className='flex'>
        <Sidebar/>
        <BookingSlots/>
    </div>
  )
}

export default AdminSlotBooking