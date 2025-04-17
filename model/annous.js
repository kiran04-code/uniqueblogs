const mongoose = require("mongoose")
annouschema  = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    }

},{timestamps:true})

const annu  = mongoose.model("announcement",annouschema)

module.exports = annu