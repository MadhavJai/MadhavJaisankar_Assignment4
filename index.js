// Written by Madhav Jaisankar
// Student #: 991522670
// PROG34104

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
            res.status(200).send(results)
        }
    ).catch(
        (err) => {
            console.log(error)
            res.status(500).send("Error when getting items from database.")
        }
    )
})

// Get one item
app.get("/api/items/:item_name", (req,res) => {
    LItem.findOne({'item':req.params.item_name}).exec().then(
      (result) => {
          if(!result) {
              throw new Error();
          }
          console.log(result)
          res.status(200).send(result) }
    ).catch(
      (err) => {
          console.log("Item not found")
          res.status(404).send("Item not found")
      }
    )    
})

// Add item
app.post("/api/items", (req, res) => {

    console.log("Received new item")
    console.log(req.body)

    LItem.create(req.body).then(
        (result) => {
            console.log("Added to the database")
            console.log(result)
            // express
            res.status(201).send("Succesfully added to the database!")
        }
    ).catch(
        (err) => {
            console.log(`Error`)
            console.log(err)
            const msg = {
                statusCode:500,
                msg: "Error adding to database."
            }
            res.status(500).send(msg);
        }
    )
});

// Delete item
app.delete("/api/items/:item_name", (req,res) => {
    LItem.findOneAndDelete({'item':req.params.item_name}).exec().then(
        (deletedItem) => {
            if(!deletedItem) {
                throw new Error();
            }
            console.log("Item was deleted")
            res.status(201).send("Specified Item was deleted.") }

    ).catch(
        (err) => {
            console.log("Item was not found")
            res.status(404).send("Requested item was not found") 
        }
    )
})

// Update item
app.put("/api/items/:item_id", (req,res) => {
    console.log("This method will be implemented in the future");
    res.status(501).send("This method will be implemented in the future");
})

// Other invalid endpoints
app.get('*', (req,res) => {
    console.log("This page is does not exist");
    res.status(404).send("This page does not exist!");
});


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

 

