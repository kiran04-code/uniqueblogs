const mongoose = require("mongoose")
const { type } = require("os")
comSchema = new mongoose.Schema({
   coments:{
    type:String
   },
   blogId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"post"
   },
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   }
},{timestamps:true})


const com = mongoose.model('com',comSchema)

module.exports = com