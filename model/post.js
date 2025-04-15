const mongoose = require("mongoose")
const { type } = require("os")
postSchema = new mongoose.Schema({
   title:{
    type:String,
    require:true
   },
   content:{
    type:String,
    require:true
   },
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   }
},{timestamps:true})


const post = mongoose.model('post',postSchema)

module.exports = post