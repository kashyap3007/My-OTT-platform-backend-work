// Downloading express , nodemon , dotenv , mongoose

// Express will be used for the middleware to create various CRUD endpoints.
// Mongoose for managing data in MongoDB using various queries.
// Nodemon to restart our server every time we save our file.
// Dotenv to manage a .env file.

require("dotenv").config();
const express = require("express");
var cors = require("cors");

const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
// dot env connection

const mongoString = process.env.DATABASE_URL;

mongoose.set("strictQuery", false);

mongoose.connect(mongoString, (error) => {
  // console.log("Madarchod");
  if (error) console.log(error);
  else console.log("Connected to MongoDB Database");
});

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// This method returns the middleware that only parses JSON and only looks at the requests where the content-type header matches the type option.

const routes = require("./routes/routes");
app.use(fileUpload());
app.use("/api", routes);

//One is the base endpoint, and the other is the contents of the routes. Now, all our endpoints will start from '/api'.
// const router = express.Router();

app.listen(3000, () => {
  console.log(`Server Started at ${PORT}`);
});
