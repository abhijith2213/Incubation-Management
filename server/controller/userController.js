const User = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const applicationForm = require('../model/applicationSchema')

let refreshTokens =[]
/* ------------------------------- SIGNUP POST ------------------------------ */

const postSignup =async (req,res)=>{
    try{
        console.log(req.body,'req.bodyyyyy');
        let {name,phone,email,password} = req.body
        const userExist = await User.findOne({email})
        if(userExist){
            res.status(400)
            throw new Error('User already exist with mail id')
        }else{
            password = await bcrypt.hash(password,10)
            User.create({
                name,
                phone,
                email,
                password
            }).then((response)=>{
                console.log(response);
                res.json({user:response._id})
            }).catch((err)=>{
                console.log(err);
            })
        }
        }catch(error){
            res.json('Something went wrong')
        }       
}

/* ------------------------------- SIGNIN POST ------------------------------ */

const postSignin = async (req,res)=>{
    try {
        console.log(req.body,'ji');
        let {email,password}=req.body

        const user = await User.findOne({email})
        if(user){
            console.log('mail valid');
            
         const pass =   await bcrypt.compare(password,user.password)
         if(pass){
            console.log("login success");
           const refreshToken = generateRefreshToken(user._id)
            refreshTokens.push(refreshToken)
            res.json({
                user,
                token:generateToken(user._id),
                refreshToken               
            })
         }else{
            console.log('wrong password');
            res.json('Wrong password')
         }
        }else{
            console.log('user not found');
            res.json("User not found")
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

/* ----------------------------- GENERATE TOKEN ----------------------------- */

// ACCESS TOKEn
const generateToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15m'
    })
}

// REFRESH TOKEN 

const generateRefreshToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_RSECRET, {
        
    })
}


/* -------------------------------- POST HOME ------------------------------- */
const Posthome =async (req,res)=>{
 console.log('reached home');
 try {
  let user = await  User.findOne({_id:req.userId})
  console.log(user,'useeeerrr');
  res.json({status:'Ok'})
 } catch (error) {
    res.json(error)
 }
}

const Gethome =(req,res)=>{
    console.log('hy home heloo ');
    res.status(200).json({status:true})
}

/* ------------------------------ REFRESH TOKEN ----------------------------- */


const PostrefreshToken = (req,res)=>{
    let yy= 6
let newe =[];
newe.push (yy);
console.log(newe,'newe');
if(!newe.includes(yy)){
    console.log('hello');
}
    // take refresh token from user 
    const refreshToken = req.body.token

    // send error if no token or invalid token
    if(!refreshToken) return res.status(401).json('You are not authenticated')
    console.log(refreshTokens,'refreshtokens array');
    if(!refreshTokens.includes(refreshToken)) {
        console.log(refreshTokens,'refreshtokens array');
        console.log(refreshToken,'refreshtoken ');

        return res.status(403).json('refresh token not valid')
    }

    jwt.verify(refreshToken,process.env.JWT_RSECRET,(err,user)=>{
        err && console.log(err);

        refreshTokens = refreshTokens.filter((token)=> token != refreshToken)

        const newToken =generateToken(user._id)
        const newRefreshToken =generateRefreshToken(user._id)

        refreshTokens.push(newRefreshToken)

        res.status(200).json(
            {
                token:newToken,
                refresToken:newRefreshToken
            }
        )
    })
    // if ok , generate new refresh and access token and send it to user


}

/* --------------------------------- LOGOUT --------------------------------- */

const postLogout =(req,res)=>{

    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token)=>token != refreshToken)
    res.status(200).json('Logged out successfully')


}

/* ---------------------------- POST APPLICATION ---------------------------- */

const postApplication =async(req,res)=>{
        console.log('Application reached post');
        const user = req.params.id;
        console.log(user,'userrrrr');
        req.body.userId = user;
        console.log((typeof(user)));
        let eligible = await applicationForm.findOne({userId:req.params.id, status:'pending'})
        console.log(eligible,'eligibleee');
        if(eligible){
            console.log('in eligible');
        if(eligible.status !='pending'){
            applicationForm.create(req.body).then((response)=>{
                console.log(response,'9999999999999');
                res.json(response)
            }).catch((err)=>{
                res.json(err)
            })
        }else{
            console.log('heeeyy');
            res.status(401).json('jjjjjjjjj')
        }
    }else{

        applicationForm.create(req.body).then((response)=>{
         console.log(response,'9999999999999');
         res.json(response)
     }).catch((err)=>{
         res.json(err)
     })
    }
}

/* -------------------------- GET APPLICATION FORM -------------------------- */

const getApplicationForm=async (req,res)=>{

    console.log('reached get application form');
    const user = req.params.id;
    let eligible = await applicationForm.findOne({userId:user,status:'pending'})
    console.log(eligible,'eli');
    if(!eligible){
        console.log('in if');
        res.status(200).json({status:true})
    }else{
        console.log('in else');
        res.status(401).json('Your application is still in pending, Please wait before sending another!')
    }
}

module.exports={postSignup,postSignin, Posthome, Gethome, PostrefreshToken, postLogout, postApplication, getApplicationForm}