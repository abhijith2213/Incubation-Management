const mongoose = require('mongoose');


const slotsBooking = new mongoose.Schema({
    slotNo: {
        type: String,
    },
    status: {
        type: Boolean,
        default:false,    
    },
    slotCode: {
        type: String,     
    }
})

const Slotbook= mongoose.model('slots', slotsBooking)

module.exports = Slotbook;