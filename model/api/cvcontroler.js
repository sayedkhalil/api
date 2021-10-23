const db = require("../modul/User")
const express = require('express')
const cvrouter = express.Router()
var newu=[]
// read document
cvrouter.get("/id:we" , function(req, res) {
    var e =req.params["we"]
    db.collection("cv").doc(e).get().then((doc) =>{
       res.json(doc.data())  
      })
      });
//add document
cvrouter.post("/add",(req,res)=>{
var doce = req.body
 db.collection("cv").doc(`${doce.key}`).set(doce).then(()=>res.json("yes"))
})
// read 8 documents
cvrouter.get("/",(req,res)=>{
    newu=[]
db.collection("cv").orderBy("key").limit(8).get() 
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    
     newu.push({title:doc.data().name,key:doc.data().key,field:doc.data().field})
    });
}).then(()=>res.json(newu))

})
 
       module.exports=cvrouter