const express = require("express")
const routes = express.Router()
const user = require("../model/user")
const post = require("../model/post")
const com = require("../model/comment")
// const multer  = require("multer")
// const path = require("path")

routes.get("/signup",(req,res)=>{
    res.render("signup")
})

routes.get("/signin",(req,res)=>{
  res.render("signin")
})
routes.get("/logout",(req,res)=>{
   res.clearCookie("token").render("signin")
})
routes.get("/seecommets/:id",async(req,res)=>{
  const userid = req.params.id
  const readmores = await post.findById(userid)
  const coms = await com.find({blogId:userid}).populate('createdBy')
  res.render("commets",{coment:coms,posttitl:readmores})
})
routes.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newuser = await user.create({
      username,
      email,
      password
    });
    console.log(newuser);
    res.render("signin"); // <<== This renders, not redirects!
  } catch (error) {
    res.render("signup", { error: "Email Is Not Unique!" });
  }
});

routes.post("/signin",async(req,res)=>{
   try {
    const {email,password} = req.body
    const token = await user.mathcpasstoken(email,password)
    res.cookie("token",token ).redirect("/")
   } catch (error) {
      res.render("signin",{ error:"password is Incorrect!"})
   }
})

routes.get("/readmore/:id",async(req,res)=>{
    const  userid = req.params.id
     const readmores = await post.findById(userid).populate('createdBy')
     const coms= await com.find({blogId:req.params.id}).populate('createdBy')
    return res.render("readmore",{blog:readmores,user:req.user,coments:coms})
})
// commnets 
routes.post("/readmore/coments/:id",async(req,res)=>{
  const body = req.body 
   await com.create({
    coments:body.coments,
    blogId:req.params.id,
    createdBy:req.user._id
  })
  res.redirect(`/readmore/${req.params.id}`)
})
//edite 
routes.get("/edit/:id",async(req,res)=>{
    const  userid = req.params.id
     const readmores = await post.findById(userid)
    res.render("edit",{blog:readmores})
})
routes.get("/blogs",(req,res)=>{
  res.render("blogs")
})
routes.post("/blogs/update/:id",async(req,res)=>{
    const id = req.params.id
    const {title,content} = req.body
    await post.findOneAndUpdate({_id:id},{title:title,content:content})

    res.redirect("/blogs")
})
routes.get("/delete/:id",async(req,res)=>{
    const userId = req.params.id
    await post.findByIdAndDelete(userId )
    res.redirect("/blogs")
})
routes.get("/post",(req,res)=>{
  res.render("post")
})
routes.post("/create",async(req,res)=>{
    const {title, content} = req.body
     await post.create({
        title,
        content,
        createdBy:req.user._id,
    
    })
    res.redirect("/")
})
module.exports = routes