// ----------------------------------
// MONGOOSE SETUP AND CONFIG
// ----------------------------------
const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://dbUser:0000@cluster0.1w8da.mongodb.net/college?retryWrites=true&w=majority"

const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true}

// adding table schemas
const Schema = mongoose.Schema

const LuckBeALandlordItemsSchema = new Schema({
   item:String,
   rarity:String
})
const LItem = mongoose.model("luck_be_a_landlord_items", LuckBeALandlordItemsSchema)

// ----------------------------------
// EXPRESS SETUP AND CONFIG
// ----------------------------------
// import express
const express = require("express");
const app = express();
app.use(express.json())
// specify the port that your server will run on
const HTTP_PORT = process.env.PORT || 8080;



// ----------------------------------
// DEFINING URL ENDPOINTS
// ----------------------------------

// Get all items
app.get("/api/items", (req, res) => {
    LItem.find().exec().then(
        (results) => {
            console.log(results)
            res.send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when getting items from database.")
        }
    )
})

// Get one item
// Add item
// Delete item
// Update item
// Other endpoints




// ----------------------------------
// START SERVER
// ----------------------------------
const onHttpStart = () => {
    console.log(`Server has started and is listening on port ${HTTP_PORT}`)
}



// ----------------------------------
// CONNECT TO MONGODB DATABASE
// ----------------------------------
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

 

