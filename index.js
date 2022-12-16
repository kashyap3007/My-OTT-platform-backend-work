// Downloading express , nodemon , dotenv , mongoose

// Express will be used for the middleware to create various CRUD endpoints.
// Mongoose for managing data in MongoDB using various queries.
// Nodemon to restart our server every time we save our file.
// Dotenv to manage a .env file.

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// dot env connection

const mongoString = process.env.DATABASE_URL;

// mongoose.set("strictQuery", false);

// console.log(mongoString);

// mongoose.connect(mongoString);

mongoose.connect(mongoString, (error) => {
  if (error) console.log(error);
  else console.log("Connected to MongoDB");
});

// mongoose.connect("mongodb://localhost:27017/test", (error) => {
//   if (error) console.log(error);
//   else console.log("Done");
// });
const PORT = 3000;

const app = express();

app.use(express.json());
// This method returns the middleware that only parses JSON and only looks at the requests where the content-type header matches the type option.

const routes = require("./routes/routes");

app.use("/api", routes);

app.use("/ayush", (req, res) => {
  console.log("Helloooooo");
  res.send("Hii");
});
//One is the base endpoint, and the other is the contents of the routes. Now, all our endpoints will start from '/api'.
// const router = express.Router();

//Create all methods

// Post Method
// routes.post("/post", (req, res) => {
//   res.send("Post your API");
// });

// const Model = require("./models/model");

// Get all Method
// routes.get("/get", (req, res) => {
//   res.send("Get your API");
// });

// //Get by ID Method
// routes.get("/get/:id", (req, res) => {
//   res.send(`Get by ${req.params.id} API`);
// });

// //Update by ID Method
// routes.patch("/update/:id", (req, res) => {
//   res.send("Update by ID API");
// });

// //Delete by ID Method
// routes.delete("/delete/:id", (req, res) => {
//   res.send("Delete by ID API");
// });

app.listen(3000, () => {
  console.log(`Server Started at ${PORT}`);
});
