const express = require('express');
const isAuth = require('../middlewares/isAuth');
const PostSchema= require('../models/Post')
const PostRoute = express.Router()


PostRoute.post('/addpost',isAuth, async(req,res)=>{
  
    try {
        const Post = new PostSchema({...req.body,Username:req.user._id});
      
        await Post.save()
        res.status(200).send({msg:'your post is added', Post})
    } catch (error) {
        res.status(500).send({msg:'could not posted', error})
    }
})



PostRoute.get('/posts', async(req,res)=>{
    try {
        const postslist = await PostSchema.find()
        res.status(200).send({msg:'post list:', postslist})
    } catch (error) {
        res.status(500).send({msg:'could not find posts', error})
    }
})
// my posts akhw
PostRoute.get('/myposts',isAuth, async(req,res)=>{
    try {
        const postslist = await PostSchema.find({Username:req.user._id}).populate('Username')
        res.status(200).send({msg:'post list:', postslist})
    } catch (error) {
        res.status(500).send({msg:'could not find posts', error})
    }
})



PostRoute.delete('/:id', async(req, res)=>{
    try {
        const removed = await PostSchema.findByIdAndDelete(req.params.id)
        res.status(200).send({msg:'post is removed', removed})
    } catch (error) {
        res.status(500).send({msg:"could not remove post", error})
    }
})



PostRoute.put('/:id', async(req, res)=>{
    try {
        const updatepost = await PostSchema.findByIdAndUpdate(req.params.id, {$set:req.body})
        res.status(200).send({msg:'Post updated', updatepost})
    } catch (error) {
        res.status(500).send({msg:'could not update post', error})
    }
})




PostRoute.get('/:id', async(req,res)=>{
    try {
        const foundpost = await PostSchema.findById(req.params._id)
        res.status(200).send({msg:"post is found", foundpost})
    } catch (error) {
        res.status(500).send({msg:"could not found post", error})
    }
})



module.exports = PostRoute