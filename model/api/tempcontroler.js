const db = require("../modul/User")
const express = require('express')
const temprouter = express.Router()
var temps=[]
var tempm=[]
// read one templet
temprouter.get("/t:we" , function(req, res) {
      var e =req.params["we"]
       db.collection("templet").doc(e).get().then((doc) =>{
        res.json(doc.data())          
         })   
 
         });
         temprouter.get("/radio",(req,res)=>{
               temps=[]
                  db.collection("tepms").get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                     temps.push(doc.data())                    
                  });
              }).then(()=>res.send(temps))           
         })
         temprouter.get("/radiom",(req,res)=>{
            tempm=[]
               db.collection("tempmenue").get().then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  tempm.push(doc.data())                    
               });
           }).then(()=>res.send(tempm))           
      })
 module.exports=temprouter