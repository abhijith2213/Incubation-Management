
const applicationForm = require("../model/applicationSchema")
const jwt = require('jsonwebtoken')
const slotsbooking = require('../model/Slot') 


/* ----------------------------- GENERATE TOKEN ----------------------------- */

// ACCESS TOKEn
const generateToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15m'
    })
}

/* ----------------------------- ADMINLOGIN POST ---------------------------- */

const postAdminLogin = async (req,res)=>{
    try {
        console.log(req.body,'adminlogin req.body');
        const adminMail = process.env.ADMIN_NAME
        const adminPass = process.env.ADMIN_PASS
        
        console.log(adminPass,'adminnnnnn');
        if(adminMail === req.body.email){
            console.log("email OK");
            if(adminPass === req.body.password){
                console.log('pass OK');
                const id = '3sedyrf678a'
                const token = generateToken(id)
                res.json({admin:true,token})
            }else{
                res.json('Incorrect Password')
            }
        }else{
            res.json('Email Is not Valid No details found!')
        }
        

    } catch (error) {
        
    }
}

const getApplications =async(req,res)=>{
    try {
        applicationForm.find({status:"pending"}).then((data)=>{
            res.json(data)
        }).catch((err)=>{
            res.json(err)
        })
    } catch (error) {
        res.json('something went wrong')
    }
}

const postApprove = async(req,res)=>{
    try {
        applicationForm.findByIdAndUpdate({_id: req.params.id },
            {
                $set : {status: "approved"}
            }).then((res)=>{
                if(res) res.status(200).json({update:true})
            }).catch((err)=>{
                res.json(err.message)
            })
    } catch (error) {
        res.json(error)
    }
}
const postReject = async (req,res)=>{
    try {
        applicationForm.findByIdAndUpdate({_id: req.params.id},
            {
                $set: {status :"rejected"}
            }).then((res)=>{
                if(res) res.status(200).json({update:true})
            }).catch(err=>{
                res.json(err.message)
            })
    } catch (error) {
        res.json(error)
    }
}

const getApprovedForms =async (req,res)=>{

    try {
        console.log('heloo approved');
        applicationForm.find({status :"approved"}).then(response=>{
            console.log(response);
            res.status(200).json(response)          
        }).catch((err)=>{
            console.log('hhhhhhhh');
            res.json(err)
        })
    } catch (error) {
        console.log("try catc");
        res.json(error)
    }
}

const getRejected = async (req,res)=>{
    try {
        console.log('heloo rejected');
        applicationForm.find({status :"rejected"}).then(response=>{
            console.log(response);
            res.status(200).json(response)          
        }).catch((err)=>{
            console.log('hhhuuhhhhh');
            res.json(err)
        })
    } catch (error) {
        res.json(error)
    }
}

const postCreateSlot = async (req,res)=>{
    console.log(req.body.slotNo,'reached route creare');
    try {
        let slot =await slotsbooking.findOne({slotNo:req.body.slotNo})
        if(slot){
                res.status(401).json('Slot No already exist')
        }else{
            const createSlot = new slotsbooking({
                slotCode:req.body.slotCode,
                slotNo:req.body.slotNo 
            })
            await createSlot.save()
            res.json({res:createSlot})
        }
    } catch (error) {
        res.json(error)
        console.log(error,'create slot error');
    }
}

const getSlots = async (req,res)=>{
    console.log('reached slots get');
    try {
        slotsbooking.find().then((response)=>{
            res.status(200).json(response)
        }).catch((err)=>{
            res.json(err)
            console.log(err,'in err');
        })
    } catch (error) {
        res.json(error)
        console.log(error);
    }
}


const getSlotBooking = async(req,res)=>{

console.log('reached slot booking get');

try {
    applicationForm.findOneAndUpdate({_id:req.query.companyId},
    {
            $set:{status:"Booked"}
    }).then((response)=>{
        slotsbooking.findOneAndUpdate({slotNo:req.query.slotId},
            {
                $set:{
                    "bookedId":req.query.companyId,
                    "status":true
                }
            }).then((response)=>{
                res.status(200).json(response)
            }).catch(err=>res.json(err))
    }).catch(err=>res.json(err))
} catch (error) {
    res.json(error)
}

}

const getProgress = async(req,res)=>{
    try {
        console.log('call reached progress');
        applicationForm.find().then((response)=>{
            console.log(response);
            res.status(200).json(response)
        }).catch(error=> res.json(error))
    } catch (error) {
        res.json(error)
    }
}

module.exports ={postAdminLogin, getApplications, postApprove, postReject,
     getApprovedForms, getRejected, postCreateSlot, getSlots,getSlotBooking, getProgress}