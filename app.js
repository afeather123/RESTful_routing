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

app.get("/blogs", function(req, res){
    Blog.find({},function(err, blogs){
      if(err){
        console.log("OH FUCK");
      } else {
        res.render("index",{blogs:blogs});
      }
    });

});
