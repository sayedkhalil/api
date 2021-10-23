const db = require("../modul/User")
const express = require('express')
const eventrouter = express.Router()
var newu=[]
// read document
eventrouter.get("/id:we" , function(req, res) {
    var e =req.params["we"]
    db.collection("events").doc(e).get().then((doc) =>{
       res.json(doc.data())  
      })
      });
//add document
eventrouter.post("/add",(req,res)=>{
var doce = req.body
 db.collection("events").doc(`${doce.key}`).set(doce).then(()=>res.json("yes"))
})
// read 8 documents
eventrouter.get("/",(req,res)=>{
    newu=[]
db.collection("events").orderBy("key").limit(8).get() 
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      
     newu.push({title:doc.data().name,key:doc.data().key,img:doc.data().img})
    });
}).then(()=>res.json(newu))

})
 
       module.exports=eventrouter