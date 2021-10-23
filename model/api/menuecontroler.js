const db = require("../modul/User")
const express = require('express')
const menuerouter = express.Router()
var newu=[]
// read document
menuerouter.get("/id:we" , function(req, res) {
    var e =req.params["we"]
    db.collection("menues").doc(e).get().then((doc) =>{
       res.json(doc.data())  
      })
      });
//add document
menuerouter.post("/add",(req,res)=>{
var doce = req.body
 db.collection("menues").doc(`${doce.key}`).set(doce).then(()=>res.json("yes"))
})
// read 8 documents
menuerouter.get("/",(req,res)=>{
    newu=[]
db.collection("menues").orderBy("key").limit(8).get() 
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      
     newu.push({title:doc.data().name,key:doc.data().key,img:doc.data().img})
    });
}).then(()=>res.json(newu))

})
 
       module.exports=menuerouter