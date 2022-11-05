const mongoose = require('mongoose')
const uri ='mongodb+srv://abhijithas2213:abhi123@cluster0.mpsgwoj.mongodb.net/Incubation?retryWrites=true&w=majority'


const connectDb = async()=>{
    try {
        await mongoose.connect(uri,{
            useNewUrlParser: true,
        },()=>{
            console.log('MongoDb connected');
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports ={connectDb}