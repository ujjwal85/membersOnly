const mongoose=require('mongoose')
const {Schema}=require('mongoose')

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    number:String,
    password:String
})

module.exports=mongoose.model('user',userSchema)