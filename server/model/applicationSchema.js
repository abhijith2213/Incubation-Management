const mongoose = require('mongoose')

const applicationForm = new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    company_name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default:"pending",
        required: true,
    }
})

const ApplicationModel = mongoose.model('application',applicationForm)

module.exports = ApplicationModel