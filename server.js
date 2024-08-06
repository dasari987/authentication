var express = require('express')
var bodyparser = require('body-parser')
var mongoose = require('mongoose')
var User = require('./models/user.model')


var app = express()
app.use(express.static(__dirname+"/public"))
app.use(bodyparser.urlencoded({extended: false})) // using method POST
// app.use(bodyParser.json()) // using js
app.set('view engine', 'pug')


app.post("/signup",(req,res)=>{
    mongoose.connect("mongodb+srv://sai:sai123456789@atlascluster.ym1yuin.mongodb.net/auth?retryWrites=true&w=majority&appName=AtlasCluster")
     .then(()=>{
          var newUser = new User(req.body)
           newUser.save().then((user)=>{
            console.log(user)
            res.redirect('/login.html')
          }).catch((err)=>{console.log(err)})
     })
     .catch(()=>{
        console.log("not connected")
     })
})


app.post("/login",(req,res)=>{
    // console.log("user details::",req.body)
    mongoose.connect("mongodb+srv://sai:sai123456789@atlascluster.ym1yuin.mongodb.net/auth?retryWrites=true&w=majority&appName=AtlasCluster")
    .then(()=>{
         User.findOne({username:req.body.username,password:req.body.password})
         .then((data)=>{
            console.log(data)
                if(data){
                  console.log("data.username",data.username)
                  //   res.sendFile(__dirname+'/dashboard.html')
                  res.render('dashboard.pug',{user:data})
                }
                else{
                    res.redirect('/signup.html')
                }
         })
         .catch((err)=>{
            res.send('error inside database')
         })
    })
    .catch((err)=>{
        console.log("not connected")
    })
})


app.listen(8010,()=>{
    console.log("server is running on 8010")
})