require('dotenv').config();
const express = require("express")
const app = express()
const {MongoDB} = require("./mogoDB")
const routes = require("./routes/user")
const cookieparser = require("cookie-parser")
const { checkAuth } = require("./middleware/user")
const path = require("path")
const user = require("./model/user")
const post = require("./model/post")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine",'ejs')
app.set("views",path.resolve("./views"))
app.use(cookieparser())
app.use(checkAuth("token"))
app.use(express.static(path.resolve('/public')))
const port =  process.env.PORT || 8008
MongoDB(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
app.get("/", async(req, res) => {
    const posts = await post.find({})
    res.render("home", { user: req.user,postz:posts });
  });
app.get("/profile", (req, res) => {
    res.render("profile", { user: req.user });
  });
 app.get("/blogs",async(req,res)=>{
    const blog = await post.find({createdBy:req.user._id}) 
    res.render("blogs",{blogs:blog})
})
app.use("/",routes)
app.listen(port,(req,res)=>{
    console.log(`Server is Runing on port ${port} `)
})