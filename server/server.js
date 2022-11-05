require("dotenv").config();
const express = require('express');
const server = express();
const userRouter = require('./Routes/user')
const adminRouter = require('./Routes/admin')
const bodyParser = require('body-parser')
const cors = require('cors')

server.use(express.json())
server.use(bodyParser.urlencoded({extended:true}))

/* --------------------------------- Routes --------------------------------- */
server.use(cors())
server.use('/',userRouter);
server.use('/admin',adminRouter); 


const {connectDb} = require('./config/connections');
connectDb()

const port = process.env.PORT || 4000
server.listen(port,()=>{
    console.log('Server started on 4000');
})

module.exports = server;