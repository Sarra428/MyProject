const mongoose = require('mongoose')

const  UserSchema = new mongoose.Schema({
    
        email:{type:String, unique:true, required:true},
        password:String,
        role:{
            type:String,
            enum:['admin', 'client', 'doctor'],
            default: 'client'
        },
        Username : String,
        spécialité : String,
        firstname : String,
        lastname : String,
        PhoneNum : Number,       
        Address : String,
})



module.exports = mongoose.model('User', UserSchema)