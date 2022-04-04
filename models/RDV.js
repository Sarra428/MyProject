const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
    UserId : {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    Lastname : String,
    email:{type:String},
    appoint_Request : String,
    rdv_date : String,
    PhoneNum : Number,
    status:{
        type:String,
        enum:['Accepté', 'En attente', 'Refusé'],
        default: 'En attente'
    }
})




module.exports = mongoose.model('Appointment', RequestSchema)