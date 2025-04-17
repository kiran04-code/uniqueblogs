const express = require("express")
const routes = express.Router()
const user = require("../model/user")
const post = require("../model/post")
const com = require("../model/comment")
const commun = require("../model/community")
const annu = require("../model/annous")
const { render } = require("ejs")
// const multer  = require("multer")
// const path = require("path")

routes.get("/signup",(req,res)=>{
    res.render("signup")
})
routes.get("/commets",(req,res)=>{
    res.render("commets")
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
     await user.create({
      username,
      email,
      password
    });
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
routes.get("/deletecomment/:id",async(req,res)=>{
 const userid = req.params.id
 await com.findByIdAndDelete(userid )
 return res.redirect("/commets")
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
/// communitys///
routes.get("/community",async(req,res)=>{
  const communs = await commun.find({}).populate('createdBy')
  res.render("community",{community:communs}) // Populate 'name' field from user
 
})
routes.post("/text",async(req,res)=>{
  const body  = req.body
  const texts = await commun.create({
    text:body.text,
    createdBy:req.user._id
  })
  console.log(texts)
  res.redirect("/community")
})
//======================================== for admin panel =================================================================
routes.get("/admin",async(req,res)=>{
 const users =  await user.find({})
 const posts = await post.find({})
 const comts= await com.find({})
 const annous = await annu.find({})
  return res.render("admin",{userz:users,postz:posts,comz:comts,Announcement:annous})

})
// for user 
routes.get("/alluser",async(req,res)=>{
  const users =  await user.find({})
  return res.render("alluser",{userz:users})
})

routes.get("/deletbyadmin/:id",async(req,res)=>{
  const userId = req.params.id
  await user.findByIdAndDelete(userId)
  res.redirect("/alluser")
  
})
// for posts
routes.get("/allpost",async(req,res)=>{
  const posts =  await post.find({}).populate('createdBy')
  return res.render("allpost",{postz:posts})
})
routes.get("/deletpostadmin/:id",async(req,res)=>{
  const userId = req.params.id
  await post.findByIdAndDelete(userId)
  res.redirect("/allpost")
  
})
// for all coments
routes.get("/allcoments", async (req, res) => {
  const comts = await com.find({})
    .populate('blogId', 'title')  // Assuming blogId references a Blog model and we only need the title
    .populate('createdBy', 'username'); // Assuming createdBy references a User model and we only need the username

  return res.render("allcoments", { comtz: comts });
});
routes.get("/deletcomadmin/:id",async(req,res)=>{
  const userId = req.params.id
  await com.findByIdAndDelete(userId)
  res.redirect("/allcoments")
  
})
routes.get("/edituserByadmin/:id",async(req,res)=>{
  const userid = req.params.id
  const users = await user.findById(userid);
  return res.render("adminedituser",{userz:users})
})
routes.post("/updateuser/:id",async(req,res)=>{
  const userid = req.params.id
  const {username,email} = req.body
  await user.findOneAndUpdate({_id:userid},{username:username,email:email})
  res.redirect("/alluser")
})
// admin login user
routes.get("/adminlogin",(req,res)=>{
  res.render("adminlogin")
})
routes.post("/admin/login",(req,res)=>{
  const {email,password} = req.body
  if(email=="kr551344@gmail.com" && password=="kiran"){
    res.redirect("/admin")
  }else{
    res.redirect("/singin")
  }
})
// aounounce ment 
routes.get("/Announcement",(req,res)=>{
  res.render("Announcement")
})
routes.post("/send-announcement",async(req,res)=>{
  const {title ,content} = req.body
  await annu.create({
    title:title,
    content:content
  })
  res.redirect("/Announcement")
})
routes.get("/allannounce",async(req,res)=>{
  const annous = await annu.find({})
  res.render("allannounce",{Announcement:annous})
})
routes.get("/deleteAnnouncement/:id",async (req,res)=>{
  const userid = req.params.id
  await annu.findByIdAndDelete(userid)
  res.redirect("/admin")
})
module.exports = routes