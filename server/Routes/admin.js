const express = require('express')
const router = express.Router()

const {postAdminLogin, getApplications, postApprove, postReject, getApprovedForms,
     getRejected, postCreateSlot, getSlots, getSlotBooking, getProgress} = require('../controller/adminController')

router.post('/adminLogin',postAdminLogin)

router.get('/applications',getApplications)

router.post('/applications/approve:id',postApprove)

router.post('/applications/reject:id',postReject)

router.get('/approved',getApprovedForms)

router.get('/rejected',getRejected)

router.post('/create_slot',postCreateSlot)

router.get('/slots',getSlots)

router.get('/slotBooking',getSlotBooking)

router.get('/progress',getProgress)


module.exports=router;