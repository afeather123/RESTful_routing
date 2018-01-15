var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,function(){
  console.log("Server is running");
});

var blogSchema = new mongoose.Schema({
  title:String,
  image:String,
  body:String,
  created:{type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

//RESTFUL ROUTES
// Blog.create({
//   title: "TestBlog",
//   image: "http://ghk.h-cdn.co/assets/17/30/980x490/landscape-1500925839-golden-retriever-puppy.jpg",
//   body: "Here's some text"
// });

app.get("/",function(req,res){
  res.redirect("/blogs");
})

//INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({},function(err, blogs){
      if(err){
        console.log("OH FUCK");
      } else {
        res.render("index",{blogs:blogs});
      }
    });
});
//NEW ROUTE
app.get("/blogs/new", function(req,res){
  res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req,res){
  //create blog
  Blog.create(req.body.blog,function(err,newBlog){
    if(err){
      res.render("new");
    } else {
      //then, redirect to the INDEX
      res.redirect("/blogs");
    }
  });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err,foundBlog){
      if(err){
        res.redirect("/blogs");
      } else {
        res.render("show",{blog: foundBlog});
      }
    })
});
