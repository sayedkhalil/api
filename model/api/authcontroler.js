const auth = require("../modul/auth")
const db = require("../modul/User")
const express = require('express')
const cookieParser = require('cookie-parser')
const authrouter = express.Router()
authrouter.use(cookieParser())

authrouter.post("/create", (req,res)=>{
  
        auth.createUserWithEmailAndPassword(req.body.email, req.body.password).then((userCredential) => {
          var user = userCredential.user;
          res.json({"idtoken":user.uid,"token":"enable"})
       
        }).catch ((err)=> {
        res.json(err.message);  
      })
  
    }) 
authrouter.post("/add",(req,res)=>{
  db.collection("auth").doc(req.body.idtoken).set(req.body.ip) 
})
authrouter.post("/login",(req,res)=>{
  auth.signInWithEmailAndPassword(req.body.email, req.body.password).then((userCredential) => {
    
    var user = userCredential.user;
    res.json({"idtoken":user.uid,"token":"enable"})
 
  }).catch ((err)=> {
  res.json(err.message);  
})
})
authrouter.post("/ip",(req,res)=>{
  db.collection("auth").doc(req.body.idtoken).get().then((doc)=>{
    res.json(doc.data())
  }).catch(err=>res.json(err.message))
})
module.exports=authrouter