const express = require('express');
const { postSignup,postSignin, Posthome, Gethome, PostrefreshToken, postLogout, postApplication, getApplicationForm} = require('../controller/userController');
const router = express.Router()
const {protect} = require('../middlewares/authMiddleware')

router.post("/signup",postSignup)


router.post('/signin',postSignin)

router.post('/',protect,Posthome)

router.post('/logout',protect,postLogout)

router.post('/refreshToken',PostrefreshToken)

router.get('/applicationForm/:id',getApplicationForm)


router.post('/application/:id',postApplication)


module.exports=router;