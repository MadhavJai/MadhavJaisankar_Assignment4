// import express
const express = require("express");
const app = express();
 
// specify the port that your server will run on
const HTTP_PORT = process.env.PORT || 8080;
 
// list of url endpoints that your server will respond to
app.get("/", (req, res) => {
 res.send("Hello World!");
});
 
// start the server and output a message if the server started successfully
const onHttpStart = () => {
 console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}

app.listen(HTTP_PORT, onHttpStart);