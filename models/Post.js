const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    Username : {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    post_message : String
})


module.exports = mongoose.model('post', PostSchema)