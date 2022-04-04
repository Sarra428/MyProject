const express = require('express');
const isAuth = require('../middlewares/isAuth');
const RequestSchema= require('../models/RDV')
const RequestRoute = express.Router()


RequestRoute.post('/takeAppoint', isAuth,async(req,res)=> {
    const {email} = req.body
    try {
        const appoint = new RequestSchema({...req.body,UserId:req.user._id})
        const found = await RequestSchema.findOne({email})
        if(found){
            return res.status(400).send({msg:"Appoinment already taken "})
        }
        await appoint.save()
         res.status(200).send({msg:'Appointment Taken:', appoint})
    } catch (error) {
        res.status(500).send({msg:'could not take appointments', error})
    }
})



RequestRoute.get('/',async(req,res)=>{
    try {
        const appointments = await RequestSchema.find()
        res.status(200).send({msg:'Appointment list:', appointments})
    } catch (error) {
        res.status(500).send({msg:'could not find appointments', error})
    }
})



RequestRoute.get('/myappoints', async(req,res)=>{
    try {
        const appointments = await RequestSchema.find({Username:req.user._id}).populate('Username')
        res.status(200).send({msg:'Appointment list:', appointments})
    } catch (error) {
        res.status(500).send({msg:'could not find appointments', error})
    }
})


// RequestRoute.delete('/:id', async(req,res)=>{
//     try {
//         const deleteit = await RequestSchema.findByIdAndDelete(req.params.id)
//         res.status(200).send({msg:'Appointment deleted', deleteit})
//     } catch (error) {
//         res.status(500).send({msg:'could not delete request', error})
//     }
// })


// RequestRoute.put('/:id', async(req, res)=>{
//     try {
//         const updateit = await RequestSchema.findByIdAndUpdate(req.params.id, {$set: req.body})
//         res.status(200).send({msg:'Appointment updated', updateit})
//     } catch (error) {
//         res.status(500).send({msg:'could not update request', error})
//     }
// })


// RequestRoute.get('/:id', async(req,res)=>{
//     try {
//         const foundappoint = await RequestSchema.findById(req.params._id)
//         res.status(200).send({msg:"Appointment is found", foundappoint})
//     } catch (error) {
//         res.status(500).send({msg:"could not found appointment", error})
//     }
// })


module.exports = RequestRoute