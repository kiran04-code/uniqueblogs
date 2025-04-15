const mongoose = require("mongoose")
const { createHash, randomBytes } = require("crypto");
const {createToken} = require("../service/user");
userSchema = new mongoose.Schema({
    // profileimage:{
    //     type:String,
    // },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    salt:{

    }
})
userSchema.pre("save",function(next){
    const user = this
    if (!user.isModified("password")) return next();
    const salt = randomBytes(16).toString()
    const Hashpass = createHash("sha256").update(salt + user.password).digest("hex")
    this.salt = salt
    this.password = Hashpass
    next()
})
userSchema.static("mathcpasstoken",async function (email, password){
  const user = await this.findOne({ email })
  if(!user) throw new Error("User Not Found!")
  const salt = user.salt 
  const priounshsh = user.password 
  const passHashpass = createHash("sha256").update(salt + password).digest("hex")
  if( priounshsh !== passHashpass ) throw new Error("password is Incorrect!")
  const token =  createToken(user)
  return token 
})
const user = mongoose.model("user",userSchema)
module.exports = user