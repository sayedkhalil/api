const express = require('express')
const qrcode = express.Router()
var qr = require('qr-image');
qrcode.get('/ad',  function(res,req){
    var code = qr.image('http://www.google.com', { type: 'png' });
 
    res.header('Content-type', 'image/png');  //sent qr image to client side
    code.pipe(res);
  });


module.exports=qrcode