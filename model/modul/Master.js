const firebase = require("firebase");
var firebaseConfig = {
   apiKey: "AIzaSyA5UDdQBkGxZZ7bxIquSXlKlJbPXKV6z3c",
   authDomain: "kroot-qr.firebaseapp.com",
   projectId: "kroot-qr",
   storageBucket: "kroot-qr.appspot.com", 
   messagingSenderId: "365866866453",
   appId: "1:365866866453:web:5f280d68bb0469b0d63b1c",
   measurementId: "G-CWMY566WSK"
};
// Initialize Firebase 
module.exports= firebase.initializeApp(firebaseConfig);