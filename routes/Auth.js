const express = require("express")
const AuthRoute = express.Router()
const isAuth = require("../middlewares/isAuth")
const { Registervalidation, Validator } = require("../middlewares/validation")
const { tosignup, tosignin } = require("../controllers/Auth")
const authSchema=require("../models/Auth")

////////////////// AUTHENTIFICATION////////////////////////////

AuthRoute.post('/signup', Registervalidation, Validator, tosignup)

AuthRoute.post('/SignIn',tosignin )

AuthRoute.get('/me', isAuth, (req,res)=>res.send(req.user))
AuthRoute.get('/', async(req,res)=>{
    try {
     const users = await authSchema.find()
     res.status(200).send({msg:"your user list:", users})
    } catch (error) {
     res.status(500).send({msg:"could not find users"})
    }
   
 })


////////////////// DOCTORS & CLIENTS////////////////////////////

 // get doctors only

 AuthRoute.get('/doctors', async(req,res)=>{
    try {
     const doctors = await authSchema.find({role:"doctor"})
     res.status(200).send({msg:"your user list:", doctors})
    } catch (error) {
     res.status(500).send({msg:"could not find users"})
    }
 })

 // get client only
 AuthRoute.get('/client', async(req,res)=>{
    try {
     const clients = await authSchema.find({role:"client"})
     res.status(200).send({msg:"your user list:", clients})
    } catch (error) {
     res.status(500).send({msg:"could not find users"})
    }
   
 })
 
 AuthRoute.get('/:id', async (req,res)=>{
     try {
        //  const FoundUser = await authSchema.findById(req.params._id)
        const findone =await authSchema.findById(req.params.id)
         console.log(findone)
         res.status(200).send({msg:"user is found", findone})
         console.log("hello")
         
     } catch (error) {
         res.status(500).send({msg:"could not found user", error})
         console.log(error)
     }
 })
 
 AuthRoute.put('/:id', async(req,res)=>{
     try {
         const updated = await authSchema.findByIdAndUpdate(req.params.id, {$set: req.body})
         res.status(200).send({msg:"user updated", updated})
     } catch (error) {
         res.status(500).send({msg:"could not update user", error})
     }
 })
 
 AuthRoute.delete('/:id', async(req,res)=>{
     try {
         const deleted = await authSchema.findByIdAndDelete(req.params.id)
         res.status(200).send({msg:"user is deleted", deleted})
     } catch (error) {
         res.status(500).send({msg:"could not delete user", error})
     }
 })
 
 


module.exports = AuthRoute