const db = require("../modul/User")
const express = require('express')
const { json } = require("body-parser")
const pagerouter = express.Router()
let page =  []
let page8 =[]
// read page
pagerouter.get("/page:id",function(req,res){
    page =  []
    var ee =req.params["id"]
    db.collection("pages")
    .doc(ee).get().then((doc)=>
    {
          res.json(doc.data().users)     
    })
    
 })
//   create page 
pagerouter.post("/create",function(req,res){
    var email =req.body.email
    db.collection("pages").doc(email).set({"users":[]}).then(()=>   res.json("done"))

    
})
// add page
pagerouter.post("/add",function(req,res){
    let pages
    var email = req.body.email
    var num   = req.body.id
    db.collection("pages")
    .doc(email).get().then((doc)=>
    {
          pages=doc.data().users 
          pages.push(num)
          db.collection("pages").doc(email).set({"users":pages}).then(()=>   res.json(pages)) 
    })
    
  })
// delete page
pagerouter.delete("/delete",function(req,res){
    var email =req.body.email
    var num   = req.body.id
    let pages
    db.collection("pages")
    .doc(email).get().then((doc)=>
    {
          pages=doc.data().users 
        pages=  pages.filter(function(ele){ 
            return ele != num; 
        });
          db.collection("pages").doc(email).set({"users":pages}).then(()=>   res.json(pages)) 
    })
   })
module.exports=pagerouter