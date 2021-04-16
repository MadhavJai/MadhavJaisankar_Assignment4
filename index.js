// ----------------------------------
// MONGOOSE SETUP AND CONFIG
// ----------------------------------
const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://dbUser:0000@cluster0.1w8da.mongodb.net/college?retryWrites=true&w=majority"

const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}

//-----------------------
// EXPRESS SETUP AND CONFIG
//-----------------------

// import express
const express = require("express");
const app = express();
app.use(express.json())
// specify the port that your server will run on
const HTTP_PORT = process.env.PORT || 8080;

// ----------------------------------
// START SERVER
// ----------------------------------
const onHttpStart = () => {
    console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}

// connect to database
mongoose.connect(mongoURL, connectionOptions).then(
   () => {
        console.log("Connected successfully to your database");
        app.listen(HTTP_PORT, onHttpStart); 
   }
).catch(
   (err) => {
       console.log("Error connecting to database")
       console.log(err)
   }
)



 
// // list of url endpoints that your server will respond to
// app.get("/", (req, res) => {
//  res.send("Hello World!");
// });
 

