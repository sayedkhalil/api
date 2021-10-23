const db = require("../modul/User")
const express = require('express')
const userrouter = express.Router()
var newu=[]
var items=[]
// read document
userrouter.get("/id:we" , function(req, res) {
    var e =req.params["we"]
    db.collection("users").doc(e).get().then((doc) =>{
       res.json(doc.data())  
      })
      });
//add document
userrouter.post("/add",(req,res)=>{
var doce = req.body
 db.collection("users").doc(`${doce.key}`).set(doce).then(()=>res.json("yes"))
})
// read 8 documents
userrouter.get("/",(req,res)=>{
    newu=[]
db.collection("users").orderBy("key").limit(8).get() 
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    
     newu.push({title:doc.data().name,key:doc.data().key,img:doc.data().img})
    });
}).then(()=>res.json(newu))

})
// add item
userrouter.post("/item",(req,res)=>{
    var item = req.body
    db.collection("items").doc(item.idtoken).get().then((doc) =>{
        doc.data()?db.collection("items").doc(`${item.idtoken}`).collection(`${item.idtoken}`).doc(`${item.key}`).add(item):db.collection("items").doc(`${item.idtoken}`).collection(`${item.idtoken}`).doc(`${item.key}`).set(item)
        
       })
    })
    //red items

 userrouter.get("/items:we" , function(req, res) {
    var x =req.params["we"]
    items=[]
    db.collection("items").doc(`${x}`).collection(`${x}`).get().then((querySnapshot )=>{
        querySnapshot.forEach((doc)=>items.push(doc.data()))
           }).then(()=>res.json(items))
      });
 //delet item
 userrouter.post("/delete",(req,res)=>{ 
    var docee = req.body
    db.collection("items").doc(`${docee.idtoken}`).collection(`${docee.idtoken}`).doc(`${docee.key}`).delete()
    db.collection(`${docee.kind}`).doc(`${docee.key}`).delete()
    })
       module.exports=userrouter