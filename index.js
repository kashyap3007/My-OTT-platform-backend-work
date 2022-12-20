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

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// This method returns the middleware that only parses JSON and only looks at the requests where the content-type header matches the type option.

const routes = require("./routes/routes");
app.use(fileUpload());
app.use("/hotstar", routes);

//One is the base endpoint, and the other is the contents of the routes. Now, all our endpoints will start from '/api'.
// const router = express.Router();

// Ye wala corrouseles k liye
// const start = require("./start/start");
// app.use("/start", start);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
