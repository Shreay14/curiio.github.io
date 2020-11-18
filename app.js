var express=require("express");
var app=express();
var bodyParser= require("body-parser");
var mongoose=require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/curiio', {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => {
    console.log("connection open")
})
.catch(err => {
    console.log("not connected")
    console.log(err)
})

var personSchema= new mongoose.Schema({
    name:String,
    email: String,
    contact: Number,
    position: String
});
var Person=mongoose.model("Person",personSchema);

app.get("/",function(req,res){
    res.render("education.ejs")
})

app.get("/join",function(req,res){
    res.render("help.ejs")
})
app.get("/about",function(req,res){
    res.render("about.ejs")
})
app.get("/resources",function(req,res){
    res.render("resources.ejs")
})
app.get("/platform",function(req,res){
    res.render("platform.ejs")
})
app.post("/person", function(req,res){
    var newPerson= new Person(req.body)
    newPerson.save();
    res.redirect("/")
 })

app.listen(3000,function(){
    console.log("server started");
})