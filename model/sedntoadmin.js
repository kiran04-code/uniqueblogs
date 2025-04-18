const mongoose = require("mongoose")

adminSchme = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        
    },
    email:{
        type:String,
        require:true,

    },
    message:{
        type:String,
        require:true,

    }
},{timestamps:true})

const metoadmin = mongoose.model("messageforadmin",adminSchme)

module.exports = metoadmin