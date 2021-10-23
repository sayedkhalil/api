const {Storage} = require('@google-cloud/storage');
const {format} = require('util')
const express = require('express')
const Multer = require('multer');
const upload = Multer({
      storage: Multer.memoryStorage(),
      limits: {
        fileSize:5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
      }
    });
const Busboy = require('busboy');
const os = require('os');
const fs = require('fs');
const path = require('path');
const serviceAccount= require("../modul/kroot-qr-firebase-adminsdk-wgti8-75974b601e.json")
const storage=new Storage({
  projectId:"kroot-qr",
  keyFilename:"/modul/kroot-qr-firebase-adminsdk-wgti8-75974b601e.json",
  credentials: serviceAccount
});
const bucket = storage.bucket("kroot-qr.appspot.com");
const imagecr = express.Router()
// read one templet
imagecr.post('/upload', upload.single('file'),async (req, res) => {
      try {
        
    
        if (!req.file) {
          return res.status(400).send({ message: "Please upload a file!" });
        }
    
        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });
    
        blobStream.on("error", (err) => {
          res.status(500).send({ message: err.message });
        });
    
        blobStream.on("finish", async (data) => {
          // Create URL for directly file access via HTTP.
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
    
          try {
            // Make the file public
            await bucket.file(req.file.originalname).makePublic();
          } catch {
            return res.status(500).send({
              message:
                `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
              url: publicUrl,
            });
          }
    
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
            url: publicUrl,
          });
        });
    
        blobStream.end(req.file.buffer);
      } catch (err) {
        res.status(500).send({
          message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
      }
    })
 module.exports=imagecr