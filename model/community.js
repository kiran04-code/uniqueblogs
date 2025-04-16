const mongoose = require("mongoose")

communitySchme = new mongoose.Schema({
    text:{
        type:String,
        require:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"user"
    }
    
},{timestamps:true})

const commun = mongoose.model("community",communitySchme)

module.exports = commun