const monggose = require("mongoose")

async function MongoDB(url){
    monggose.connect(url)
}


module.exports = {MongoDB}